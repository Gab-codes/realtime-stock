import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { APP_NAME } from "@/lib/utils";
import { Biohazard } from "lucide-react";

const Header = async ({ user }: { user: User }) => {
  const initialStocks = await searchStocks();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white inline-flex gap-2 items-center">
              {APP_NAME}

              <Biohazard className="size-7 text-crypto-purple" />
            </h1>
          </div>
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};
export default Header;
