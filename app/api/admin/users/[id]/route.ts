import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import transactionModel from "@/models/transaction.model";
import investmentModel from "@/models/investment.model";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { kycModel } from "@/models/kyc.model";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = params;

    // Delete associated data first
    await transactionModel.deleteMany({ userId: id });
    await investmentModel.deleteMany({ userId: id });
    await kycModel.deleteMany({ userId: id });

    // Delete user extra data
    await userExtraModel.findOneAndDelete({ userId: id });

    return NextResponse.json({
      success: true,
      message: "User and associated data deleted successfully",
    });
  } catch (error) {
    console.error("deleteUser error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user" },
      { status: 500 }
    );
  }
};
