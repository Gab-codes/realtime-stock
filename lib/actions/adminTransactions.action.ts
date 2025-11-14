"use server";

import { headers } from "next/headers";

export const getAdminTransactions = async (page: number = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions?page=${page}`,
      {
        headers: {
          cookie: (await headers()).get("cookie") || "",
        },
      }
    );

    if (!response.ok) {
      return { success: false, error: "Failed to fetch transactions" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching admin transactions:", error);
    return { success: false, error: "Internal server error" };
  }
};
