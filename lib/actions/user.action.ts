import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import { headers } from "next/headers";

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
        data: {
          depositedBalance: 0,
          investmentBalance: 0,
          totalProfit: 0,
          kycVerified: false,
        },
      };
    }

    return { success: true, data: userData };
  } catch (error) {
    console.error("getUserBalance error:", error);
    return { success: false, error: "Failed to get user balance" };
  }
};
