"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

type BalanceCardProps = {
  title: string;
  amount: number;
  subtitle?: string;
  activeInvestmentPrincipals?: number;
};

const BalanceCard = ({
  title,
  amount,
  subtitle,
  activeInvestmentPrincipals,
}: BalanceCardProps) => {
  return (
    <Card className="bg-crypto-blue/60 border border-crypto-blue/20 text-white">
      <CardHeader>
        <CardTitle className="text-gray-300 text-sm">{title}</CardTitle>
        {subtitle && <p className="text-xs text-gray-400">({subtitle})</p>}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{`${formatPrice(amount)}`}</p>
      </CardContent>
      <CardFooter className="text-xs text-gray-400">
        {activeInvestmentPrincipals !== undefined &&
          activeInvestmentPrincipals > 0 && (
            <p>
              Active Investment: {""}
              <span className="text-amber-400">
                {formatPrice(activeInvestmentPrincipals)}
              </span>
            </p>
          )}
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
