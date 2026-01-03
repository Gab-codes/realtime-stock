import { Button } from "@/components/ui/button";
import { auth } from "@/lib/better-auth/auth";
import Link from "next/link";
import ResendVerificationForm from "./ResendVerificationForm";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: { token?: string; email?: string };
}) {
  const props = await searchParams;
  const token = props?.token;
  const email = props?.email;

  if (!email) {
    return (
      <div className="max-w-xl mx-auto py-16">
        <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
        <p className="text-gray-400">
          Email is missing. Please return to sign-in or sign-up.
        </p>
        <Link href="/sign-in">
          <Button className="purple-btn mt-4">Go to Sign In</Button>
        </Link>
      </div>
    );
  }

  let status: "idle" | "success" | "error" = "idle";
  let message = "";

  // if token is present, attempt verification
  if (token) {
    try {
      await auth.api.verifyEmail({ query: { token } });
      status = "success";
      message = "Your email has been verified. You can now sign in.";
    } catch (err: any) {
      console.error("Email verification failed", err);
      status = "error";

      const raw = err?.message || "";

      // mapping internal error codes for clean ui
      if (raw.includes("token_expired")) {
        message =
          "Your verification link has expired. Please request a new one.";
      } else if (raw.includes("invalid_token")) {
        message =
          "This verification link is invalid. Please request a new one.";
      } else if (raw.includes("user_not_found")) {
        message = "This account no longer exists.";
      } else {
        message =
          "Verification failed. You can request a new verification email below.";
      }
    }
  }

  return (
    <div className="max-w-xl mx-auto py-16">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          {status === "success" ? "Email Verified" : "Verify Your Email"}
        </h1>

        {token ? (
          status === "success" ? (
            <div className="space-y-4">
              <p className="text-gray-400">{message}</p>
              <Link href="/sign-in">
                <Button className="purple-btn">Go to Sign In</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-red-400">{message}</p>
              <ResendVerificationForm email={email} />
            </div>
          )
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400">
              If you clicked a verification link, include the token param in the
              URL or request a new verification email below.
            </p>
            <ResendVerificationForm email={email} />
          </div>
        )}
      </div>
    </div>
  );
}
