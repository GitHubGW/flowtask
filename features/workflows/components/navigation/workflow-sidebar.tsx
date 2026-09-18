import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { WorkflowSidebarSection } from "@/features/workflows/components/navigation/workflow-sidebar-section";
import { WorkflowSidebarShell } from "@/features/workflows/components/navigation/workflow-sidebar-shell";
import { getWorkflows } from "@/features/workflows/queries";

export const WorkflowSidebar = async () => {
  const { orgId } = await auth();
  const workflows = orgId ? await getWorkflows(orgId) : [];

  return (
    <WorkflowSidebarShell
      collapsible="icon"
      className="border-r border-slate-200 bg-slate-50"
    >
      <SidebarHeader className="gap-3 border-b border-slate-200 px-3 py-3">
        <div className="flex h-8 items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href={ROUTES.HOME}
            className="flex min-w-0 items-center gap-2.5 group-data-[collapsible=icon]:hidden"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Image
                src="/images/logo.svg"
                width={24}
                height={24}
                alt="로고 이미지"
                className="size-8"
              />
            </span>
            <span className="truncate text-base font-bold tracking-tight text-slate-950">
              {SITE.NAME}
            </span>
          </Link>
          <SidebarTrigger className="shrink-0 text-slate-500 hover:bg-slate-200/70" />
        </div>
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl={ROUTES.WORKFLOWS.INDEX}
              afterLeaveOrganizationUrl={ROUTES.WORKFLOWS.INDEX}
              afterSelectOrganizationUrl={ROUTES.WORKFLOWS.INDEX}
              appearance={{
                elements: {
                  rootBox: "flex min-w-0 w-full",
                  organizationSwitcherTrigger:
                    "w-full justify-start gap-2 px-1.5 py-1",
                },
              }}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1 py-2">
        <WorkflowSidebarSection workflows={workflows} />
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 p-3 group-data-[collapsible=icon]:items-center">
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger:
                "w-full justify-start group-data-[collapsible=icon]:justify-center",
              userButtonOuterIdentifier: "group-data-[collapsible=icon]:hidden",
            },
          }}
        />
      </SidebarFooter>
    </WorkflowSidebarShell>
  );
};
