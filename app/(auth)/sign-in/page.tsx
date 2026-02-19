"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);

      if (result.success) {
        const res = await fetch("/api/me");
        const user = await res.json();

        startTransition(() => {
          if (user.role === "admin") router.push("/admin/dashboard");
          else router.push("/dashboard");
        });
      } else if (result.error) {
        toast.error(result.error, { duration: 10000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign In failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const isLoading = isSubmitting || isPending;

  return (
    <>
      <h1 className="form-title">Welcome Back</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="example@email.com"
          register={register}
          error={errors.email}
          type="email"
          disabled={isLoading}
          validation={{
            required: "Email is required",
            minLength: 2,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          register={register}
          type="password"
          error={errors.password}
          disabled={isLoading}
          validation={{
            required: "Password is required",
            minLength: 8,
          }}
        />
        <div className="text-sm">
          Forgot Password?{" "}
          <Link
            href="/forgot-password"
            className="text-crypto-purple hover:text-crypto-dark-purple underline"
          >
            Reset Password
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="purple-btn w-full mt-5"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
