import { DashboardSidebar } from "@/features/workflows/components/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
