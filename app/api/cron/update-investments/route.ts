import mongoose from "mongoose";
import Investment from "@/models/investment.model";
import userExtraModel from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";

export const runDailyInvestmentCron = async () => {
  try {
    // Connect to DB if not already connected (Vercel serverless)
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URL!);
    }

    // Find all active investments whose maturity date is today or later
    const activeInvestments = await Investment.find({
      status: "active",
      maturityDate: { $gte: new Date() },
    }).lean();

    if (!activeInvestments.length) {
      console.log("No active investments to process today.");
      return;
    }

    console.log(`Processing ${activeInvestments.length} active investments...`);

    for (const investment of activeInvestments) {
      const dailyProfit = investment.principal * investment.dailyRate;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Fetch user within transaction
        const user = await userExtraModel
          .findOne({ userId: investment.userId })
          .session(session);
        if (!user)
          throw new Error(`User not found for userId ${investment.userId}`);

        // Credit user's investment balance and total profit
        user.investmentBalance += dailyProfit;
        user.totalProfit += dailyProfit;
        await user.save({ session });

        // Record the transaction
        await Transaction.create(
          [
            {
              userId: investment.userId,
              type: "ai-return",
              amount: dailyProfit,
              currency: "USD",
              status: "completed",
              investmentId: String(investment._id),
              description: `Daily profit for ${investment.planLabel} plan.`,
            },
          ],
          { session }
        );

        // Mark investment as completed if matured
        if (new Date() >= investment.maturityDate) {
          await Investment.updateOne(
            { _id: investment._id },
            { status: "completed" },
            { session }
          );
        }

        await session.commitTransaction();
      } catch (err) {
        await session.abortTransaction();
        console.error(`Failed to process investment ${investment._id}:`, err);
      } finally {
        session.endSession();
      }
    }

    console.log("Daily investment cron job completed successfully.");
  } catch (error) {
    console.error("Error in daily investment cron:", error);
  } finally {
    // disconnect from DB in serverless environments
    if (mongoose.connection.readyState) await mongoose.disconnect();
  }
};
