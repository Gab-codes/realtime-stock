import Header from "@/components/protected/Header";
import MobileNav from "@/components/protected/MobileNav";
import Sidebar from "@/components/protected/Sidebar";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");

  const sessionUser = session.user as unknown as User;

  const user = {
    id: sessionUser.id,
    name: sessionUser.name,
    email: sessionUser.email,
    role: sessionUser.role,
  };

  console.log("user role:", user.role);
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
