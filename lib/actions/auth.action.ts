"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import userExtraModel from "@/models/userExtra.model";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    if (response) {
      await userExtraModel.create({
        fullName: fullName,
        email: email,
        userId: response.user.id,
        depositedBalance: 0,
        investmentBalance: 0,
        totalProfit: 0,
        kycStatus: "unverified",
      });

      // send inngest event
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response, message: "Sign up successful" };
  } catch (error) {
    console.error("Sign up failed", error);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInWithEmail = async (data: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return { success: true, data: response, message: "Sign in successful" };
  } catch (error) {
    console.error("Sign in failed", error);
    // Detect unverified email from error message if available
    const message = error instanceof Error ? error.message : String(error);
    if (/verify|verification|verified/i.test(message)) {
      return { success: false, error: "email_unverified", message };
    }
    return { success: false, error: message, message };
  }
};

export async function resendVerificationEmail(email: string) {
  try {
    await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/dashboard",
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err?.message || "Failed" };
  }
}

export async function requestPasswordReset(
  email: string,
  callbackURL = "/reset-password"
) {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: callbackURL,
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("requestPasswordReset failed", err);
    const message = err?.message || String(err);
    // Map some common errors
    if (/not found|no user|user_not_found/i.test(message)) {
      return { success: false, error: "user_not_found", message };
    }
    return { success: false, error: "request_failed", message };
  }
}

export async function resetPassword(newPassword: string, token: string) {
  try {
    await auth.api.resetPassword({ body: { newPassword, token } });
    return { success: true };
  } catch (err: any) {
    console.error("resetPassword failed", err);
    const message = err?.message || String(err);
    if (/expired|token_expired/i.test(message))
      return { success: false, error: "token_expired", message };
    if (/invalid|invalid_token/i.test(message))
      return { success: false, error: "invalid_token", message };
    return { success: false, error: "reset_failed", message };
  }
}

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Sign out successful" };
  } catch (error) {
    console.error("Sign out failed", error);
    return { success: false, error: "Sign out failed" };
  }
};
