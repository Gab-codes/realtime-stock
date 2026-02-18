"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  CheckCircle,
  XCircle,
  ArrowUpToLine,
  Cpu,
  Clock,
  Sparkle,
  ChevronLeft,
  ChevronRight,
  Handshake,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatDate, formatPrice, cn } from "@/lib/utils";

interface Transaction {
  _id: string;
  type:
    | "deposit"
    | "withdrawal"
    | "ai-return"
    | "investment"
    | "referral-bonus";
  amount: number;
  currency: "USDT" | "BTC" | "USD";
  status: "pending" | "completed" | "failed";
  createdAt: string;
  txHash?: string;
  network?: string;
  description?: string;
  investmentId?: string;
  cryptoAmount?: number;
}

const TransactionHistory = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.getValue("type") as string;
          return (
            <div className="capitalize flex items-center gap-2">
              {type === "deposit" && (
                <ArrowDownToLine size={18} className="text-green-400" />
              )}
              {type === "withdrawal" && (
                <ArrowUpToLine size={18} className="text-rose-400" />
              )}
              {type === "ai-return" && (
                <Cpu size={18} className="text-cyan-400" />
              )}
              {type === "investment" && (
                <Sparkle size={18} className="text-purple-400" />
              )}
              {type === "referral-bonus" && (
                <Handshake size={18} className="text-blue-400" />
              )}
              {type.replace("-", " ")}
            </div>
          );
        },
        filterFn: "equalsString",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number;
          return <div className="text-gray-200">{formatPrice(amount)}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <div>
              {status === "completed" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-green-400 border-green-400/30 bg-green-400/10"
                >
                  <CheckCircle size={14} />
                  Completed
                </Badge>
              )}
              {status === "pending" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-amber-300 border-amber-300/30 bg-amber-300/10"
                >
                  <Clock size={14} />
                  Pending
                </Badge>
              )}
              {status === "failed" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-rose-400 border-rose-400/30 bg-rose-400/10"
                >
                  <XCircle size={14} />
                  Failed
                </Badge>
              )}
            </div>
          );
        },
        filterFn: "equalsString",
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => (
          <div className="text-sm text-gray-300">
            {formatDate(row.getValue("createdAt"))}
          </div>
        ),
      },
      {
        id: "chevron",
        cell: () => (
          <div className="flex justify-end pr-2 md:hidden">
            <ChevronRightIcon size={18} className="text-gray-500" />
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="bg-crypto-blue/80 border border-white/10">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex max-sm:justify-between gap-4 mb-4">
            <Select
              value={
                (table.getColumn("type")?.getFilterValue() as string) ?? ""
              }
              onValueChange={(value) =>
                table
                  .getColumn("type")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="ai-return">AI Return</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={
                (table.getColumn("status")?.getFilterValue() as string) ?? ""
              }
              onValueChange={(value) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-white/5 text-gray-400 hover:bg-transparent"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(header.id === "chevron" && "md:hidden")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.id === "chevron" && "md:hidden",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-400"
                  >
                    No transactions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm flex items-center gap-2 md:gap-3 text-gray-400">
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="max-sm:hidden">
                Showing{" "}
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{" "}
                to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}{" "}
                of {table.getFilteredRowModel().rows.length} entries
              </span>
              <span className="sm:hidden text-xs">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
            </div>
            <div className="flex items-center space-x-3 md:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="size-5 md:size-4" />
                <span className="max-md:hidden">Previous</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="max-md:hidden">Next</span>
                <ChevronRight className="size-5 md:size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#0a0a14] border-white/40 text-white data-[state=open]:!zoom-in-0 data-[state=open]:duration-600 data-[state=closed]:!zoom-out-0 data-[state=closed]:duration-300 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Transaction Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete overview of your transaction.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm bg-white/5 p-5 rounded-lg border border-white/10">
                <span className="text-gray-400">Type</span>
                <span className="font-medium text-right capitalize">
                  {selectedTransaction.type.replace("-", " ")}
                </span>

                <span className="text-gray-400">Status</span>
                <div className="flex justify-end">
                  {selectedTransaction.status === "completed" && (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                      Completed
                    </Badge>
                  )}
                  {selectedTransaction.status === "pending" && (
                    <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20">
                      Pending
                    </Badge>
                  )}
                  {selectedTransaction.status === "failed" && (
                    <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20">
                      Failed
                    </Badge>
                  )}
                </div>

                <span className="text-gray-400">Amount (USD)</span>
                <span className="font-bold text-right text-lg">
                  {formatPrice(selectedTransaction.amount)}
                </span>

                {selectedTransaction.cryptoAmount && (
                  <>
                    <span className="text-gray-400">Crypto Amount</span>
                    <span className="font-medium text-right text-green-400">
                      {selectedTransaction.cryptoAmount}{" "}
                      {selectedTransaction.currency}
                    </span>
                  </>
                )}

                <span className="text-gray-400">Currency</span>
                <span className="font-medium text-right">
                  {selectedTransaction.currency}
                </span>

                <span className="text-gray-400">Date</span>
                <span className="font-medium text-right">
                  {formatDate(selectedTransaction.createdAt)}
                </span>

                {selectedTransaction.network && (
                  <>
                    <span className="text-gray-400">Network</span>
                    <span className="font-medium text-right">
                      {selectedTransaction.network}
                    </span>
                  </>
                )}

                {selectedTransaction.txHash && (
                  <div className="col-span-2 space-y-2 mt-2 pt-4 border-t border-white/10">
                    <span className="text-gray-400 block">
                      {selectedTransaction.type === "withdrawal" ||
                      selectedTransaction.type === "deposit"
                        ? "Wallet Address"
                        : "Transaction Hash"}
                    </span>
                    <span className="font-mono text-xs break-all bg-white/30 p-3 rounded block opacity-90 border border-white/5">
                      {selectedTransaction.txHash}
                    </span>
                  </div>
                )}

                {selectedTransaction.description && (
                  <div className="col-span-2 space-y-2 mt-2 pt-4 border-t border-white/10">
                    <span className="text-gray-400 block">Description</span>
                    <span className="text-sm opacity-90 leading-relaxed italic">
                      "{selectedTransaction.description}"
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              className="w-full bg-crypto-purple hover:bg-crypto-dark-purple"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionHistory;
