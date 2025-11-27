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
    return { success: false, error: "sign_in_failed", message };
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

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Sign out successful" };
  } catch (error) {
    console.error("Sign out failed", error);
    return { success: false, error: "Sign out failed" };
  }
};
