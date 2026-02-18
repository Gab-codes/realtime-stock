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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info, Loader, CheckCircle2 } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const cryptoAmount = useMemo(() => {
    if (typeof usdAmount !== "number") return 0;
    return +(usdAmount / prices[currency]).toFixed(currency === "BTC" ? 8 : 2);
  }, [usdAmount, prices, currency]);

  async function handleWithdrawClick(e: React.FormEvent) {
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

    setOpen(true);
    setIsSuccess(false);
  }

  async function handleConfirm() {
    setIsSubmitting(true);
    try {
      const res = await createWithdrawal({
        currency: currency,
        usdAmount: usdAmount as number,
        cryptoAmount: cryptoAmount,
        txHash: wallet,
      });

      if (!res.success) throw new Error(res.error);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message || "Could not complete withdrawal process. Try again.",
      );
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white max-w-2xl mx-auto md:mt-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Withdraw Funds
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

          <form onSubmit={handleWithdrawClick} className="space-y-5">
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
              {isSubmitting && <Loader className="animate-spin mr-2" />}
              {isSubmitting ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={(val) => !isSubmitting && setOpen(val)}>
        <DialogContent className="border-white/30 data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 data-[state=closed]:!zoom-out-0 data-[state=closed]:duration-300">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Are you sure you want to withdraw?
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Please review your withdrawal details below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-6">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                  <span className="text-gray-400">Wallet type</span>
                  <span className="font-medium text-right">
                    {currency === "BTC" ? "BTC (Bitcoin)" : "USDT (ERC 20)"}
                  </span>

                  <span className="text-gray-400">Amount in USD</span>
                  <span className="font-medium text-right">
                    {formatPrice(usdAmount as number)}
                  </span>

                  <span className="text-gray-400">Crypto amount</span>
                  <span className="font-medium text-right text-green-400">
                    {cryptoAmount} {currency}
                  </span>

                  <span className="text-gray-400">Wallet address</span>
                  <span className="font-medium text-right break-all text-[11px] leading-relaxed opacity-80">
                    {wallet}
                  </span>
                </div>
              </div>
              <DialogFooter className="flex flex-row gap-3 sm:justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                >
                  No, Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none bg-crypto-purple hover:bg-crypto-dark-purple text-white min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Processing
                    </>
                  ) : (
                    "Yes, Confirm"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 space-y-6 text-center">
              <div className="relative animate-success-pop">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="bg-green-500/10 p-5 rounded-full border border-green-500/20 relative">
                  <CheckCircle2 className="w-16 h-16 text-green-500 animate-[zoom-in_0.5s_ease-out]" />
                </div>
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Withdrawal Successful!
                </DialogTitle>
                <DialogDescription className="text-gray-400 max-w-[300px] mx-auto">
                  Your withdrawal request has been submitted and is being
                  processed. It may take up to 24 hours.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => setOpen(false)}
                className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full max-w-[200px]"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
