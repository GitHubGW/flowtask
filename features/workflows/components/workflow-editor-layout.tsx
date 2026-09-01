"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkflowCanvas } from "@/features/workflows/components/workflow-canvas";
import { WorkflowEditorSidebar } from "@/features/workflows/components/workflow-editor-sidebar";

export const WorkflowEditorLayout = () => {
  return (
    <div className="size-full min-h-0">
      <ResizablePanelGroup orientation="horizontal" className="size-full">
        <ResizablePanel minSize="30rem" className="min-h-0">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel minSize="18rem" className="min-h-0">
              <WorkflowCanvas />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize="8rem"
              minSize="6rem"
              className="min-h-0"
            >
              <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                로그
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize="16rem"
          minSize="14rem"
          maxSize="36rem"
          groupResizeBehavior="preserve-pixel-size"
          className="min-h-0 bg-background"
        >
          <WorkflowEditorSidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
