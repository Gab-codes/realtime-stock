"use client";

import {
  ArrowDownToLine,
  CheckCircle,
  XCircle,
  ArrowUpToLine,
  Cpu,
  Clock,
  Sparkle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";

interface Transaction {
  _id: string;
  type: "deposit" | "withdrawal" | "ai-return" | "investment";
  amount: number;
  currency: "USDT" | "BTC";
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Card className="bg-crypto-blue/80 border border-white/10">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableCaption className="text-gray-400">
            {transactions.length === 0 && "No transactions yet."}
          </TableCaption>
          <TableHeader>
            <TableRow className="border-b border-white/5 text-gray-400">
              <TableHead className="w-[140px]">Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t._id} className="space-y-3">
                <TableCell className="capitalize flex items-center gap-2">
                  {t.type === "deposit" && (
                    <ArrowDownToLine size={18} className="text-green-400" />
                  )}
                  {t.type === "withdrawal" && (
                    <ArrowUpToLine size={18} className="text-rose-400" />
                  )}
                  {t.type === "ai-return" && (
                    <Cpu size={18} className="text-cyan-400" />
                  )}
                  {t.type === "investment" && (
                    <Sparkle size={18} className="text-purple-400" />
                  )}
                  {t.type.replace("_", " ")}
                </TableCell>

                <TableCell className="text-gray-200">
                  {formatPrice(t.amount)}
                </TableCell>

                <TableCell>
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
                </TableCell>

                <TableCell className="text-sm text-gray-300">
                  {formatDate(t.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
