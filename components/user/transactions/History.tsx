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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatPrice } from "@/lib/utils";

interface Transaction {
  _id: string;
  type:
    | "deposit"
    | "withdrawal"
    | "ai-return"
    | "investment"
    | "referral-bonus";
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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
              {type.replace("_", " ")}
            </div>
          );
        },
        filterFn: "equalsString",
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div className="text-gray-200">
            {formatPrice(row.getValue("amount"))}
          </div>
        ),
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
    ],
    []
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

  return (
    <Card className="bg-crypto-blue/80 border border-white/10">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Filters and Search */}

        <div className="flex max-sm:justify-between gap-4 mb-4">
          <Select
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
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

        {/* Table */}
        <Table>
          <TableCaption className="text-gray-400">
            {transactions.length === 0 && "No transactions yet."}
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-white/5 text-gray-400"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="w-[140px]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="space-y-3">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm flex items-center gap-2 md:gap-3 text-gray-400">
            {/* Page Size Selector */}
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
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
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
  );
};

export default TransactionHistory;
