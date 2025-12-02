import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Transaction from "@/models/transaction.model";
import { NextRequest } from "next/server";
import userExtraModel from "@/models/userExtra.model";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sessionUser = session.user as unknown as User;
    if (sessionUser.role !== "admin") {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 15;
    const skip = (page - 1) * limit;

    // Count only relevant transactions for pagination
    const totalTransactions = await Transaction.countDocuments({
      type: { $in: ["deposit", "withdrawal", "investment"] },
    });

    // Paginated transactions
    const transactions = await Transaction.find({
      type: { $in: ["deposit", "withdrawal", "investment"] },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Fetch user info (fullname + email)
    const users = await userExtraModel.find({}).lean();

    // Create fast lookup table
    const userMap: Record<string, any> = {};
    users.forEach((user) => {
      userMap[user.userId] = user;
    });

    // Attach user info to each transaction
    const enrichedTransactions = transactions.map((txn) => {
      const userInfo = userMap[txn.userId] || {};

      return {
        id: txn._id,
        type: txn.type,
        amount: txn.amount,
        currency: txn.currency,
        userId: txn.userId,

        // Injected fields
        fullName: userInfo.name || userInfo.fullName || "N/A",
        email: userInfo.email || "N/A",

        status:
          txn.status === "completed"
            ? "approved"
            : txn.status === "failed"
            ? "rejected"
            : "pending",

        date: txn.createdAt.toISOString().split("T")[0],
        description: `${txn.type} via ${txn.network || "system"}`,
      };
    });

    return Response.json({
      success: true,
      data: enrichedTransactions,
      pagination: {
        page,
        limit,
        total: totalTransactions,
        totalPages: Math.ceil(totalTransactions / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin transactions:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
