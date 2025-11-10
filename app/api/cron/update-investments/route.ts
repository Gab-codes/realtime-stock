import { NextResponse } from "next/server";
import Investment from "@/models/investment.model";
import userExtraModel from "@/models/userExtra.model";
import { connectToDatabase } from "@/database/mongoose";

export const dynamic = "force-dynamic"; // ensure route isn't cached

export async function GET() {
  await connectToDatabase();

  try {
    const now = new Date();
    const investments = await Investment.find({ status: "active" });

    for (const inv of investments) {
      if (now >= inv.maturityDate) {
        // mark as completed and pay user
        const userExtra = await userExtraModel.findOne({ userId: inv.userId });
        if (userExtra) {
          const profit = inv.principal * inv.totalRate;
          userExtra.depositedBalance += inv.principal + profit;
          userExtra.investmentBalance -= inv.principal;
          await userExtra.save();
        }

        inv.status = "completed";
        await inv.save();
      }
    }

    return NextResponse.json({
      success: true,
      message: "Investments updated.",
    });
  } catch (err) {
    console.error("Cron job error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update investments." },
      { status: 500 }
    );
  }
}
