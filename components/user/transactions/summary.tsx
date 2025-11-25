import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

type SummaryProps = {
  totalDeposits: number;
  totalWithdrawals: number;
};

const Summary = ({ totalDeposits, totalWithdrawals }: SummaryProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-400">
            Total Deposits
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-green-400">
          {formatPrice(totalDeposits)}
        </CardContent>
      </Card>

      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-400">
            Total Withdrawals
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-rose-400">
          {formatPrice(totalWithdrawals)}
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
