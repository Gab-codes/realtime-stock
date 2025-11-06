// components/deposit/DepositFlow.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Info } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Merchant deposit addresses (replace with your real addresses)
const MERCHANT_ADDRESSES = {
  BTC: "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH",
  USDT: "TXYZ...EXAMPLE_TRON_USDT_ADDRESS_OR_ERC20",
} as const;

type Currency = keyof typeof MERCHANT_ADDRESSES;

// Deposit record shape (client-side demo)
type DepositRecord = {
  id: string;
  currency: Currency;
  usdAmount: number;
  cryptoAmount: number;
  address: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
  txHash?: string | null;
};

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

/**
 * Fetch basic price data from CoinGecko public API.
 * Returns { BTC: priceUsd, USDT: priceUsd }
 */
async function fetchPrices(): Promise<{ BTC: number; USDT: number }> {
  // CoinGecko: bitcoin, tether
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch prices");
  const json = await res.json();
  // coin ids: bitcoin, tether
  return {
    BTC: json.bitcoin?.usd ?? 0,
    USDT: json.tether?.usd ?? 1, // tether should be ~1
  };
}

export default function DepositFlow({
  onCreateDeposit,
}: {
  /**
   * Optional callback to persist deposit. Receives the deposit record.
   * If not provided, component uses local state only.
   */
  onCreateDeposit?: (d: DepositRecord) => Promise<void> | void;
}) {
  const [step, setStep] = useState<number>(1);
  const [currency, setCurrency] = useState<Currency>("USDT");
  const [usdAmount, setUsdAmount] = useState<number | "">("");
  const [prices, setPrices] = useState<{ BTC: number; USDT: number } | null>(
    null
  );
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [errorPrices, setErrorPrices] = useState<string | null>(null);
  const [pendingDeposit, setPendingDeposit] = useState<DepositRecord | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Local list of deposits (demo)
  const [deposits, setDeposits] = useState<DepositRecord[]>([]);

  useEffect(() => {
    let mounted = true;
    setLoadingPrices(true);
    setErrorPrices(null);
    fetchPrices()
      .then((p) => {
        if (!mounted) return;
        setPrices(p);
      })
      .catch((err) => {
        console.error(err);
        setErrorPrices("Unable to fetch live prices. Try again later.");
      })
      .finally(() => mounted && setLoadingPrices(false));
    return () => {
      mounted = false;
    };
  }, []);

  // computed crypto amount (rounded)
  const cryptoAmount = useMemo(() => {
    if (typeof usdAmount !== "number" || !prices) return 0;
    if (currency === "BTC") {
      return +(usdAmount / prices.BTC).toFixed(8); // 8 decimals for BTC
    }
    if (currency === "USDT") {
      // USDT stable; use 2 or 6 decimals depending on chain — keep 6
      return +(usdAmount / prices.USDT).toFixed(6);
    }
    return 0;
  }, [usdAmount, prices, currency]);

  function addressFor(currency: Currency) {
    return MERCHANT_ADDRESSES[currency];
  }

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(addressFor(currency));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      // optional toast
      try {
        toast.success("Wallet address copied to clipboard.");
      } catch {}
    } catch {
      // ignore
    }
  }

  function validateStep1() {
    if (!usdAmount || typeof usdAmount !== "number" || usdAmount <= 0)
      return false;
    if (!prices) return false;
    return true;
  }

  async function goToPayment() {
    if (!validateStep1()) {
      try {
        toast.error("Invalid input", {
          description: "Enter a valid USD amount.",
        });
      } catch {}
      return;
    }
    setStep(2);
  }

  async function confirmPaid() {
    // create pending deposit record locally, and call optional callback to persist to server
    const record: DepositRecord = {
      id: uid("dep_"),
      currency,
      usdAmount: typeof usdAmount === "number" ? usdAmount : 0,
      cryptoAmount,
      address: addressFor(currency),
      status: "pending",
      createdAt: new Date().toISOString(),
      txHash: null,
    };

    setIsCreating(true);
    try {
      // optional server call
      if (onCreateDeposit) {
        await onCreateDeposit(record);
      } else {
        // local demo: store in local deposits array
        setDeposits((d) => [record, ...d]);
      }
      setPendingDeposit(record);
      setStep(3);
    } catch (err) {
      console.error(err);
      try {
        toast.error("Could not create deposit. Try again.");
      } catch {}
    } finally {
      setIsCreating(false);
    }
  }

  // Render helpers
  const formattedUsd = (v: number) =>
    v.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  const paymentURI = useMemo(() => {
    if (!addressFor(currency)) return "";
    // Make QR-friendly URI strings per currency.
    if (currency === "BTC") {
      // bitcoin:address?amount=0.001
      return `bitcoin:${addressFor("BTC")}?amount=${cryptoAmount}`;
    }
    if (currency === "USDT") {
      // USDT often on TRC20/ETH etc — we use a simple URI that encodes address + amount
      // Many wallets will just scan the address; advanced integrations may use chain-specific URIs.
      return `USDT:${addressFor("USDT")}?amount=${cryptoAmount}`;
    }
    return addressFor(currency);
  }, [currency, cryptoAmount]);

  // UI
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white">
        <CardHeader>
          <CardTitle>Deposit (USDT / BTC)</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step indicator */}
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
            <div
              className={`px-2 py-1 rounded ${
                step === 1 ? "bg-white/5" : "bg-transparent"
              }`}
            >
              1. Amount
            </div>
            <div
              className={`px-2 py-1 rounded ${
                step === 2 ? "bg-white/5" : "bg-transparent"
              }`}
            >
              2. Pay
            </div>
            <div
              className={`px-2 py-1 rounded ${
                step === 3 ? "bg-white/5" : "bg-transparent"
              }`}
            >
              3. Awaiting
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Currency</label>
                  <Select
                    value={currency}
                    onValueChange={(v) => setCurrency(v as Currency)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDT">USDT (stablecoin)</SelectItem>
                      <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Amount (USD)</label>
                  <Input
                    type="number"
                    min={1}
                    step="0.01"
                    placeholder="Enter USD amount"
                    value={usdAmount}
                    onChange={(e) =>
                      setUsdAmount(
                        e.target.value ? parseFloat(e.target.value) : ""
                      )
                    }
                    className="bg-black/20"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-300">
                <div>
                  Live prices:{" "}
                  {loadingPrices ? (
                    <span className="text-gray-400">loading...</span>
                  ) : errorPrices ? (
                    <span className="text-rose-400">{errorPrices}</span>
                  ) : prices ? (
                    <span className="text-gray-200">
                      BTC {prices.BTC ? `$${prices.BTC.toLocaleString()}` : "—"}{" "}
                      · USDT {prices.USDT ? `$${prices.USDT.toFixed(2)}` : "—"}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => {
                    setUsdAmount("");
                    setCurrency("USDT");
                  }}
                >
                  Reset
                </Button>
                <Button
                  className="bg-crypto-purple text-white ml-auto"
                  onClick={goToPayment}
                >
                  Next: Payment details
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400">
                    Send to wallet
                  </label>
                  <div className="mt-2 p-3 bg-[#071022] rounded-md border border-white/5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-xs text-gray-400">Address</div>
                        <div className="text-sm break-all select-all">
                          {addressFor(currency)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          onClick={handleCopyAddress}
                          className="inline-flex items-center gap-2 px-2 py-1 rounded bg-white/5 hover:bg-white/8"
                        >
                          <Copy size={14} />
                          {copied ? (
                            <span className="text-xs text-green-300">
                              Copied
                            </span>
                          ) : (
                            <span className="text-xs">Copy</span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-300">
                      <div>
                        Send exactly:{" "}
                        <strong>
                          {cryptoAmount} {currency}
                        </strong>
                      </div>
                      <div className="mt-1 text-gray-400 text-xs">
                        Note: sending a different coin or network may result in
                        loss of funds.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-[#071022] p-4 rounded-md border border-white/5">
                    {/* <QRCode
                      value={paymentURI}
                      size={160}
                      bgColor="transparent"
                      fgColor="#00f6d6"
                      level="M"
                    /> */}
                  </div>

                  <div className="mt-3 text-sm text-gray-300 text-center">
                    <div>Scan the QR code with your wallet to pay</div>
                    <div className="mt-2 text-xs text-gray-400">
                      Amount will be auto-calculated using latest market rates.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button
                  className="ml-auto bg-crypto-purple text-white"
                  onClick={confirmPaid}
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "I have paid (Mark as paid)"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && pendingDeposit && (
            <div className="space-y-4">
              <div className="py-4 rounded-md bg-[#071022] border border-white/5">
                <div className="text-sm text-gray-300">Deposit submitted</div>
                <div className="mt-2 text-lg font-semibold">
                  {formattedUsd(pendingDeposit.usdAmount)} →{" "}
                  {pendingDeposit.cryptoAmount} {pendingDeposit.currency}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Status: <span className="text-amber-300">Pending</span>
                </div>
                <div className="mt-3 text-gray-400 text-sm">
                  You account will be credited automatically once the funds
                  arrive.
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setStep(1);
                    setPendingDeposit(null);
                  }}
                >
                  Make another deposit
                </Button>
                <Link href="/transactions">
                  <Button className="ml-auto">View deposit history</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optional deposit history preview */}
      {deposits.length > 0 && (
        <Card className="bg-crypto-blue/80 border border-crypto-blue/20 text-white">
          <CardHeader>
            <CardTitle>Recent deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {deposits.map((d) => (
                <li key={d.id} className="flex justify-between items-center">
                  <div>
                    <div className="text-sm">{d.currency} deposit</div>
                    <div className="text-xs text-gray-400">
                      {new Date(d.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-200">
                    {formattedUsd(d.usdAmount)}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
