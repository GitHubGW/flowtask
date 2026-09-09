"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Plus, Workflow } from "lucide-react";
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
import type { WorkflowRow } from "@/libs/db/schema";
import { useTransition } from "react";
import { ROUTES } from "@/constants/routes";
import { createWorkflowAction } from "@/features/workflows/actions";
import { toast } from "sonner";
import { useProPlan } from "@/features/workflows/hooks/use-pro-plan";

interface WorkflowSidebarSectionProps {
  workflows: Pick<WorkflowRow, "id" | "name">[];
}

export const WorkflowSidebarSection = ({
  workflows,
}: WorkflowSidebarSectionProps) => {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { isLoaded, hasProPlan, goToPricing } = useProPlan();

  const isWorkflowActive = (workflowId: string) => {
    return pathname === ROUTES.WORKFLOWS.DETAIL(workflowId);
  };

  const handleCreateWorkflow = () => {
    if (!hasProPlan) {
      goToPricing();
      return;
    }

    startTransition(async () => {
      try {
        const { workflowId } = await createWorkflowAction();
        toast.success("워크플로우를 생성했습니다.");
        router.push(ROUTES.WORKFLOWS.DETAIL(workflowId));
      } catch {
        toast.error("워크플로우 생성에 실패했습니다.");
      }
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
                    disabled={isPending || !isLoaded}
                    onClick={handleCreateWorkflow}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Plus className="size-4 shrink-0" aria-hidden />
                    )}
                    {isPending ? "워크플로우 생성 중..." : "워크플로우 추가"}
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
        title="워크플로우 추가"
        onClick={handleCreateWorkflow}
        disabled={isPending || !isLoaded}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Plus />}
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
