"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const sendRequest = async (email: string) => {
  const res = await fetch("/api/auth/request-password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, callbackURL: "/reset-password" }),
  });
  return res.json();
};

export default function ResendResetEmail({
  initialEmail = "",
}: {
  initialEmail?: string;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    let timer: any;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const mutation = useMutation({
    mutationFn: (email: string) => sendRequest(email),
  });

  const handleResend = async () => {
    if (!email) return toast.error("Enter your email");
    try {
      const res = await mutation.mutateAsync(email);
      if (res?.success) {
        toast.success("Reset email sent. Check inbox.");
        setCooldown(60);
      } else {
        toast.error(res?.error || "Failed to send reset email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full"
          placeholder="you@example.com"
        />
        <Button
          onClick={handleResend}
          disabled={cooldown > 0 || mutation.isPending}
        >
          {cooldown > 0
            ? `Wait ${cooldown}s`
            : mutation.isPending
            ? "Sending..."
            : "Resend"}
        </Button>
      </div>
    </div>
  );
}
