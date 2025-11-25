import mongoose from "mongoose";
import Investment from "@/models/investment.model";
import UserExtra from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";

export const runDailyInvestmentCron = async () => {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to prevent time drift issues

    // Fetch active, not-matured investments
    const activeInvestments = await Investment.find({
      status: "active",
      matured: false,
    });

    if (activeInvestments.length === 0) {
      console.log("No active investments to process.");
      return;
    }

    console.log(`Processing ${activeInvestments.length} investments...`);

    for (const inv of activeInvestments) {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const user = await UserExtra.findOne({ userId: inv.userId }).session(
          session
        );
        if (!user)
          throw new Error(`UserExtra not found for userId ${inv.userId}`);

        // Prevent double-crediting (important!)
        if (inv.lastProfitAt) {
          const last = new Date(inv.lastProfitAt);
          last.setHours(0, 0, 0, 0);
          if (last.getTime() === today.getTime()) {
            await session.abortTransaction();
            session.endSession();
            continue; // Already processed today
          }
        }

        // 1. DAILY PROFIT CALCULATION
        const dailyProfit = inv.principal * inv.dailyRate;

        inv.profit += dailyProfit;
        inv.lastProfitAt = new Date();

        user.totalProfit += dailyProfit;

        await inv.save({ session });
        await user.save({ session });

        // 2. Record daily profit transaction
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

        // 3. MATURITY CHECK
        const isMature =
          today.getTime() >= new Date(inv.maturityDate).setHours(0, 0, 0, 0);

        if (isMature) {
          const totalReturn = inv.principal + inv.profit;

          // Move all returns → depositedBalance
          user.depositedBalance += totalReturn;

          inv.status = "completed";
          inv.matured = true; // Critical flag
          inv.profit = 0; // lock profit after migration

          await inv.save({ session });
          await user.save({ session });

          // Record maturity transaction
          await Transaction.create(
            [
              {
                userId: inv.userId,
                type: "maturity-payout",
                amount: totalReturn,
                currency: "USD",
                status: "completed",
                investmentId: inv._id.toString(),
                description: `Investment matured. Principal + Profit credited.`,
              },
            ],
            { session }
          );
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
