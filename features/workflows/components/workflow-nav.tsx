"use client";

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
import { getRandomSlug } from "@/features/workflows/libs/getRandomSlug";

interface WorkflowNavProps {
  workflows: WorkflowType[];
  onCreateWorkflow: (name: string) => Promise<never>;
}

export const WorkflowNav = ({
  workflows,
  onCreateWorkflow,
}: WorkflowNavProps) => {
  const { state } = useSidebar();
  const [isPending, startTransition] = useTransition();

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
                    isActive
                    tooltip="Workflows"
                    aria-label="Workflows"
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
                    aria-label="New workflow"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Plus className="size-4 shrink-0" aria-hidden />
                    New workflow
                  </button>
                  <div className="my-1 border-t" />
                  <ul className="flex max-h-80 flex-col overflow-y-auto">
                    {workflows.map((workflow, index) => (
                      <li key={workflow.id}>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                            index === 0 &&
                              "bg-accent font-medium text-accent-foreground"
                          )}
                        >
                          {workflow.name}
                        </button>
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
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction
        aria-label="New workflow"
        title="New workflow"
        onClick={handleCreateWorkflow}
        disabled={isPending}
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow, index) => (
            <SidebarMenuItem key={workflow.id}>
              <SidebarMenuButton isActive={index === 0}>
                <span>{workflow.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
