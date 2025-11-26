"use client";

import React, { useState, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import { createWithdrawal } from "@/lib/actions/withdraw.action";
import { formatPrice } from "@/lib/utils";

type Currency = "BTC" | "USDT";

interface WithdrawalFormProps {
  depositedBalance: number;
  kycStatus: "pending" | "verified" | "rejected" | "unverified";
  prices: { BTC: number; USDT: number };
}

export default function WithdrawalForm({
  depositedBalance,
  kycStatus,
  prices,
}: WithdrawalFormProps) {
  const [currency, setCurrency] = useState<Currency>("USDT");
  const [usdAmount, setUsdAmount] = useState<number | "">("");
  const [wallet, setWallet] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const cryptoAmount = useMemo(() => {
    if (typeof usdAmount !== "number") return 0;
    return +(usdAmount / prices[currency]).toFixed(currency === "BTC" ? 8 : 2);
  }, [usdAmount, prices, currency]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!usdAmount || !wallet) {
      toast.error("Enter both amount and wallet address");
      return;
    }
    if (usdAmount > depositedBalance) {
      toast.error("Withdrawal amount exceeds available balance");
      return;
    }
    if (kycStatus !== "verified") {
      toast.error("KYC Verification Required, please complete your KYC first.");
      router.push("/kyc");
      return;
    }

    if (usdAmount < 500) {
      toast.error("Minimum withdrawal amount is $500");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createWithdrawal({
        currency: currency,
        usdAmount: usdAmount,
        cryptoAmount: cryptoAmount,
        txHash: wallet,
      });

      if (!res.success) throw new Error(res.error);
      toast.success("Withdrawal successful");
    } catch (err) {
      console.error(err);
      toast.error("Could not complete withdrawal process. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white max-w-2xl mx-auto md:mt-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Withdraw Funds 💸
        </CardTitle>
        <div className="text-muted-foreground text-sm">
          Available Balance: <strong>{formatPrice(depositedBalance)}</strong>
        </div>
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
                <SelectItem value="USDT">USDT (ERC 20)</SelectItem>
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
            {usdAmount && (
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
              hours in some cases. Ensure your wallet address is correct.
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
