import { NextRequest, NextResponse } from "next/server";
import { resetPassword } from "@/lib/actions/auth.action";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { newPassword, token } = body || {};
    if (!newPassword || !token)
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );

    const result = await resetPassword(newPassword, token);
    if (result.success) return NextResponse.json({ success: true });
    return NextResponse.json(
      {
        success: false,
        error: result.error || "Failed",
        message: result.message,
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("/api/auth/reset-password error", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
