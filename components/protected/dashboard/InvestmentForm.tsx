"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const InvestmentForm = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [days, setDays] = useState<number>(30);

  // Map durations to profit percentages
  const profitRates: Record<number, number> = {
    30: 0.3,
    60: 0.35,
    90: 0.4,
  };

  const profitRate = profitRates[days];
  const profit =
    typeof amount === "number"
      ? (amount * profitRate * days).toFixed(2)
      : "0.00";

  return (
    <Card
      id="invest"
      className="bg-crypto-blue/80 border border-crypto-blue/20 text-white mt-4 md:mt-8"
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Invest and Let AI Work for You 🤖
        </CardTitle>
      </CardHeader>

      <CardContent className="px-3">
        <p className="text-gray-400 mb-4">
          Enter an amount you’d like to invest. Our AI system will trade
          intelligently and generate consistent daily returns.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Amount Input */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-400 mb-1">
              Investment Amount ($)
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

          {/* Duration Dropdown */}
          <div className="flex flex-col w-full">
            <label className="text-sm text-gray-400 mb-1">Duration</label>
            <Select
              value={days.toString()}
              onValueChange={(value) => setDays(parseInt(value))}
            >
              <SelectTrigger className="bg-black/20 border-gray-700 text-white w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] text-gray-200 border border-gray-800">
                <SelectItem value="30">30 Days (30%)</SelectItem>
                <SelectItem value="60">60 Days (35%)</SelectItem>
                <SelectItem value="90">90 Days (40%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Profit Display */}
        <div className="mb-4">
          <p className="text-gray-300">
            Expected Profit:{" "}
            <span className="font-semibold text-green-400">${profit}</span>
          </p>
          <p className="text-xs text-gray-500">
            (Calculated at {profitRate * 100}% daily for {days} days)
          </p>
        </div>

        {/* Submit Button */}
        <Button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full">
          Start Investment
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
