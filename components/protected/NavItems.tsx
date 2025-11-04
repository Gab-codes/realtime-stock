"use client";

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "./SearchCommand";
import { Search } from "lucide-react";

const NavItems = ({
  initialStocks,
}: {
  initialStocks: StockWithWatchlistStatus[];
}) => {
  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ href }) => {
        if (href === "/search")
          return (
            <li key="search-trigger">
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );
      })}
    </ul>
  );
};
export default NavItems;
