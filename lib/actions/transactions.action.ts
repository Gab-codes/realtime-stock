"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import Transaction from "@/models/transaction.model";

export const getUserTransactions = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    //
    let totalDeposits = 0;
    let totalWithdrawals = 0;

    for (const t of transactions) {
      if (t.type === "deposit" && t.status === "completed") {
        totalDeposits += t.amount;
      }

      if (t.type === "withdrawal") {
        totalWithdrawals += t.amount;
      }
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(transactions)),
      stats: {
        totalDeposits,
        totalWithdrawals,
      },
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Internal server error" };
  }
};
