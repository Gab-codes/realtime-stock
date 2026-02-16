"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Biohazard, Menu, X } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/lib/utils";
import LanguageSwitcher from "../LanguageSwitcher";

// Centralized navigation links
const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
  { href: "/overview", label: "Market Overview" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-crypto-blue/80 backdrop-blur-md py-6 md:py-4 max-md:px-2 shadow-lg"
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white inline-flex gap-2 items-center">
            {APP_NAME}
            <Biohazard className="size-7.5 text-crypto-purple" />
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="text-gray-300 hover:text-white"
            >
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full">
              Sign Up
            </Button>
          </Link>

          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X className="size-6.5" />
            ) : (
              <Menu className="size-6.5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-crypto-blue/95 backdrop-blur-lg absolute top-full left-0 w-full py-4 shadow-lg">
          <div className="container mx-auto px-4">
            <ul className="flex flex-col ps-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors block py-2"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Buttons */}
              <li className="pt-4 flex gap-5">
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="text-gray-300 hover:text-white w-full justify-start"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full">
                    Sign Up
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
