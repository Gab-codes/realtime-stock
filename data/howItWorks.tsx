import React from "react";
import { Download, Wallet, BarChart4 } from "lucide-react";

export const steps = [
  {
    number: "01",
    icon: <Download className="h-6 w-6" />,
    title: "Create Your Account",
    description:
      "Sign up in minutes with a simple onboarding process. No trading knowledge or prior experience required.",
  },
  {
    number: "02",
    icon: <Wallet className="h-6 w-6" />,
    title: "Fund & Choose a Trading Period",
    description:
      "Deposit funds and select a fixed trading duration — 30, 60, or 90 days. Your capital is securely allocated for the selected period.",
  },
  {
    number: "03",
    icon: <BarChart4 className="h-6 w-6" />,
    title: "AI Trades, You Monitor",
    description:
      "Our AI handles all trading decisions automatically. Earnings are calculated daily, reflected in your account, and recorded in your transaction history while your funds remain locked.",
  },
];
