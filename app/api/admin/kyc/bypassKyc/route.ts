import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import UserExtra from "@/models/userExtra.model";
import { NextRequest } from "next/server";

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

    const { id } = await request.json();

    if (!id) {
      return Response.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update user verification status
    await UserExtra.findOneAndUpdate(
      { userId: id },
      { kycStatus: "verified" },
      { upsert: true }
    );

    return Response.json({
      success: true,
      message: "KYC approved successfully",
    });
  } catch (error) {
    console.error("Error approving KYC:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
