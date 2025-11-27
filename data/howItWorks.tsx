import React from "react";
import { Download, Wallet, BarChart4 } from "lucide-react";

export const steps = [
  {
    number: "01",
    icon: <Download className="h-6 w-6" />,
    title: "Create Your Account",
    description:
      "Sign up in minutes with our streamlined onboarding process. No complicated forms or lengthy verification.",
  },
  {
    number: "02",
    icon: <Wallet className="h-6 w-6" />,
    title: "Fund Your Wallet",
    description:
      "Easily deposit crypto or fiat through our platform with zero deposit fees.",
  },
  {
    number: "03",
    icon: <BarChart4 className="h-6 w-6" />,
    title: "Start Trading",
    description:
      "Don't know where to start? Our AI can do the heavy lifting and trade on your behalf with daily consistent return.",
  },
];
