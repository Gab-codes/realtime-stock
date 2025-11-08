// app/api/kyc/submit/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth"; // your exported auth instance
import { kycModel } from "@/models/kyc.model";
import userExtraModel from "@/models/userExtra.model";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idType, frontImageUrl, backImageUrl } = body;

    if (!idType || !frontImageUrl || !backImageUrl) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // get session from BetterAuth
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // ensure one record per user: use upsert to allow re-submission
    await kycModel.findOneAndUpdate(
      { userId },
      {
        userId,
        idType,
        frontImageUrl,
        backImageUrl,
        status: "pending",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // mark user extra kycVerified false (pending)
    await userExtraModel.updateOne(
      { userId },
      { $set: { kycVerified: false } }
    );

    return NextResponse.json({ success: true, message: "KYC submitted" });
  } catch (err) {
    console.error("Failed to submit KYC", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
