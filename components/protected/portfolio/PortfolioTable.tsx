"use client";

import { formatDate, formatPrice } from "@/lib/utils";
import { Clock, CheckCircle, XCircle, Trash } from "lucide-react";

export default function PortfolioTable({
  investments,
}: {
  investments: Investment[];
}) {
  return (
    <div className="overflow-x-auto hidden sm:table w-full text-left">
      <table className="w-full text-left">
        <thead className="text-sm text-gray-400 border-b border-white/5">
          <tr>
            <th className="py-3">Plan</th>
            <th>Principal</th>
            <th>Profit Made</th>
            <th>End Date</th>
            <th>Started</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id} className="border-b border-white/5">
              <td className="py-3">{inv.planLabel}</td>
              <td>{formatPrice(inv.principal)}</td>
              <td className="text-green-300">
                {formatPrice(inv.profitAccrued)}
              </td>
              <td className="text-sm text-gray-300">
                {formatDate(inv.startedAt)}
              </td>
              <td className="text-sm text-gray-300">
                {formatDate(inv.maturityDate)}
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
