import { NextRequest, NextResponse } from "next/server";
import { requestPasswordReset } from "@/lib/actions/auth.action";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body?.email;
    const callbackURL = body?.callbackURL || "/reset-password";
    if (!email)
      return NextResponse.json(
        { success: false, error: "Missing email" },
        { status: 400 }
      );

    const result = await requestPasswordReset(email, callbackURL);
    if (result.success) return NextResponse.json({ success: true });
    return NextResponse.json(
      { success: false, error: result.error || "Failed" },
      { status: 400 }
    );
  } catch (err) {
    console.error("/api/auth/request-password-reset error", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
