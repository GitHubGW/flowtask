"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Workflow } from "lucide-react";
import { cn } from "@/libs/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { WorkflowType } from "@/libs/db/schema";
import { useTransition } from "react";
import { getRandomSlug } from "@/features/workflows/libs/get-random-slug";
import { ROUTES } from "@/constants/routes";

interface WorkflowNavProps {
  workflows: WorkflowType[];
  onCreateWorkflow: (name: string) => Promise<never>;
}

export const WorkflowNav = ({
  workflows,
  onCreateWorkflow,
}: WorkflowNavProps) => {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isPending, startTransition] = useTransition();

  const isWorkflowActive = (id: string) => {
    return pathname === ROUTES.WORKFLOWS.DETAIL(id);
  };

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      const randomSlug = getRandomSlug();
      await onCreateWorkflow(randomSlug);
    });
  };

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(ROUTES.WORKFLOWS.INDEX)}
                    tooltip="워크플로우"
                    aria-label="워크플로우"
                    disabled={isPending}
                  >
                    <Workflow />
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  sideOffset={12}
                  className="w-64 gap-0 p-1"
                >
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={handleCreateWorkflow}
                    aria-label="새 워크플로우"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Plus className="size-4 shrink-0" aria-hidden />새
                    워크플로우
                  </button>
                  <div className="my-1 border-t" />
                  <ul className="flex max-h-80 flex-col overflow-y-auto">
                    {workflows.map((workflow) => (
                      <li key={workflow.id}>
                        <Link
                          href={ROUTES.WORKFLOWS.DETAIL(workflow.id)}
                          className={cn(
                            "flex w-full items-center truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                            isWorkflowActive(workflow.id) &&
                              "bg-accent font-medium text-accent-foreground"
                          )}
                          aria-current={
                            isWorkflowActive(workflow.id) ? "page" : undefined
                          }
                        >
                          {workflow.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>워크플로우</SidebarGroupLabel>
      <SidebarGroupAction
        aria-label="새 워크플로우"
        title="새 워크플로우"
        onClick={handleCreateWorkflow}
        disabled={isPending}
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow) => (
            <SidebarMenuItem key={workflow.id}>
              <SidebarMenuButton
                asChild
                isActive={isWorkflowActive(workflow.id)}
              >
                <Link
                  href={ROUTES.WORKFLOWS.DETAIL(workflow.id)}
                  aria-current={
                    isWorkflowActive(workflow.id) ? "page" : undefined
                  }
                >
                  <span>{workflow.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
