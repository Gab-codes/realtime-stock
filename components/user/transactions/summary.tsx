import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

type SummaryProps = {
  totalDeposits: number;
  totalWithdrawals: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
};

const Summary = ({
  totalDeposits,
  totalWithdrawals,
  pendingDeposits,
  pendingWithdrawals,
}: SummaryProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {/* Deposits Card */}
      <Card className="bg-crypto-blue/80 border border-white/10 rounded-lg shadow-sm hover:border-white/20 transition-colors">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm text-gray-300 tracking-wide">
            Total Deposits
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-3xl font-bold text-green-400">
            {formatPrice(totalDeposits)}
          </p>
        </CardContent>

        <CardFooter className="text-xs text-gray-400 pt-1">
          Pending Deposit:
          <span className="ml-1 text-gray-300">
            {formatPrice(pendingDeposits)}
          </span>
        </CardFooter>
      </Card>

      {/* Withdrawals Card */}
      <Card className="bg-crypto-blue/80 border border-white/10 rounded-lg shadow-sm hover:border-white/20 transition-colors">
        <CardHeader className="pb-1">
          <CardTitle className="text-sm text-gray-300 tracking-wide">
            Total Withdrawals
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-3xl font-bold text-rose-400">
            {formatPrice(totalWithdrawals)}
          </p>
        </CardContent>

        <CardFooter className="text-xs text-gray-400 pt-1">
          Pending Withdrawal:
          <span className="ml-1 text-gray-300">
            {formatPrice(pendingWithdrawals)}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Summary;
