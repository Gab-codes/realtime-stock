import { AppSidebar } from "@/components/admin/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserDropdown from "@/components/user/UserDropdown";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/sign-in");

  const sessionUser = session.user as unknown as User;

  if (sessionUser.role !== "admin") redirect("/dashboard");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="sticky top-0 z-50 w-full backdrop-blur-md border-b shadow-sm">
            <div className="p-2 flex items-center justify-between">
              <SidebarTrigger />
              <UserDropdown user={sessionUser} />
            </div>
          </div>
          <div className="p-2">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
