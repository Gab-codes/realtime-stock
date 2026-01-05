import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslations from "../messages/en.json";

const resources = {
  en: {
    translation: enTranslations,
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
  });

export default i18n;
