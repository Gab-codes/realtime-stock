import { Currency } from "@/app/(protected)/deposit/page";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

type Step2Props = {
  currency: Currency;
  cryptoAmount: number;
  addressFor: (currency: Currency) => string;
  confirmPaid: () => void;
  setStep: (step: number) => void;
  isCreating: boolean;
};

const Step2 = ({
  currency,
  cryptoAmount,
  addressFor,
  confirmPaid,
  setStep,
  isCreating,
}: Step2Props) => {
  const [copied, setCopied] = useState(false);

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(addressFor(currency));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-400">Send to wallet</label>
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
                    <span className="text-xs text-green-300">Copied</span>
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
                Note: sending a different coin or network may result in loss of
                funds.
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
  );
};

export default Step2;
