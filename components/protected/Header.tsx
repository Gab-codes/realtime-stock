import Link from "next/link";
import NavItems from "@/components/protected/NavItems";
import UserDropdown from "@/components/protected/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="header">
      <div className="container header-wrapper">
        <nav>
          <NavItems initialStocks={initialStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};
export default Header;
