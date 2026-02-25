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

    // Run both queries in parallel for better performance
    const [transactions, statsResult] = await Promise.all([
      Transaction.find({ userId }).sort({ createdAt: -1 }).lean(),

      Transaction.aggregate([
        { $match: { userId } },
        {
          $group: {
            _id: null,
            totalDeposits: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$type", "deposit"] },
                      { $eq: ["$status", "completed"] },
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },
            totalWithdrawals: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$type", "withdrawal"] },
                      { $eq: ["$status", "completed"] },
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },
            pendingDeposits: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$type", "deposit"] },
                      { $eq: ["$status", "pending"] },
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },
            pendingWithdrawals: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$type", "withdrawal"] },
                      { $eq: ["$status", "pending"] },
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },
          },
        },
      ]),
    ]);

    const stats = statsResult[0] || {
      totalDeposits: 0,
      totalWithdrawals: 0,
      pendingDeposits: 0,
      pendingWithdrawals: 0,
    };

    return {
      success: true,
      data: JSON.parse(JSON.stringify(transactions)),
      stats: {
        totalDeposits: stats.totalDeposits || 0,
        totalWithdrawals: stats.totalWithdrawals || 0,
        pendingDeposits: stats.pendingDeposits || 0,
        pendingWithdrawals: stats.pendingWithdrawals || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Internal server error" };
  }
};
