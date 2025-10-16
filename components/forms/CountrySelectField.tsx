//@ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import countryList from "react-select-country-list";

type CountrySelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
};

// ---------- Utilities ----------

const getFlagUrl = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return "";
  return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
};

const getFallbackFlag = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return "🏳️";
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🏳️";
  }
};

// ---------- Static Country Data ----------
const COUNTRY_OPTIONS = countryList().getData();

// ---------- Components ----------

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  // Memoize the mapped list to avoid re-rendering all items unnecessarily
  const countryItems = useMemo(
    () =>
      COUNTRY_OPTIONS.map((country) => (
        <CommandItem
          key={country.value}
          value={`${country.label} ${country.value}`}
          onSelect={() => {
            onChange(country.value === value ? "" : country.value);
            setOpen(false);
          }}
          className="flex items-center px-2 py-1.5 text-sm text-white hover:bg-gray-700 cursor-pointer"
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4 flex-shrink-0",
              value === country.value
                ? "opacity-100 text-yellow-500"
                : "opacity-0"
            )}
          />
          <span className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={getFlagUrl(country.value)}
              alt=""
              className="w-6 h-4 object-cover flex-shrink-0"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="truncate">{country.label}</span>
          </span>
        </CommandItem>
      )),
    [value, onChange]
  );

  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between country-select-trigger"
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2 truncate">
              <img
                src={getFlagUrl(selectedCountry.value)}
                alt=""
                className="w-6 h-4 object-cover flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <span className="truncate">{selectedCountry.label}</span>
            </span>
          ) : (
            "Select your country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg-gray-800 border-gray-600"
        align="start"
      >
        <Command className="bg-gray-800 border-gray-600">
          <CommandInput
            placeholder="Search countries..."
            className="country-select-input text-white placeholder-gray-400"
          />
          <CommandEmpty className="country-select-empty text-gray-400 p-2">
            No country found.
          </CommandEmpty>
          <CommandList className="max-h-60 bg-gray-800">
            <CommandGroup className="bg-gray-800">{countryItems}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-400">
        Helps us show market data and news relevant to you.
      </p>
    </div>
  );
};
