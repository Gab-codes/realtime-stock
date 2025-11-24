"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  subtitle?: string;
}

const BalanceCard = ({ title, amount, subtitle }: BalanceCardProps) => {
  return (
    <Card className="bg-crypto-blue/60 border border-crypto-blue/20 text-white">
      <CardHeader>
        <CardTitle className="text-gray-300 text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{`${formatPrice(amount)}`}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
