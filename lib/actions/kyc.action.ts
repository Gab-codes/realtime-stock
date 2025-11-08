"use server";

import { kycModel } from "@/models/kyc.model";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";

export const submitKYC = async ({
  idType,
  frontImageUrl,
  backImageUrl,
}: {
  idType: string;
  frontImageUrl: string;
  backImageUrl: string;
}) => {
  try {
    // Get current logged-in user
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    // Check if KYC already exists
    const existing = await kycModel.findOne({ userId });
    if (existing) {
      return { success: false, error: "KYC already submitted" };
    }

    // Create KYC record
    await kycModel.create({
      userId,
      idType,
      frontImageUrl,
      backImageUrl,
      status: "pending",
    });

    return { success: true, message: "KYC submitted successfully" };
  } catch (error) {
    console.error("KYC submission failed:", error);
    return { success: false, error: "Internal server error" };
  }
};
