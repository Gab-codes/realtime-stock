"use server";

import axios from "axios";
import { headers } from "next/headers";

export const getAdminKycSubmissions = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/admin/kyc`, {
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
