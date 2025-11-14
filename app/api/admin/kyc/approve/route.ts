import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import UserExtra from "@/models/userExtra.model";
import { NextRequest } from "next/server";
import { kycModel } from "@/models/kyc.model";

export async function PATCH(request: NextRequest) {
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

    const { id, remarks } = await request.json();

    if (!id) {
      return Response.json(
        { success: false, error: "KYC ID is required" },
        { status: 400 }
      );
    }

    // Update KYC status to approved
    const updatedKyc = await kycModel.findByIdAndUpdate(
      id,
      {
        status: "approved",
        remarks: remarks || undefined,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedKyc) {
      return Response.json(
        { success: false, error: "KYC submission not found" },
        { status: 404 }
      );
    }

    // Update user verification status
    await UserExtra.findOneAndUpdate(
      { userId: updatedKyc.userId },
      { kycVerified: true },
      { upsert: true }
    );

    return Response.json({
      success: true,
      message: "KYC approved successfully",
      data: {
        id: updatedKyc._id,
        status: updatedKyc.status,
        remarks: updatedKyc.remarks,
      },
    });
  } catch (error) {
    console.error("Error approving KYC:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
