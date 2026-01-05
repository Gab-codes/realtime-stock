"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true); // Mark as hydrated on client

    // Initialize i18n on client side only
    if (!i18n.isInitialized) {
      i18n.init().then(() => {
        setIsInitialized(true);
      });
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isHydrated || !isInitialized) {
    return (
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <main>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-purple"></div>
        </main>
      </body>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
