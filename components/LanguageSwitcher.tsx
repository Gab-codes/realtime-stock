"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-15 left-6 z-50">
      <div className="relative">
        {/* Main Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="size-10 rounded-full bg-crypto-purple hover:bg-crypto-dark-purple shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <Globe className="h-5 w-5" />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute bottom-14 inset-x-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[160px] py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                  i18n.language === language.code
                    ? "bg-crypto-purple/10 text-crypto-purple"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
                {i18n.language === language.code && (
                  <div className="ml-auto w-2 h-2 bg-crypto-purple rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[-1]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
