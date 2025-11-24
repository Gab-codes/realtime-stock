import Header from "@/components/user/Header";
import MobileNav from "@/components/user/MobileNav";
import Sidebar from "@/components/user/Sidebar";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");

  const user = {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };

  return (
    <main className="min-h-screen text-gray-400 flex">
      <Sidebar />
      <div className="flex-col w-full max-md:mb-15">
        <Header user={user} />
        <div className="container py-5">{children}</div>
      </div>
      <MobileNav />
    </main>
  );
};

export default Layout;
