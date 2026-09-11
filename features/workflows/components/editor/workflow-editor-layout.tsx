"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkflowCanvas } from "@/features/workflows/components/editor/workflow-canvas";
import { WorkflowConsole } from "@/features/workflows/components/console/workflow-console";
import { WorkflowEditorSidebar } from "@/features/workflows/components/editor/workflow-editor-sidebar";
import { ChevronRight, Workflow } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface WorkflowEditorLayoutProps {
  workflowName: string;
}

export const WorkflowEditorLayout = ({
  workflowName,
}: WorkflowEditorLayoutProps) => {
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
