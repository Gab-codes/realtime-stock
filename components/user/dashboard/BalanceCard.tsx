"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { formatPrice } from "@/lib/utils";
import { CircleQuestionMarkIcon } from "lucide-react";

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
      <CardHeader className="flex items-center gap-2">
        <CardTitle className="text-gray-300 text-sm">{title}</CardTitle>

        <Popover>
          <PopoverTrigger className="cursor-pointer" asChild>
            <CircleQuestionMarkIcon className="size-4 text-crypto-light-purple" />
          </PopoverTrigger>

          <PopoverContent className="w-full bg-accent border-crypto-light-purple/50">
            {subtitle && <p className="text-xs">{subtitle}</p>}
          </PopoverContent>
        </Popover>
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
