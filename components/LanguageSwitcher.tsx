"use client";

import { LANGUAGES } from "@/data/languages";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    doGTranslate?: (lang: string) => void;
  }
}

export default function LanguageSwitcher() {
  useEffect(() => {
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

  return (
    <>
      {/* Hidden Google container */}
      <div id="google_translate_element" className="hidden" />

      <select
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border border-teal-400
                   bg-transparent px-2 py-1 text-sm
                   focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    </>
  );
}
