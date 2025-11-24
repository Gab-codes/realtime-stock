import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export default function PortfolioSummary({
  totals,
}: {
  totals: { totalInvested: number; active: number; profitEarned: number };
}) {
  const items = [
    { title: "Total Invested", value: totals.totalInvested },
    { title: "Active Investments", value: totals.active },
    { title: "Profit Earned", value: totals.profitEarned },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.title} className="bg-[#071022] border border-white/5">
          <CardHeader>
            <div className="text-sm text-gray-400">{item.title}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {formatPrice(item.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
