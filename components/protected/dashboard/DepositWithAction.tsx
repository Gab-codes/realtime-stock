"use client";

import { Button } from "@/components/ui/button";
import { HandCoins, PlusCircle, Wallet } from "lucide-react";
import Link from "next/link";

const DepositWithdrawActions = () => {
  return (
    <div className="flex justify-center items-center gap-1.5 mt-4">
      <Button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white flex items-center gap-2">
        <PlusCircle size={18} />
        Deposit
      </Button>
      <Button
        variant="outline"
        className="text-gray-300 hover:text-white border-gray-600"
      >
        <Wallet size={18} />
        Withdraw
      </Button>
      <Link href="#invest">
        <Button className="bg-green-500 text-white hover:text-white border-gray-600">
          <HandCoins size={18} />
          Invest
        </Button>
      </Link>
    </div>
  );
};

export default DepositWithdrawActions;
