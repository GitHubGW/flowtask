"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkflowConsoleRunList } from "@/features/workflows/components/console/workflow-console-run-list";
import { WorkflowConsoleStepDetail } from "@/features/workflows/components/console/workflow-console-step-detail";
import type { RunStepSelection } from "@/features/workflows/types";

export const WorkflowConsole = () => {
  const [selectedStep, setSelectedStep] = useState<RunStepSelection | null>(
    null
  );

  const handleSelectStep = (selection: RunStepSelection) => {
    setSelectedStep((currentSelection) => {
      const isSameStep =
        currentSelection?.runId === selection.runId &&
        currentSelection.nodeId === selection.nodeId;
      return isSameStep ? null : selection;
    });
  };

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="12rem" className="min-h-0">
        <WorkflowConsoleRunList
          selectedStep={selectedStep}
          onSelectStep={handleSelectStep}
        />
      </ResizablePanel>

      {selectedStep && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize="50" minSize="12rem" className="min-h-0">
            <WorkflowConsoleStepDetail selection={selectedStep} />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
