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

const workflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
] as const;

const handleNewWorkflow = () => {
  // TODO: open create workflow flow
};

export const WorkflowNav = () => {
  const { state } = useSidebar();

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    tooltip="Workflows"
                    isActive
                    aria-label="Workflows"
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
                    onClick={handleNewWorkflow}
                    aria-label="New workflow"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Plus className="size-4 shrink-0" aria-hidden />
                    New workflow
                  </button>
                  <div className="my-1 border-t" />
                  <ul className="flex max-h-80 flex-col overflow-y-auto">
                    {workflows.map((workflow, index) => (
                      <li key={workflow}>
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                            index === 0 &&
                              "bg-accent font-medium text-accent-foreground"
                          )}
                        >
                          {workflow}
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
        onClick={handleNewWorkflow}
      >
        <Plus />
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {workflows.map((workflow, index) => (
            <SidebarMenuItem key={workflow}>
              <SidebarMenuButton isActive={index === 0}>
                <span>{workflow}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
