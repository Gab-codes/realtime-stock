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

    const sessionUser = session.user as unknown as any;
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

    // Find the transaction
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return Response.json(
        { success: false, error: "Transaction not found" },
        { status: 404 }
      );
    }

    // Check if transaction is already processed
    if (transaction.status !== "pending") {
      return Response.json(
        { success: false, error: "Transaction already processed" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Update transaction status to completed
      transaction.status = "completed";
      await transaction.save();

      // Add amount to user's deposited balance
      const userExtra = await UserExtra.findOne({ userId: transaction.userId });
      if (userExtra) {
        userExtra.depositedBalance += transaction.amount;
        await userExtra.save();
      } else {
        // Create userExtra if it doesn't exist
        await UserExtra.create({
          userId: transaction.userId,
          depositedBalance: transaction.amount,
          investmentBalance: 0,
          totalProfit: 0,
          kycVerified: false,
        });
      }
    } else if (action === "decline") {
      // Update transaction status to failed
      transaction.status = "failed";
      await transaction.save();
    }

    return Response.json({
      success: true,
      message: `Transaction ${action}d successfully`,
      transaction: {
        id: transaction._id,
        status: transaction.status,
        amount: transaction.amount,
        userId: transaction.userId,
      },
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
