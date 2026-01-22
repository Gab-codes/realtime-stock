"use server";

import Investment from "@/models/investment.model";
import Transaction from "@/models/transaction.model";
import { kycModel } from "@/models/kyc.model";
import userExtraModel from "@/models/userExtra.model";
import { auth } from "../better-auth/auth";
import { headers } from "next/headers";

export const getAdminMetrics = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const sessionUser = session.user as unknown as any;
    if (sessionUser.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Users
    const totalUsers = await userExtraModel.countDocuments();

    // Investments
    const totalInvestments = await Investment.countDocuments();
    const activeInvestments = await Investment.countDocuments({
      status: "active",
    });

    // Sum of principal for all investments
    const investedAgg = await Investment.aggregate([
      { $group: { _id: null, total: { $sum: "$principal" } } },
    ]).exec();
    const totalInvestedAmount = investedAgg?.[0]?.total || 0;

    // Transactions sums
    const depositsAgg = await Transaction.aggregate([
      { $match: { type: "deposit", status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).exec();
    const totalDeposits = depositsAgg?.[0]?.total || 0;

    const withdrawalsAgg = await Transaction.aggregate([
      { $match: { type: "withdrawal", status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]).exec();
    const totalWithdrawals = withdrawalsAgg?.[0]?.total || 0;

    // KYC stats
    const kycPending = await kycModel.countDocuments({ status: "pending" });
    const kycApproved = await kycModel.countDocuments({ status: "approved" });
    const kycRejected = await kycModel.countDocuments({ status: "rejected" });

    return {
      success: true,
      data: {
        totalUsers,
        totalInvestments,
        activeInvestments,
        totalInvestedAmount,
        totalDeposits,
        totalWithdrawals,
        kycStats: {
          pending: kycPending,
          approved: kycApproved,
          rejected: kycRejected,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching admin metrics:", error);
    return { success: false, error: "Failed to fetch metrics" };
  }
};
