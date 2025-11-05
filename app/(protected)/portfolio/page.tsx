"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils"; // optional helper; fallback used below if not present

type Investment = {
  id: string;
  planLabel: string; // "30 Days (30%)"
  principal: number;
  days: number;
  dailyRate: number; // e.g. 0.30 means 30% per day (per your earlier model)
  startedAt: string; // ISO
  status: "active" | "completed" | "cancelled";
  profitAccrued: number; // current accrued profit
  maturityDate?: string; // optional
};

const MOCK_INVESTMENTS: Investment[] = [
  {
    id: "inv_01",
    planLabel: "30 Days (30%)",
    principal: 500,
    days: 30,
    dailyRate: 0.3,
    startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    profitAccrued: 250, // example
    maturityDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv_02",
    planLabel: "60 Days (35%)",
    principal: 1200,
    days: 60,
    dailyRate: 0.35,
    startedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    profitAccrued: 1400,
    maturityDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "inv_03",
    planLabel: "90 Days (40%)",
    principal: 700,
    days: 90,
    dailyRate: 0.4,
    startedAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed",
    profitAccrued: 2800,
    maturityDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// fallback formatter if you don't have a helper
const defaultFormatCurrency = (v: number) =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

export default function PortfolioPage() {
  // investments state — editable locally for demo
  const [investments, setInvestments] =
    useState<Investment[]>(MOCK_INVESTMENTS);

  // dialog state for cancel confirm
  const [cancelTarget, setCancelTarget] = useState<Investment | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

  // Balances computed from investments
  const totals = useMemo(() => {
    const totalInvested = investments.reduce((s, i) => s + i.principal, 0);
    const profitEarned = investments.reduce(
      (s, i) => s + (i.status === "cancelled" ? 0 : i.profitAccrued),
      0
    );
    const active = investments
      .filter((i) => i.status === "active")
      .reduce((s, i) => s + i.principal, 0);
    return { totalInvested, profitEarned, active };
  }, [investments]);

  const format = (v: number) => {
    try {
      // try optional helper first if present in your utils
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const maybeFormat = formatPrice as unknown as (n: number) => string;
      if (typeof maybeFormat === "function") return maybeFormat(v);
    } catch {
      /* ignore */
    }
    return defaultFormatCurrency(v);
  };

  // handler to request cancel -> open dialog
  function requestCancel(inv: Investment) {
    setCancelTarget(inv);
  }

  // perform cancel: forfeits profitAccrued, returns principal (we simulate by setting status & profit)
  async function confirmCancel() {
    if (!cancelTarget) return;
    setIsCanceling(true);

    // simulate server call delay
    await new Promise((r) => setTimeout(r, 700));

    setInvestments((prev) =>
      prev.map((inv) =>
        inv.id === cancelTarget.id
          ? {
              ...inv,
              status: "cancelled",
              profitAccrued: 0,
              // maturityDate stays as is for audit
            }
          : inv
      )
    );

    setIsCanceling(false);
    setCancelTarget(null);
  }

  // small sparkline data (derived from investments growth — for demo we build a mock history)
  const mockHistory = useMemo(() => {
    // create 20 points representing portfolio growth
    const base = 2000;
    return Array.from({ length: 20 }).map((_, i) => {
      const noise = Math.sin(i / 3) * 60;
      const invested = totals.totalInvested;
      const profit = totals.profitEarned;
      return Math.max(
        0,
        Math.round(base + invested * 0.2 + profit * 0.5 + noise)
      );
    });
  }, [totals.totalInvested, totals.profitEarned]);

  return (
    <div className="px-3 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Portfolio</h1>

      {/* Top summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-[#071022] border border-white/5">
          <CardHeaderSimple title="Total Invested" />
          <CardContentSimple>{format(totals.totalInvested)}</CardContentSimple>
        </Card>

        <Card className="bg-[#071022] border border-white/5">
          <CardHeaderSimple title="Active Investments" />
          <CardContentSimple>{format(totals.active)}</CardContentSimple>
        </Card>

        <Card className="bg-[#071022] border border-white/5">
          <CardHeaderSimple title="Profit Earned" />
          <CardContentSimple>{format(totals.profitEarned)}</CardContentSimple>
        </Card>
      </div>

      {/* Active Investments table */}
      <Card className="bg-[#071022] border border-white/5">
        <CardHeader>
          <CardTitle className="text-lg">Active Investments</CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Manage your AI-managed investments. Cancelling returns your
            principal but forfeits profit.
          </p>
        </CardHeader>
        <CardContent className="px-2 ">
          <div className="overflow-x-auto">
            {/* Desktop table */}
            <table className="hidden sm:table w-full text-left">
              <thead className="text-sm text-gray-400 border-b border-white/5">
                <tr>
                  <th className="py-3">Plan</th>
                  <th>Principal</th>
                  <th>Profit Accrued</th>
                  <th>Duration</th>
                  <th>Started</th>
                  <th>Status</th>
                  <th className="text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/5">
                    <td className="py-3">{inv.planLabel}</td>
                    <td>{format(inv.principal)}</td>
                    <td className="text-green-300">
                      {format(inv.profitAccrued)}
                    </td>
                    <td>{inv.days}d</td>
                    <td className="text-sm text-gray-300">
                      {new Date(inv.startedAt).toLocaleDateString()}
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
                    <td className="text-right pr-4">
                      {inv.status === "active" ? (
                        <Button
                          variant="outline"
                          className="text-rose-300 border-rose-300"
                          onClick={() => requestCancel(inv)}
                        >
                          <Trash size={14} />
                          <span className="ml-2">Cancel</span>
                        </Button>
                      ) : (
                        <div className="text-sm text-gray-400">—</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile-friendly stacked view */}
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
                      {format(inv.principal)}
                    </p>
                    <p>
                      <span className="text-gray-400">Profit:</span>{" "}
                      <span className="text-green-300">
                        {format(inv.profitAccrued)}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-400">Duration:</span>{" "}
                      {inv.days} days
                    </p>
                    <p>
                      <span className="text-gray-400">Started:</span>{" "}
                      {new Date(inv.startedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mt-3 text-right">
                    {inv.status === "active" ? (
                      <Button
                        variant="outline"
                        className="text-rose-300 border-rose-300 text-xs px-3 py-1"
                        onClick={() => requestCancel(inv)}
                      >
                        <Trash size={12} className="mr-1" /> Cancel
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancel confirmation dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={() => setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Investment</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <p className="text-sm text-gray-300">
              Cancelling this investment will{" "}
              <strong>forfeit all accrued profit</strong> and return your
              original principal. This action cannot be undone.
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-sm">
                <strong>Plan:</strong> {cancelTarget?.planLabel}
              </p>
              <p className="text-sm">
                <strong>Principal:</strong>{" "}
                {cancelTarget ? format(cancelTarget.principal) : "—"}
              </p>
              <p className="text-sm">
                <strong>Profit forfeited:</strong>{" "}
                {cancelTarget ? format(cancelTarget.profitAccrued) : "—"}
              </p>
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCancelTarget(null)}>
              Close
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white"
              onClick={confirmCancel}
              disabled={isCanceling}
            >
              {isCanceling ? "Cancelling..." : "Confirm Cancel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- Small helper components ---------- */

function CardHeaderSimple({ title }: { title: string }) {
  return (
    <div className="px-4 border-b border-white/5">
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}

function CardContentSimple({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4">
      <div className="text-2xl font-semibold">{children}</div>
    </div>
  );
}
