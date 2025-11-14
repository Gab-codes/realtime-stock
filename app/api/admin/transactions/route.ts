import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Transaction from "@/models/transaction.model";
import { NextRequest } from "next/server";

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

    // Get total count for pagination
    const totalTransactions = await Transaction.countDocuments();

    // Get transactions
    const transactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Transform data to match component interface
    const transformedTransactions = transactions.map((txn) => ({
      id: txn._id,
      type: txn.type,
      amount: txn.amount,
      currency: txn.currency,
      status:
        txn.status === "completed"
          ? "approved"
          : txn.status === "failed"
          ? "rejected"
          : "pending",
      date: txn.createdAt.toISOString().split("T")[0],
      description: `${txn.type} via ${txn.network || "system"}`,
      user: txn.userId, // For now, just use userId as placeholder
    }));

    return Response.json({
      success: true,
      data: transformedTransactions,
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
