import { Currency } from "@/app/(protected)/deposit/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type Step1Props = {
  currency: Currency;
  setCurrency: Dispatch<SetStateAction<Currency>>;
  usdAmount: number | "";
  setUsdAmount: (usdAmount: number | "") => void;
  loadingPrices: boolean;
  prices: { BTC: number; USDT: number } | null;
  errorPrices: string | null;
  goToPayment: () => Promise<void>;
};

const Step1 = ({
  currency,
  setCurrency,
  usdAmount,
  setUsdAmount,
  loadingPrices,
  prices,
  errorPrices,
  goToPayment,
}: Step1Props) => {
  return (
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
              setUsdAmount(e.target.value ? parseFloat(e.target.value) : "")
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
              BTC {prices.BTC ? `$${prices.BTC.toLocaleString()}` : "—"} · USDT{" "}
              {prices.USDT ? `$${prices.USDT.toFixed(2)}` : "—"}
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
          className="bg-crypto-purple hover:bg-crypto-dark-purple text-white ml-auto"
          onClick={goToPayment}
        >
          Next: Payment details
        </Button>
      </div>
    </div>
  );
};

export default Step1;
