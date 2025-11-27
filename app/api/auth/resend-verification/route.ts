"use server";

import { auth } from "@/lib/better-auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // BETTER AUTH - resend verification link
    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/dashboard",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Verification link sent",
    });
  } catch (error) {
    console.error("Error resending verification email:", error);

    return NextResponse.json(
      { success: false, error: "Failed to resend verification email" },
      { status: 500 }
    );
  }
}
