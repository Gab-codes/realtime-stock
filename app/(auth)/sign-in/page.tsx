"use client";

import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();

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

        if (user.role === "admin") router.push("/admin/dashboard");
        else router.push("/dashboard");
      } else if (result.error === "email_unverified") {
        toast.error("Email not verified");
        router.push(`/verify-email?email=${data.email}`);
      } else if (result.error) {
        toast.error(result.error, {
          duration: 10000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign In failed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, failed to sign in",
      });
    }
  };

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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          className="purple-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
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
