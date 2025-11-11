"use client";

import { NAV_ITEMS } from "@/lib/constants";
import SearchCommand from "./SearchCommand";

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
                label="Search Stocks"
                initialStocks={initialStocks}
              />
            </li>
          );
      })}
    </ul>
  );
};
export default NavItems;
