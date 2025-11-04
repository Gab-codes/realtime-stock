"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet } from "lucide-react";

const DepositWithdrawActions = () => {
  return (
    <div className="flex justify-center items-center gap-3 mt-4">
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
    </div>
  );
};

export default DepositWithdrawActions;
