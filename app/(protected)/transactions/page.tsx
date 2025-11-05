"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  CheckCircle,
  XCircle,
  ArrowUpToLine,
  Cpu,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "ai_return";
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}

const format = (amount: number) => `$${amount.toLocaleString()}`;

const TransactionHistory = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "deposit",
      amount: 1000,
      date: "2025-10-01",
      status: "completed",
    },
    {
      id: "2",
      type: "ai_return",
      amount: 30,
      date: "2025-10-02",
      status: "completed",
    },
    {
      id: "3",
      type: "ai_return",
      amount: 35,
      date: "2025-10-03",
      status: "completed",
    },
    {
      id: "4",
      type: "withdrawal",
      amount: 200,
      date: "2025-10-05",
      status: "pending",
    },
  ]);

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit")
    .reduce((a, b) => a + b.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((a, b) => a + b.amount, 0);

  const totalReturns = transactions
    .filter((t) => t.type === "ai_return")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-4 md:p-8 space-y-6 text-white">
      {/* Summary header */}
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

      {/* Transactions table */}
      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Desktop Table */}
          <div className="overflow-x-auto hidden sm:block">
            <table className="w-full text-left">
              <thead className="text-sm text-gray-400 border-b border-white/5">
                <tr>
                  <th className="py-3">Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-white/5">
                    <td className="py-3 capitalize flex items-center gap-2">
                      {t.type === "deposit" && (
                        <ArrowDownToLine size={18} className="text-green-400" />
                      )}
                      {t.type === "withdrawal" && (
                        <ArrowUpToLine size={18} className="text-rose-400" />
                      )}
                      {t.type === "ai_return" && (
                        <Cpu size={18} className="text-cyan-400" />
                      )}
                      {t.type.replace("_", " ")}
                    </td>
                    <td>{format(t.amount)}</td>
                    <td>
                      {t.status === "completed" && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-green-400 border-green-400/30 bg-green-400/10"
                        >
                          <CheckCircle size={14} />
                          Completed
                        </Badge>
                      )}

                      {t.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-amber-300 border-amber-300/30 bg-amber-300/10"
                        >
                          <Clock size={14} />
                          Pending
                        </Badge>
                      )}

                      {t.status === "failed" && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-rose-400 border-rose-400/30 bg-rose-400/10"
                        >
                          <XCircle size={14} />
                          Failed
                        </Badge>
                      )}
                    </td>
                    <td className="text-sm text-gray-300">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="p-4 border border-white/10 rounded-lg bg-[#0a0a0a]/60"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold capitalize flex items-center gap-2">
                    {t.type === "deposit" && (
                      <ArrowDownToLine size={15} className="text-green-400" />
                    )}
                    {t.type === "withdrawal" && (
                      <ArrowUpToLine size={15} className="text-rose-400" />
                    )}
                    {t.type === "ai_return" && (
                      <Cpu size={15} className="text-cyan-400" />
                    )}
                    {t.type.replace("_", " ")}
                  </h3>

                  {t.status === "completed" && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-green-400 border-green-400/30 bg-green-400/10"
                    >
                      <CheckCircle size={14} />
                      Completed
                    </Badge>
                  )}

                  {t.status === "pending" && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-amber-300 border-amber-300/30 bg-amber-300/10"
                    >
                      <Clock size={14} />
                      Pending
                    </Badge>
                  )}

                  {t.status === "failed" && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-rose-400 border-rose-400/30 bg-rose-400/10"
                    >
                      <XCircle size={14} />
                      Failed
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>
                    <span className="text-gray-400">Amount:</span>{" "}
                    {format(t.amount)}
                  </p>
                  <p>
                    <span className="text-gray-400">Date:</span> {t.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
