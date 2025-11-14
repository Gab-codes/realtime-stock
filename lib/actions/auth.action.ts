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
        name: fullName,
        email: email,
        userId: response.user.id,
        depositedBalance: 0,
        investmentBalance: 0,
        totalProfit: 0,
        kycVerified: false,
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
    return { success: false, error: "Sign in failed" };
  }
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { success: true, message: "Sign out successful" };
  } catch (error) {
    console.error("Sign out failed", error);
    return { success: false, error: "Sign out failed" };
  }
};
