"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail } from "@/lib/actions/auth.action";

export default function ResendVerificationForm({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(0);

  // Start countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const resendMutation = useMutation({
    mutationFn: async () => resendVerificationEmail(email),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Verification email sent. Check your inbox.");
        setCooldown(60);
      } else {
        toast.error(res.error || "Failed to resend verification email");
      }
    },
    onError: () => {
      toast.error("Failed to resend verification email");
    },
  });

  const isDisabled = resendMutation.isPending || cooldown > 0;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">Email</label>

      <div className="flex gap-2 items-center">
        <div className="w-full rounded-md bg-muted p-2 text-sm text-gray-200">
          {email}
        </div>

        <Button
          onClick={() => resendMutation.mutate()}
          disabled={isDisabled}
          className="px-4"
        >
          {resendMutation.isPending
            ? "Sending..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Send Verification"}
        </Button>
      </div>
    </div>
  );
}
