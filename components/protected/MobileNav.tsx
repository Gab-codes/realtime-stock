"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpToLine,
  History,
  MoreHorizontal,
  Briefcase,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Deposit", href: "/deposit", icon: ArrowDownToLine },
    { label: "Withdraw", href: "/withdraw", icon: ArrowUpToLine },
    { label: "History", href: "/transactions", icon: History },
  ];

  return (
    <div className="fixed bottom-0 -left-3 w-full bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 flex justify-around py-3 md:hidden z-50">
      {/* Normal Tabs */}
      {tabs.map(({ label, href, icon: Icon }) => (
        <Link key={href} href={href} className="flex-1">
          <div
            className={cn(
              "flex flex-col items-center text-gray-400 text-xs transition-colors",
              pathname === href && "text-crypto-purple"
            )}
          >
            <Icon size={20} />
            <span className="mt-1">{label}</span>
          </div>
        </Link>
      ))}

      {/* Drawer for "More" */}
      <Drawer>
        <DrawerTrigger asChild>
          <button className="flex flex-col items-center cursor-pointer text-gray-400 text-xs">
            <MoreHorizontal size={22} />
            <span className="mt-1">More</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-[#0a0a0a] h-[88vh] border-t border-white/10 text-white">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold">
              More Options
            </DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Access additional sections and settings
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-6 pb-6 space-y-3">
            <DrawerLink href="/portfolio" icon={Briefcase} label="Portfolio" />
            <DrawerLink href="/market" icon={LineChart} label="Market" />
            <DrawerLink href="/settings" icon={Settings} label="Settings" />
            <DrawerLink href="/support" icon={HelpCircle} label="Support" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

/* DrawerLink Component */
function DrawerLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-md transition"
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}
