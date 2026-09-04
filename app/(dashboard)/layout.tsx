import { DashboardSidebar } from "@/features/workflows/components/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <SidebarProvider className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 overflow-hidden border shadow-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
