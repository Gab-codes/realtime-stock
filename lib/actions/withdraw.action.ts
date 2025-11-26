"use server";

import { headers } from "next/headers";
import mongoose from "mongoose";
import { auth } from "../better-auth/auth";
import Transaction from "@/models/transaction.model";
import userExtraModel from "@/models/userExtra.model";

interface WithdrawalPayload {
  currency: "BTC" | "USDT";
  usdAmount: number;
  cryptoAmount: number;
  txHash?: string | null;
  network?: string;
}

export const createWithdrawal = async (payload: WithdrawalPayload) => {
  const sessionDb = await mongoose.startSession();

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    sessionDb.startTransaction();

    // Check user balance inside the transaction to ensure accuracy
    const userExtra = await userExtraModel
      .findOne({ userId })
      .session(sessionDb);

    if (!userExtra) {
      await sessionDb.abortTransaction();
      return { success: false, error: "User extra record not found" };
    }

    if (userExtra.depositedBalance < payload.usdAmount) {
      await sessionDb.abortTransaction();
      return { success: false, error: "Insufficient balance" };
    }

    // Create withdrawal transaction
    await Transaction.create(
      [
        {
          userId,
          type: "withdrawal",
          amount: payload.usdAmount,
          currency: payload.currency,
          status: "pending",
          txHash: payload.txHash || null,
          network: payload.network || undefined,
        },
      ],
      { session: sessionDb }
    );

    // Deduct balance
    await userExtraModel.updateOne(
      { userId },
      { $inc: { depositedBalance: -payload.usdAmount } },
      { session: sessionDb }
    );

    await sessionDb.commitTransaction();
    sessionDb.endSession();

    return {
      success: true,
      message: "Withdrawal request created successfully.",
    };
  } catch (error) {
    await sessionDb.abortTransaction();
    sessionDb.endSession();
    console.error("Error creating withdrawal:", error);

    return { success: false, error: "Internal server error" };
  }
};
