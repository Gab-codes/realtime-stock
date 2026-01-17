import { Controller } from "react-hook-form";
import { Label } from "../ui/label";

interface TextareaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  error?: any;
  required?: boolean;
  rows?: number;
}

const TextareaField = ({
  name,
  label,
  placeholder,
  control,
  error,
  required = false,
  rows = 4,
}: TextareaFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please enter ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <textarea
            {...field}
            id={name}
            rows={rows}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-transparent border border-input rounded-sm focus:!ring-crypto-purple focus:!border-crypto-purple resize-none"
          />
        )}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextareaField;
