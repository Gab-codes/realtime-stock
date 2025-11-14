"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";

export const updateTransactionStatus = async (
  transactionId: string,
  action: "approve" | "decline"
) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const sessionUser = session.user as unknown as any;
    if (sessionUser.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/transactions/${transactionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: (await headers()).get("cookie") || "",
        },
        body: JSON.stringify({ action }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.error || "Failed to update transaction" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return { success: false, error: "Internal server error" };
  }
};
