"use client";

import { formatDate, formatPrice } from "@/lib/utils";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function PortfolioTable({
  investments,
}: {
  investments: Investment[];
}) {
  return (
    <div className="hidden sm:block overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow className="text-sm text-gray-400 border-b border-white/5">
            <TableHead className="py-3">Plan</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Profit Made</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {investments.map((inv) => (
            <TableRow key={inv.id} className="border-b border-white/5">
              <TableCell className="py-3">{inv.planLabel}</TableCell>
              <TableCell>{formatPrice(inv.principal)}</TableCell>
              <TableCell className="text-green-300">
                {formatPrice(inv.profitAccrued)}
              </TableCell>
              <TableCell className="text-sm text-gray-300">
                {formatDate(inv.maturityDate)}
              </TableCell>
              <TableCell className="text-sm text-gray-300">
                {formatDate(inv.startedAt)}
              </TableCell>
              <TableCell>
                {inv.status === "active" && (
                  <span className="inline-flex items-center gap-2 text-xs text-amber-300">
                    <Clock size={14} /> Active
                  </span>
                )}
                {inv.status === "completed" && (
                  <span className="inline-flex items-center gap-2 text-xs text-green-300">
                    <CheckCircle size={14} /> Completed
                  </span>
                )}
                {inv.status === "cancelled" && (
                  <span className="inline-flex items-center gap-2 text-xs text-rose-300">
                    <XCircle size={14} /> Cancelled
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
