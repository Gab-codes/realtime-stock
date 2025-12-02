"use server";

import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import { headers } from "next/headers";
import axios from "axios";

export const getUserData = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    const userData = await userExtraModel.findOne({ userId }).lean();

    if (!userData) {
      return {
        success: true,
        message: "User data not found",
        data: {
          depositedBalance: 0,
          totalProfit: 0,
          kycStatus: "unverified",
        },
      };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("getUserBalance error:", error);
    return { success: false, error: "Failed to get user balance" };
  }
};

export const getAllUsersData = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/admin/users/all-users`, {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching KYC submissions:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to fetch KYC submissions",
    };
  }
};
