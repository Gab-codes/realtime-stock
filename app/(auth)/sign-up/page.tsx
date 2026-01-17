"use client";

import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signUpWithEmail } from "@/lib/actions/auth.action";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      // country: "US",
      // investmentGoals: "Growth",
      // riskTolerance: "Medium",
      // preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });
  const searchParams = useSearchParams();
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const referralCode = searchParams.get("ref") || undefined;
      const result = await signUpWithEmail({ ...data, referralCode });
      if (result.success) {
        router.push("/email-verification");
      } else {
        toast.error(result.error, {
          duration: 8000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign up failed", {
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong, failed to create an account",
      });
    }
  };

  return (
    <>
      <h1 className="form-title">Sign Up & Start Trading</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* inputs  */}
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          disabled={isSubmitting}
          validation={{
            required: "Full name is required",
            minLength: 2,
          }}
        />
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

        <CountrySelectField
          label="Country"
          name="country"
          control={control}
          error={errors.country}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="purple-btn w-full mt-5"
        >
          {isSubmitting
            ? "Creating account..."
            : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
