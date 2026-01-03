import mongoose from "mongoose";
import Investment from "@/models/investment.model";
import UserExtra from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";

/**
 * Runs daily:
 * - credits daily profit -> inv.profit + user.totalProfit
 * - if investment matured -> migrates inv.profit -> user.depositedBalance
 * - marks inv.matured = true and inv.status = "completed"
 *
 * NOTE: This migrates ONLY the accumulated profit (inv.profit), not the principal.
 */
export const runDailyInvestmentCron = async () => {
  try {
    // Connect (serverless friendly)
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    // Normalize "today" to UTC midnight (prevent timezone drift)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Get all active, not-yet-matured investments
    const activeInvestments = await Investment.find({
      status: "active",
      matured: false,
    });

    if (!activeInvestments.length) {
      console.log("No active investments to process.");
      return;
    }

    console.log(`Processing ${activeInvestments.length} investments...`);

    for (const inv of activeInvestments) {
      const session = await mongoose.startSession();
      await session.startTransaction();

      try {
        // load user inside session
        const user = await UserExtra.findOne({ userId: inv.userId }).session(
          session
        );
        if (!user)
          throw new Error(`UserExtra not found for userId ${inv.userId}`);

        // Prevent double crediting for the same day
        if (inv.lastProfitAt) {
          const last = new Date(inv.lastProfitAt);
          last.setUTCHours(0, 0, 0, 0);
          if (last.getTime() === today.getTime()) {
            // already processed today — skip this investment
            await session.abortTransaction();
            session.endSession();
            continue;
          }
        }

        // 1) DAILY profit calculation & credit (accumulate on the investment)
        const dailyProfit = inv.principal * inv.dailyRate;

        inv.profit = (inv.profit ?? 0) + dailyProfit;
        inv.lastProfitAt = new Date(); // record actual timestamp

        // update user's aggregate profit metric (for reporting)
        user.totalProfit = (user.totalProfit ?? 0) + dailyProfit;

        // persist changes within transaction
        await inv.save({ session });
        await user.save({ session });

        // create daily ai-return transaction
        await Transaction.create(
          [
            {
              userId: inv.userId,
              type: "ai-return",
              amount: dailyProfit,
              currency: "USD",
              status: "completed",
              investmentId: inv._id.toString(),
              description: `Daily profit for ${inv.planLabel} plan.`,
            },
          ],
          { session }
        );

        // 2) MATURITY CHECK: normalize maturity date and compare
        const maturity = new Date(inv.maturityDate);
        maturity.setUTCHours(0, 0, 0, 0);
        const isMature = maturity.getTime() <= today.getTime();

        if (isMature) {
          // Transfer accumulated profit only (not principal)
          const profitToTransfer = inv.profit ?? 0;

          if (profitToTransfer > 0) {
            user.depositedBalance =
              (user.depositedBalance ?? 0) + profitToTransfer;
          }

          // mark investment completed / matured and clear profit to avoid double counting
          inv.status = "completed";
          inv.matured = true;
          inv.lastProfitAt = new Date();

          // persist updates
          await inv.save({ session });
          await user.save({ session });

          // record maturity transaction (use ai-return type to match schema)
          if (profitToTransfer > 0) {
            await Transaction.create(
              [
                {
                  userId: inv.userId,
                  type: "ai-return", // or update your Transaction schema to include a 'maturity' type
                  amount: profitToTransfer,
                  currency: "USD",
                  status: "completed",
                  investmentId: inv._id.toString(),
                  description: `Investment matured — profit credited to deposited balance.`,
                },
              ],
              { session }
            );
          }
        }

        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        console.error(`Error processing investment ${inv._id}:`, err);
      } finally {
        session.endSession();
      }
    }

    console.log("Daily investment cron executed successfully.");
  } catch (error) {
    console.error("Cron job error:", error);
  } finally {
    if (mongoose.connection.readyState) await mongoose.disconnect();
  }
};
