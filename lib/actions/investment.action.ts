"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import userExtraModel from "@/models/userExtra.model";
import Transaction from "@/models/transaction.model";
import Investment from "@/models/investment.model";

interface InvestmentPayload {
  amount: number;
  days: number;
  profitRates: Record<number, number>;
}

export const createInvestment = async (payload: InvestmentPayload) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Not authenticated" };

    const userId = session.user.id;
    const { amount, days, profitRates } = payload;

    if (!amount || amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }

    const userExtra = await userExtraModel.findOne({ userId });
    if (!userExtra) {
      return { success: false, error: "User data not found" };
    }

    // Check if user has enough deposited balance
    if (userExtra.depositedBalance < amount) {
      return { success: false, error: "Insufficient deposited balance" };
    }

    const profitRate = profitRates[days] ?? 0.3;
    const startedAt = new Date();
    const maturityDate = new Date(
      startedAt.getTime() + days * 24 * 60 * 60 * 1000
    );

    // Deduct from deposited balance and add to investment balance
    userExtra.depositedBalance -= amount;
    userExtra.investmentBalance += amount;
    await userExtra.save();

    // Create investment portfolio record
    const investment = await Investment.create({
      userId,
      principal: amount,
      days,
      dailyRate: profitRate,
      planLabel: `${days}-day Plan`,
      startedAt,
      maturityDate,
      status: "active",
    });

    // Create a linked transaction record
    await Transaction.create({
      userId,
      type: "investment",
      amount,
      currency: "USD",
      status: "completed",
      investmentId: investment._id,
      description: `Started ${days}-day AI investment plan at ${(
        profitRate * 100
      ).toFixed(0)}% total return.`,
    });

    return {
      success: true,
      message: `Investment of $${amount} for ${days} days started successfully.`,
    };
  } catch (error: any) {
    console.error("Error creating investment:", error?.message || error);
    return { success: false, error: error?.message || "Internal server error" };
  }
};

export const getPortfolio = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = session.user.id;

    const [investments] = await Promise.all([
      Investment.find({ userId }).sort({ createdAt: -1 }),
    ]);

    const totalInvested = investments.reduce(
      (sum, i) => sum + (i.status === "cancelled" ? 0 : i.principal),
      0
    );

    const totalProfit = investments.reduce(
      (sum, i) => sum + (i.status === "cancelled" ? 0 : i.profitAccrued ?? 0),
      0
    );

    const active = investments
      .filter((i) => i.status === "active")
      .reduce((sum, i) => sum + i.principal, 0);

    return {
      success: true,
      data: {
        investments: investments.map((i) => ({
          id: i._id.toString(),
          planLabel: i.planLabel,
          principal: i.principal,
          days: i.days,
          dailyRate: i.dailyRate,
          startedAt: i.startedAt,
          maturityDate: i.maturityDate,
          status: i.status,
          profitAccrued: i.profitAccrued ?? 0,
        })),
        totals: {
          totalInvested,
          profitEarned: totalProfit,
          active,
        },
      },
    };
  } catch (error: any) {
    console.error("Error fetching portfolio:", error);
    return { success: false, error: "Internal server error" };
  }
};
