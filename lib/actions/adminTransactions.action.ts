"use server";

import { headers } from "next/headers";
import axios from "axios";

export const getAdminTransactions = async (page: number = 1) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions?page=${page}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching admin transactions:", error);
    return { success: false, error: "Internal server error" };
  }
};

export const updateTransactionStatus = async (
  transactionId: string,
  action: "approve" | "decline"
) => {
  try {
    const cookie = (await headers()).get("cookie") || "";

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions/${transactionId}`,
      { action },
      {
        headers: {
          "Content-Type": "application/json",
          cookie,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error updating transaction status:", error);

    // Axios error handling
    const apiError =
      error.response?.data?.error || "Failed to update transaction";

    return { success: false, error: apiError };
  }
};
