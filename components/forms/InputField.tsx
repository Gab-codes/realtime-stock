"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  register,
  error,
  validation,
  disabled,
  value,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          type={showPassword ? "text" : type}
          className={cn("form-input", {
            "opacity-50 cursor-not-allowed": disabled,
          })}
          disabled={disabled}
          value={value}
          {...register(name, validation)}
        />
        {type === "password" && showPassword === false ? (
          <Eye
            className="absolute size-5 top-1/2 right-4 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : type === "password" && showPassword === true ? (
          <EyeOff
            className="absolute size-5 top-1/2 right-4 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : null}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
