import { auth } from "@/lib/better-auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

function safeDecodeJwtPayload(token?: string) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = Buffer.from(payload, "base64").toString("utf8");
    const obj = JSON.parse(json);
    return obj;
  } catch (e) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const callbackURL = url.searchParams.get("callbackURL") || "/sign-in";

  if (!token) {
    // If you can extract email from callbackURL, include it
    let email = null;
    try {
      const cb = new URL(callbackURL, request.url);
      email = cb.searchParams.get("email");
    } catch {
      // ignore
    }

    const missingRedirect = new URL(
      `/verify-email?error=missing_token`,
      request.url
    );
    if (email) missingRedirect.searchParams.set("email", email);
    return NextResponse.redirect(missingRedirect);
  }

  try {
    // Attempt to verify token via Better Auth
    await auth.api.verifyEmail({
      query: {
        token,
        callbackURL,
      },
      headers: request.headers,
    });

    // Success: redirect to callbackURL (resolve relative urls)
    const redirectTo = callbackURL.startsWith("http")
      ? callbackURL
      : new URL(callbackURL, request.url).toString();

    return NextResponse.redirect(redirectTo);
  } catch (err) {
    console.error("Email verification failed (API)", err);

    // Try to get email from callbackURL first
    let email: string | null = null;
    try {
      const cb = new URL(callbackURL, request.url);
      email = cb.searchParams.get("email");
    } catch {
      email = null;
    }

    // If not found, try to decode the token payload (UX-only, no verification)
    if (!email) {
      const payload = safeDecodeJwtPayload(token);
      if (payload && typeof payload.email === "string") {
        email = payload.email;
      }
    }

    // Build redirect to front-end verify page including token, error, and email if available
    const redirect = new URL(`/verify-email`, request.url);
    redirect.searchParams.set("token", token);
    redirect.searchParams.set("error", "verification_failed");
    if (email) redirect.searchParams.set("email", email);

    return NextResponse.redirect(redirect);
  }
}
