import { WorkflowSidebar } from "@/features/workflows/components/navigation/workflow-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface WorkflowLayoutProps {
  children: React.ReactNode;
}

const WorkflowLayout = async ({ children }: WorkflowLayoutProps) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect(ROUTES.SIGN_IN);
  }

  return (
    <SidebarProvider className="h-svh bg-slate-50">
      <WorkflowSidebar />
      <SidebarInset className="min-h-0 overflow-hidden border-0 bg-white shadow-none md:m-0 md:rounded-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default WorkflowLayout;
