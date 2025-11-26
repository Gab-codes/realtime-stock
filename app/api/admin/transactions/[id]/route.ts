import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import Transaction from "@/models/transaction.model";
import UserExtra from "@/models/userExtra.model";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sessionUser = session.user as any;
    if (sessionUser.role !== "admin") {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = params;
    const { action } = await request.json();

    if (!["approve", "decline"].includes(action)) {
      return Response.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    // Find transaction
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return Response.json(
        { success: false, error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Already processed?
    if (transaction.status !== "pending") {
      return Response.json(
        { success: false, error: "Transaction already processed" },
        { status: 400 }
      );
    }

    // Fetch user's extra data
    const userExtra = await UserExtra.findOne({ userId: transaction.userId });
    if (!userExtra) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // ----------------------------------------
    // APPROVE
    // ----------------------------------------
    if (action === "approve") {
      transaction.status = "completed";
      await transaction.save();

      if (transaction.type === "deposit") {
        // Deposit → Add balance on approval
        userExtra.depositedBalance += transaction.amount;
        await userExtra.save();
      }

      // Withdrawal approval → NO BALANCE CHANGE
      // Balance was already deducted at request time

      return Response.json({
        success: true,
        message: "Transaction approved successfully",
        transaction: {
          id: transaction._id,
          status: transaction.status,
          amount: transaction.amount,
          type: transaction.type,
        },
      });
    }

    // ----------------------------------------
    // DECLINE
    // ----------------------------------------
    if (action === "decline") {
      transaction.status = "failed";
      await transaction.save();

      if (transaction.type === "withdrawal") {
        // Withdrawal declined → refund user
        userExtra.depositedBalance += transaction.amount;
        await userExtra.save();
      }

      // Deposit decline → no balance action

      return Response.json({
        success: true,
        message: "Transaction declined successfully",
        transaction: {
          id: transaction._id,
          status: transaction.status,
          amount: transaction.amount,
          type: transaction.type,
        },
      });
    }
  } catch (error) {
    console.error("Error updating transaction:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
