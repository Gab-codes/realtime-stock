"use server";

import { kycModel } from "@/models/kyc.model";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";

export const submitKYC = async ({
  idType,
  frontImageUrl,
  backImageUrl,
}: {
  idType: "id-card" | "passport" | "driver-license";
  frontImageUrl: string;
  backImageUrl: string;
}) => {
  try {
    // Authenticate current user
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    // Upsert the user KYC record
    await kycModel.findOneAndUpdate(
      { userId },
      { userId, idType, frontImageUrl, backImageUrl, status: "pending" },
      { upsert: true, new: true }
    );

    return { success: true, message: "KYC submitted successfully" };
  } catch (error) {
    console.error("KYC submission failed:", error);
    return { success: false, error: "Internal server error" };
  }
};
