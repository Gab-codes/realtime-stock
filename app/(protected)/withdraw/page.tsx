"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { toast } from "sonner";

type Currency = "BTC" | "USDT";

async function fetchPrices(): Promise<{ BTC: number; USDT: number }> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=usd"
  );
  const data = await res.json();
  return {
    BTC: data.bitcoin?.usd ?? 0,
    USDT: data.tether?.usd ?? 1,
  };
}

export default function WithdrawalForm() {
  const [currency, setCurrency] = useState<Currency>("USDT");
  const [usdAmount, setUsdAmount] = useState<number | "">("");
  const [wallet, setWallet] = useState("");
  const [prices, setPrices] = useState<{ BTC: number; USDT: number } | null>(
    null
  );
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoadingPrices(true);
    fetchPrices()
      .then((p) => {
        if (mounted) setPrices(p);
      })
      .finally(() => setLoadingPrices(false));
    return () => {
      mounted = false;
    };
  }, []);

  const cryptoAmount = useMemo(() => {
    if (typeof usdAmount !== "number" || !prices) return 0;
    return +(usdAmount / prices[currency]).toFixed(currency === "BTC" ? 8 : 6);
  }, [usdAmount, prices, currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!usdAmount || !wallet) {
      toast.error("Enter both amount and wallet address");
      return;
    }
    setIsSubmitting(true);

    // Replace with API call to /api/withdrawals
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Your withdrawal request has been received. Please wait for approval."
      );
      setUsdAmount("");
      setWallet("");
    }, 1000);
  }

  return (
    <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white max-w-2xl mx-auto md:mt-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Withdraw Funds 💸
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-400 mb-4 text-sm">
          Request a withdrawal in BTC or USDT. You’ll receive funds once your
          transaction is confirmed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Currency selection */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Select Crypto
            </label>
            <Select
              value={currency}
              onValueChange={(v) => setCurrency(v as Currency)}
            >
              <SelectTrigger className="bg-black/20 border-gray-700 text-white w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0a0a] text-gray-200 border border-gray-800">
                <SelectItem value="USDT">USDT (stablecoin)</SelectItem>
                <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Amount (USD)
            </label>
            <Input
              type="number"
              min={1}
              step="0.01"
              placeholder="Enter USD amount"
              value={usdAmount}
              onChange={(e) =>
                setUsdAmount(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="bg-black/20 border-gray-700 text-white"
            />
            {prices && usdAmount && (
              <p className="text-xs text-gray-400 mt-2">
                You’ll receive approximately{" "}
                <span className="text-green-400 font-semibold">
                  {cryptoAmount} {currency}
                </span>
              </p>
            )}
          </div>

          {/* Wallet input */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Wallet Address
            </label>
            <Input
              type="text"
              placeholder={`Enter your ${currency} wallet address`}
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="bg-black/20 border-gray-700 text-white"
            />
          </div>

          {/* Info */}
          <div className="flex gap-2 text-xs text-amber-300">
            <Info size={14} />
            <p>
              Withdrawals are processed automatically and may take up to 24
              hours. Ensure your wallet address is correct — transactions cannot
              be reversed.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Request Withdrawal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
