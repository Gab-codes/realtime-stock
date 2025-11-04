"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const InvestmentForm = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [days, setDays] = useState<number>(7);

  const profitRate = 0.65; // 65% per 7 days (example)
  const profit =
    typeof amount === "number"
      ? ((amount * profitRate * days) / 7).toFixed(2)
      : "0.00";

  return (
    <Card className="bg-crypto-blue/10 border border-crypto-blue/20 text-white mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Invest and Let AI Work for You 🤖
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">
          Enter the amount you’d like to invest, and our AI system will trade it
          intelligently to maximize your profit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-400 mb-1">
              Investment Amount (₦)
            </label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="bg-black/20 border-gray-700 text-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-400 mb-1">
              Duration (days)
            </label>
            <Input
              type="number"
              placeholder="e.g., 7"
              value={days}
              onChange={(e) =>
                setDays(e.target.value ? parseInt(e.target.value) : 7)
              }
              className="bg-black/20 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-300">
            Expected Profit:{" "}
            <span className="font-semibold text-green-400">${profit}</span>
          </p>
          <p className="text-xs text-gray-500">
            (Based on an estimated {profitRate * 100}% return every 7 days)
          </p>
        </div>

        <Button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full">
          Start Investment
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
