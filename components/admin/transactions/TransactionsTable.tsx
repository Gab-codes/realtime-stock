"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  ArrowUpToLine,
  Sparkle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  getAdminTransactions,
  updateTransactionStatus,
} from "@/lib/actions/adminTransactions.action";

interface Transaction {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  type: "deposit" | "withdrawal" | "investment";
  amount: number;
  currency: "USDT" | "BTC" | "USD";
  status: string;
  date: string;
  description: string;
}

interface TransactionsTableProps {
  preview?: boolean;
}

const TransactionsTable = ({ preview = false }: TransactionsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-transactions", currentPage],
    queryFn: () => getAdminTransactions(currentPage),
    staleTime: 15 * 60 * 1000,
  });

  let transactions: Transaction[] = data?.success ? data.data : [];
  const pagination = data?.success
    ? data.pagination
    : { page: 1, totalPages: 1 };

  if (preview) transactions = transactions.slice(0, 5);

  const handleApprove = async (id: string) => {
    toast.promise(updateTransactionStatus(id, "approve"), {
      loading: "Approving transaction...",
      success: (result) => {
        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["admin-transactions"] });
          return "Transaction approved successfully!";
        } else {
          throw new Error(result.error || "Failed to approve transaction");
        }
      },
      error: (error) => error.message || "Failed to approve transaction",
    });
  };

  const handleReject = async (id: string) => {
    toast.promise(updateTransactionStatus(id, "decline"), {
      loading: "Rejecting transaction...",
      success: (result) => {
        if (result.success) {
          queryClient.invalidateQueries({ queryKey: ["admin-transactions"] });
          return "Transaction rejected successfully!";
        } else {
          throw new Error(result.error || "Failed to reject transaction");
        }
      },
      error: (error) => error.message || "Failed to reject transaction",
    });
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownToLine size={18} className="text-green-400" />;
      case "withdrawal":
        return <ArrowUpToLine size={18} className="text-rose-400" />;
      case "investment":
        return <Sparkle size={18} className="text-purple-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-gray-600 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-1">
          {preview ? "Recent Transactions" : "All Transactions"}
        </h2>
        <p className="text-sm text-gray-400">
          {preview
            ? "Showing latest transactions"
            : "Manage and review all transactions across users"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600 hover:bg-transparent">
              <TableHead className="text-gray-300">Full Name</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Type</TableHead>
              <TableHead className="text-gray-300">Amount</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              {!preview && (
                <TableHead className="text-right text-gray-300">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-8"
                >
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-red-400 py-8"
                >
                  Error loading transactions
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-8"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => (
                <TableRow
                  key={txn.id}
                  className="border-gray-600 hover:bg-gray-700/50 transition"
                >
                  <TableCell className="text-gray-300">
                    {txn.fullName}
                  </TableCell>
                  <TableCell className="text-gray-300">{txn.email}</TableCell>
                  <TableCell className="capitalize flex items-center gap-2">
                    {getTypeIcon(txn.type)}
                    {txn.type}
                  </TableCell>
                  <TableCell className="font-semibold text-white">
                    ${txn.amount.toLocaleString()}
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
                  {!preview && (
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
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination for full page only */}
      {!preview && pagination?.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <div className="flex items-center space-x-2">
            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={pagination.page === 1}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Next */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={pagination.page === pagination.totalPages}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
