"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize i18n on client side only
    if (!i18n.isInitialized) {
      // Import translations dynamically to avoid SSR issues
      import("@/messages/en.json").then((enTranslations) => {
        const resources = {
          en: {
            translation: enTranslations.default,
          },
          es: {
            translation: {
              hero: {
                newFeature: "Nueva Función",
                aiTradingSignals: "Señales de Trading con IA",
                title: "Opera Cripto y Acciones con Confianza",
                subtitle:
                  "Experimenta trading de criptomonedas sin problemas con análisis en tiempo real, insights de IA, y trading automático con IA.",
                startTrading: "Comenzar a Operar",
                createAccount: "Crear Cuenta",
                tradingVolume: "Volumen de Trading",
                activeTraders: "Operadores Activos",
                globalMarkets: "Mercados Globales",
                aiTrading: "Trading con IA 24h",
              },
            },
          },
          fr: {
            translation: {
              hero: {
                newFeature: "Nouvelle Fonction",
                aiTradingSignals: "Signaux de Trading IA",
                title: "Opérez Crypto et Actions en Toute Confiance",
                subtitle:
                  "Découvrez le trading de cryptomonnaies sans faille avec des analyses en temps réel, des insights IA, et du trading automatique IA.",
                startTrading: "Commencer à Trader",
                createAccount: "Créer un Compte",
                tradingVolume: "Volume de Trading",
                activeTraders: "Traders Actifs",
                globalMarkets: "Marchés Mondiaux",
                aiTrading: "Trading IA 24h",
              },
            },
          },
          de: {
            translation: {
              hero: {
                newFeature: "Neue Funktion",
                aiTradingSignals: "KI-Handelssignale",
                title: "Handeln Sie Krypto und Aktien mit Vertrauen",
                subtitle:
                  "Erleben Sie nahtloses Kryptowährungshandling mit Echtzeitanalysen, KI-Einsichten und automatisiertem KI-Handel.",
                startTrading: "Mit dem Handeln beginnen",
                createAccount: "Konto erstellen",
                tradingVolume: "Handelsvolumen",
                activeTraders: "Aktive Trader",
                globalMarkets: "Globale Märkte",
                aiTrading: "24h KI-Handel",
              },
            },
          },
        };

        i18n
          .use(LanguageDetector)
          .use(initReactI18next)
          .init({
            resources,
            fallbackLng: "en",
            debug: false,
            interpolation: {
              escapeValue: false,
            },
            detection: {
              order: ["localStorage", "navigator", "htmlTag"],
              caches: ["localStorage"],
            },
          })
          .then(() => {
            setIsInitialized(true);
          });
      });
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Don't render children until i18n is initialized
  if (!isInitialized) {
    return <>{children}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
