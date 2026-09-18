"use client";

import {
  ChevronRight,
  History,
  PanelsTopLeft,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import { WorkflowConsole } from "@/features/workflows/components/console/workflow-console";
import { AddWorkflowNodeButton } from "@/features/workflows/components/editor/add-workflow-node-button";
import { WorkflowCanvas } from "@/features/workflows/components/editor/workflow-canvas";
import { WorkflowEditorSidebar } from "@/features/workflows/components/editor/workflow-editor-sidebar";
import { WorkflowRunToggleButton } from "@/features/workflows/components/editor/workflow-run-toggle-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/libs/utils";

interface WorkflowEditorLayoutProps {
  workflowName: string;
}

type MobilePanel = "canvas" | "editor" | "history";

const mobilePanels = [
  { id: "canvas", label: "캔버스", icon: PanelsTopLeft },
  { id: "editor", label: "편집", icon: SlidersHorizontal },
  { id: "history", label: "실행 기록", icon: History },
] satisfies { id: MobilePanel; label: string; icon: typeof PanelsTopLeft }[];

export const WorkflowEditorLayout = ({
  workflowName,
}: WorkflowEditorLayoutProps) => {
  const isMobile = useIsMobile();
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("canvas");

  if (isMobile) {
    return (
      <div className="flex size-full min-h-0 flex-col bg-white">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-200 px-2">
          <SidebarTrigger className="shrink-0" />
          <h1 className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-950">
            {workflowName}
          </h1>
          <div className="flex shrink-0 items-center gap-1.5">
            <AddWorkflowNodeButton />
            <WorkflowRunToggleButton />
          </div>
        </header>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <section
            aria-label="워크플로우 캔버스"
            className={cn(
              "absolute inset-0",
              mobilePanel !== "canvas" && "hidden"
            )}
          >
            <WorkflowCanvas />
          </section>
          <section
            aria-label="워크플로우 편집"
            className={cn(
              "absolute inset-0 overflow-hidden",
              mobilePanel !== "editor" && "hidden"
            )}
          >
            <WorkflowEditorSidebar showToolbar={false} />
          </section>
          <section
            aria-label="워크플로우 실행 기록"
            className={cn(
              "absolute inset-0 overflow-hidden",
              mobilePanel !== "history" && "hidden"
            )}
          >
            <WorkflowConsole />
          </section>
        </div>

        <nav
          aria-label="워크플로우 모바일 메뉴"
          className="grid h-16 shrink-0 grid-cols-3 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]"
        >
          {mobilePanels.map(({ id, label, icon: Icon }) => {
            const isActive = mobilePanel === id;

            return (
              <button
                key={id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setMobilePanel(id)}
                className={cn(
                  "flex min-w-0 flex-col items-center justify-center gap-1 text-[11px] font-medium text-slate-500 transition-colors",
                  isActive && "text-violet-600"
                )}
              >
                <Icon className="size-4" aria-hidden />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    );
  }

  return (
    <div className="flex size-full min-h-0 flex-col bg-white">
      <header className="flex h-16 shrink-0 items-center border-b border-slate-200 px-5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Link
            href={ROUTES.WORKFLOWS.INDEX}
            className="flex items-center gap-2 text-slate-500"
          >
            <Workflow className="size-4" aria-hidden />
            워크플로우
          </Link>
          <ChevronRight className="size-4 text-slate-300" aria-hidden />
          <h1 className="truncate font-semibold text-slate-950">
            {workflowName}
          </h1>
        </div>
      </header>
      <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
        <ResizablePanel minSize="30rem" className="min-h-0">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel minSize="18rem" className="min-h-0">
              <WorkflowCanvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="14rem"
              minSize="8rem"
              className="min-h-0"
            >
              <WorkflowConsole />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize="22rem"
          minSize="18rem"
          maxSize="28rem"
          groupResizeBehavior="preserve-pixel-size"
          className="min-h-0 bg-white"
        >
          <WorkflowEditorSidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
