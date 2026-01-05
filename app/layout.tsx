import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { APP_NAME } from "@/lib/utils";
import TanstackProvider from "./tanstack-provider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { I18nProvider } from "@/components/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    "AI Smart Investment Planner, with real-time stock prices, personalized alerts and detailed company insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <I18nProvider>
        <TanstackProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Toaster />
            <LanguageSwitcher />
          </body>
        </TanstackProvider>
      </I18nProvider>
    </html>
  );
}
