"use client";

import { LANGUAGES } from "@/data/languages";
import { useEffect, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    doGTranslate?: (lang: string) => void;
  }
}

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const handleChange = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;

    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  if (!mounted) return null; // Only render on client

  return (
    <>
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className="hidden" />

      <NativeSelect
        className="max-w-17 text-xs"
        onChange={(e) => handleChange(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <NativeSelectOption
            className="bg-background "
            key={lang.value}
            value={lang.value}
          >
            {lang.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </>
  );
}
