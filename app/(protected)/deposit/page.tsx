"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Step1 from "@/components/protected/deposit/step1";
import Step2 from "@/components/protected/deposit/step2";
import Step3 from "@/components/protected/deposit/step3";
import { formatPrice } from "@/lib/utils";

// Merchant deposit addresses (replace with your real addresses)
const MERCHANT_ADDRESSES = {
  BTC: "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH",
  USDT: "TXYZ...EXAMPLE_TRON_USDT_ADDRESS_OR_ERC20",
} as const;

export type Currency = keyof typeof MERCHANT_ADDRESSES;

// Deposit record shape (client-side demo)

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
            <Step1
              {...{
                currency,
                setCurrency,
                usdAmount,
                setUsdAmount,
                loadingPrices,
                prices,
                errorPrices,
                goToPayment,
              }}
            />
          )}

          {step === 2 && (
            <Step2
              {...{
                currency,
                cryptoAmount,
                addressFor,
                confirmPaid,
                setStep,
                isCreating,
              }}
            />
          )}

          {step === 3 && pendingDeposit && (
            <Step3
              {...{
                pendingDeposit,
                setStep,
                setPendingDeposit,
              }}
            />
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
                    {formatPrice(d.usdAmount)}
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
