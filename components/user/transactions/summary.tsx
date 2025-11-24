import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryProps = {
  format: (amount: number) => string;
  totalDeposits: number;
  totalWithdrawals: number;
  totalReturns: number;
};

const Summary = ({
  format,
  totalDeposits,
  totalWithdrawals,
  totalReturns,
}: SummaryProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-400">
            Total Deposits
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-green-400">
          {format(totalDeposits)}
        </CardContent>
      </Card>

      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-400">
            Total Withdrawals
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-rose-400">
          {format(totalWithdrawals)}
        </CardContent>
      </Card>

      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-400">
            AI Profits Earned
          </CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold text-cyan-400">
          {format(totalReturns)}
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;
