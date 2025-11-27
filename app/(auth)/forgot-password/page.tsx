"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const requestReset = async (email: string) => {
  const res = await fetch("/api/auth/request-password-reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, callbackURL: "/reset-password" }),
  });
  return res.json();
};

const ForgotPassword = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<{ email: string }>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) => requestReset(email),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const result = await mutation.mutateAsync({ email: data.email });
      if (result?.success) {
        toast.success("Password reset email sent. Check your inbox.");
        router.push("/sign-in");
      } else {
        toast.error(result?.error || "Failed to send reset email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="form-title">Forgot Password</h1>
      <p className="text-sm text-gray-400 mb-4">
        Enter your email and we'll send a reset link.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          label="Email"
          placeholder="you@example.com"
          register={register}
          type="email"
          validation={{ required: "Email is required" }}
          error={formState.errors.email}
        />

        <Button
          type="submit"
          className="purple-btn w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Send reset link"}
        </Button>

        <FooterLink
          text="Remembered your password?"
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
