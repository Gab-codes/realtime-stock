import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

type Step3Props = {
  pendingDeposit: DepositRecord;
  setStep: (step: number) => void;
  setPendingDeposit: (pendingDeposit: DepositRecord | null) => void;
};

const Step3 = ({ pendingDeposit, setStep, setPendingDeposit }: Step3Props) => {
  return (
    <div className="space-y-4">
      <div className="py-4 rounded-md bg-[#071022] border border-white/5">
        <div className="text-sm text-gray-300">Deposit submitted</div>
        <div className="mt-2 text-lg font-semibold">
          {formatPrice(pendingDeposit.usdAmount)} →{" "}
          {pendingDeposit.cryptoAmount} {pendingDeposit.currency}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Status: <span className="text-amber-300">Pending</span>
        </div>
        <div className="mt-3 text-gray-400 text-sm">
          You account will be credited automatically once the funds arrive.
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
  );
};

export default Step3;
