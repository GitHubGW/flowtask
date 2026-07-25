"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Canvas } from "@/features/workflows/components/canvas";
import { RightSidebar } from "@/features/workflows/components/right-sidebar";

interface WorkflowShellProps {
  workflowId: string;
}

export const WorkflowShell = ({ workflowId }: WorkflowShellProps) => {
  return (
    <div className="size-full min-h-0" data-workflow-id={workflowId}>
      <ResizablePanelGroup orientation="horizontal" className="size-full">
        <ResizablePanel minSize="30rem" className="min-h-0">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel minSize="18rem" className="min-h-0">
              <Canvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="8rem"
              minSize="6rem"
              className="min-h-0"
            >
              <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                Logs
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize="16rem"
          minSize="14rem"
          maxSize="36rem"
          className="min-h-0"
        >
          <RightSidebar workflowId={workflowId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
