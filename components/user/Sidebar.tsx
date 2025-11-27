"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  History,
  ArrowDownToLine,
  ArrowUpToLine,
  Briefcase,
  // Settings,
  HelpCircle,
  Biohazard,
  LogOut,
} from "lucide-react";
import { APP_NAME, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
  { label: "Transactions", href: "/transactions", icon: History },
  { label: "Deposit", href: "/deposit", icon: ArrowDownToLine },
  { label: "Withdraw", href: "/withdraw", icon: ArrowUpToLine },
  { label: "Verification Center", href: "/kyc", icon: HelpCircle },
  // { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    console.log("signing out");
    await signOut();
    router.push("/sign-in");
  };

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
        <nav className="px-4 flex flex-col gap-2 mt-4">
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
      <div
        className="px-4 pb-6 border-t border-white/10"
        onClick={handleSignOut}
      >
        <Button variant="destructive" className="w-full text-gray-100">
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </aside>
  );
}
