import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params || {};
  const url = new URL(request.url);
  const callbackURL = url.searchParams.get("callbackURL") || "/reset-password";

  if (!token) {
    return NextResponse.redirect(
      new URL(`/reset-password?error=missing_token`, request.url)
    );
  }

  try {
    // Build the redirect to the callback URL (may be relative). Ensure token is included.
    let redirectTo: URL;
    if (callbackURL.startsWith("http")) {
      redirectTo = new URL(callbackURL);
    } else {
      redirectTo = new URL(callbackURL, request.url);
    }

    // Only set token if it's not already present
    if (!redirectTo.searchParams.get("token")) {
      redirectTo.searchParams.set("token", token);
    }

    return NextResponse.redirect(redirectTo.toString());
  } catch (err) {
    console.error("Dynamic reset-password route redirect failed", err);
    const fallback = new URL(
      `/reset-password?token=${encodeURIComponent(
        token
      )}&error=redirect_failed`,
      request.url
    );
    return NextResponse.redirect(fallback);
  }
}
