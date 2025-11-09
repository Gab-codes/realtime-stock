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

    return {
      success: true,
      data: JSON.parse(JSON.stringify(transactions)),
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Internal server error" };
  }
};
