"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import Transaction from "@/models/transaction.model";
import { notifyAdmin } from "../telegram";

interface DepositPayload {
  currency: "BTC" | "USDT";
  usdAmount: number;
  cryptoAmount: number;
  address: string;
  txHash?: string | null;
  network?: string;
}

export const createDeposit = async (payload: DepositPayload) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    await Transaction.create({
      userId,
      type: "deposit",
      amount: payload.usdAmount,
      currency: payload.currency,
      status: "pending",
      txHash: payload.txHash || null,
      network: payload.network || undefined,
    });

    notifyAdmin(
      `🔔 *New Deposit Recorded*\n\n` +
        `User: ${userId}\n` +
        `Currency: ${payload.currency}\n` +
        `USD Amount: $${payload.usdAmount}\n` +
        `Status: Pending` +
        `confirm payment and login to admin dashboard`
    ).catch((err) => console.error(err));

    return {
      success: true,
      message: "Deposit request created successfully.",
    };
  } catch (error) {
    console.error("Error creating deposit transaction:", error);
    return { success: false, error: "Internal server error" };
  }
};
