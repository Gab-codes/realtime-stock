"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  Wallet,
  ArrowDownToLine,
  ArrowUpToLine,
  Briefcase,
  LineChart,
  Settings,
  HelpCircle,
  Biohazard,
} from "lucide-react";
import { APP_NAME, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
  { label: "Market", href: "/market", icon: LineChart },
  { label: "Transactions", href: "/transactions", icon: History },
  { label: "Deposit", href: "/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/withdraw", icon: ArrowUpToLine },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Support", href: "/support", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex  w-64 h-screen sticky top-0 bg-[#0a0a0a] border-r border-white/10 flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <Link href="/dashboard">
          <div className="flex items-center p-6">
            <h1 className="text-2xl font-bold text-white inline-flex gap-2 items-center">
              {APP_NAME}

              <Biohazard className="size-7 text-crypto-purple" />
            </h1>
          </div>
        </Link>
        {/* Navigation */}
        <nav className="px-4 space-y-1 mt-4">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10 transition-all",
                  pathname === href && "bg-crypto-purple/20 text-white"
                )}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 pb-6 border-t border-white/10">
        <Button
          variant="outline"
          className="w-full text-gray-300 border-gray-700 hover:bg-white/10"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}
