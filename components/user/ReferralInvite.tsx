"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

type Referred = {
  id: string;
  email?: string;
  fullName?: string;
};

type ReferralRecord = {
  _id: string;
  amount: number;
  status: "pending" | "awarded" | "revoked";
  awardedAt?: string;
  createdAt?: string;
  referred?: Referred | null;
};

type Props = {
  referralCode?: string | null;
  referrals: ReferralRecord[];
  baseUrl?: string;
};

export default function ReferralInvite({
  referralCode,
  referrals,
  baseUrl,
}: Props) {
  const [copied, setCopied] = useState(false);

  const referralLink = `${baseUrl || ""}/sign-up?ref=${referralCode}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="bg-crypto-blue/40 border border-crypto-blue rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">
            Invite friends & earn $100
          </h3>
          <p className="text-sm text-gray-300">
            Share your referral link. You get $100 when they deposit and make
            their first investment.
          </p>
        </div>
        <div>
          <Button onClick={onCopy} className="purple-btn">
            {copied ? "Copied" : "Copy Link"}
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 p-3 rounded">
        <div className="text-xs text-gray-400">Your referral code</div>
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm text-white truncate">
            {referralCode || "-"}
          </div>
          <div className="text-xs text-gray-400">{referralLink}</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-white">Your referrals</h4>
        {referrals && referrals.length ? (
          <ul className="mt-2 space-y-2">
            {referrals.map((r) => (
              <li
                key={r._id}
                className="flex items-center justify-between bg-gray-900 p-3 rounded"
              >
                <div>
                  <div className="text-sm text-white">
                    {r.referred?.email ?? r.referred?.fullName ?? "Unknown"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(r.createdAt || "")}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm ${
                      r.status === "awarded"
                        ? "text-green-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {r.status.toUpperCase()}
                  </div>
                  {r.status === "awarded" && r.awardedAt ? (
                    <div className="text-xs text-gray-400">
                      Paid {formatDate(r.awardedAt)}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            No referrals yet. Share your link to get started.
          </p>
        )}
      </div>
    </div>
  );
}
