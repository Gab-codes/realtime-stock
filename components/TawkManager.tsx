"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const rootPaths = [
  "/",
  "/about",
  "/contact",
  "/affiliate",
  "/privacy-policy",
  "/terms-of-service",
  "/support",
];

const TawkManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const tawk = (window as any).Tawk_API;
    if (!tawk) return;

    const isRootPage = rootPaths.some((path) => pathname === path);

    if (isRootPage) {
      tawk.showWidget?.();
    } else {
      tawk.hideWidget?.();
    }
  }, [pathname]);

  return null;
};

export default TawkManager;
