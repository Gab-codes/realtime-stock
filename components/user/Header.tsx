import NavItems from "@/components/user/NavItems";
import UserDropdown from "@/components/user/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.action";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 header">
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
