"use server";

import axios from "axios";
import { headers } from "next/headers";

export const approveKycSubmission = async (id: string, remarks?: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.patch(`${baseUrl}/api/admin/kyc/approve`, {
      id,
      remarks,
    }, {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error approving KYC:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to approve KYC"
    };
  }
};

export const rejectKycSubmission = async (id: string, remarks?: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.patch(`${baseUrl}/api/admin/kyc/reject`, {
      id,
      remarks,
    }, {
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error rejecting KYC:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to reject KYC"
    };
  }
};
