import { NextResponse } from "next/server";
import { runDailyInvestmentCron } from "../update-investments/route";

export async function GET() {
  try {
    await runDailyInvestmentCron();
    return NextResponse.json({ success: true, message: "Cron executed" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Cron failed" },
      { status: 500 }
    );
  }
}
