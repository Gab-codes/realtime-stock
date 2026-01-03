import { formatDate, formatPrice } from "@/lib/utils";
import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function InvestmentMobileList({
  investments,
}: {
  investments: Investment[];
}) {
  return (
    <div className="sm:hidden space-y-4">
      {investments.map((inv) => (
        <div
          key={inv.id}
          className="p-4 border border-white/10 rounded-lg bg-[#0a0a0a]/60"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-white">
              {inv.planLabel}
            </h3>
            {inv.status === "active" && (
              <span className="flex items-center gap-1 text-xs text-amber-300">
                <Clock size={13} /> Active
              </span>
            )}
            {inv.status === "completed" && (
              <span className="flex items-center gap-1 text-xs text-green-300">
                <CheckCircle size={13} /> Done
              </span>
            )}
            {inv.status === "cancelled" && (
              <span className="flex items-center gap-1 text-xs text-rose-300">
                <XCircle size={13} /> Cancelled
              </span>
            )}
          </div>

          <div className="text-sm text-gray-300 space-y-1">
            <p>
              <span className="text-gray-400">Principal:</span>{" "}
              {formatPrice(inv.principal)}
            </p>
            <p>
              <span className="text-gray-400">Profit:</span>{" "}
              <span className="text-green-300">{formatPrice(inv.profit)}</span>
            </p>
            <p>
              <span className="text-gray-400">Started:</span>{" "}
              {formatDate(inv.startedAt)}
            </p>
            <p>
              <span className="text-gray-400">End Date:</span>{" "}
              {formatDate(inv.maturityDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
