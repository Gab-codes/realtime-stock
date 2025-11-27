"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

const doReset = async ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) => {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword, token }),
  });
  return res.json();
};

export default function ClientResetPassword({
  token,
  email,
}: {
  token?: string;
  email?: string;
}) {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<{
    password: string;
    confirm: string;
  }>({
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: (vars: { newPassword: string; token: string }) => doReset(vars),
  });

  const onSubmit = async (data: { password: string; confirm: string }) => {
    if (!token) {
      toast.error("Missing token. Request a new reset link.");
      return;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (data.password !== data.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await mutation.mutateAsync({
        newPassword: data.password,
        token,
      });
      if (result?.success) {
        toast.success("Password reset successful. Please sign in.");
        router.push("/sign-in");
      } else {
        if (result?.error === "token_expired") {
          toast.error("Reset link expired. Request a new reset email.");
        } else if (result?.error === "invalid_token") {
          toast.error("Invalid reset link. Request a new reset email.");
        } else {
          toast.error(result?.error || "Failed to reset password");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="form-title">Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="password"
          label="New Password"
          placeholder="Enter new password"
          register={register}
          type="password"
          error={formState.errors.password}
          validation={{ required: true, minLength: 8 }}
        />

        <InputField
          name="confirm"
          label="Confirm Password"
          placeholder="Confirm new password"
          register={register}
          type="password"
          error={formState.errors.confirm}
          validation={{ required: true, minLength: 8 }}
        />

        <Button
          type="submit"
          className="purple-btn w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
