"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  description: string;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "txn1",
    type: "deposit",
    amount: 5000,
    currency: "USD",
    status: "approved",
    date: "2025-11-10",
    description: "Bank transfer",
  },
  {
    id: "txn2",
    type: "deposit",
    amount: 2500,
    currency: "USD",
    status: "pending",
    date: "2025-11-09",
    description: "Credit card",
  },
  {
    id: "txn3",
    type: "withdrawal",
    amount: 1000,
    currency: "USD",
    status: "pending",
    date: "2025-11-08",
    description: "Bank transfer",
  },
  {
    id: "txn4",
    type: "deposit",
    amount: 8000,
    currency: "USD",
    status: "approved",
    date: "2025-11-05",
    description: "Wire transfer",
  },
  {
    id: "txn5",
    type: "withdrawal",
    amount: 2000,
    currency: "USD",
    status: "approved",
    date: "2025-11-03",
    description: "Bank transfer",
  },
];

interface TransactionsTableProps {
  userId: string;
}

const TransactionsTable = ({ userId }: TransactionsTableProps) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const handleApprove = (id: string) => {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id ? { ...txn, status: "approved" as const } : txn
      )
    );
    console.log("Transaction approved:", id);
  };

  const handleReject = (id: string) => {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id ? { ...txn, status: "rejected" as const } : txn
      )
    );
    console.log("Transaction rejected:", id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "pending":
      default:
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "deposit" ? "text-green-400" : "text-red-400";
  };

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">
          Transaction History
        </h2>
        <p className="text-sm text-gray-400">
          Manage and review all user transactions
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Amount</TableHead>
              <TableHead className="text-gray-300">Description</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-right text-gray-300">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((txn) => (
              <TableRow
                key={txn.id}
                className="border-gray-600 hover:bg-gray-700/50 transition"
              >
                <TableCell>
                  <span className={`font-medium ${getTypeColor(txn.type)}`}>
                    {txn.type === "deposit" ? "+" : "-"} {txn.type}
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-white">
                  ${txn.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-400">
                  {txn.description}
                </TableCell>
                <TableCell className="text-gray-400">
                  {formatDate(txn.date)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`border ${getStatusColor(txn.status)}`}
                  >
                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {txn.status === "pending" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-600"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-700 border-gray-600"
                      >
                        <DropdownMenuItem
                          onClick={() => handleApprove(txn.id)}
                          className="text-green-400 cursor-pointer hover:bg-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleReject(txn.id)}
                          className="text-red-400 cursor-pointer hover:bg-gray-600"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <span className="text-gray-500 text-sm">—</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
