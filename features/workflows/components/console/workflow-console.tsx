"use client";

import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkflowConsoleRunList } from "@/features/workflows/components/console/workflow-console-run-list";
import { WorkflowConsoleStepDetail } from "@/features/workflows/components/console/workflow-console-step-detail";
import type { WorkflowConsoleSelection } from "@/features/workflows/types";
import { SessionReplay } from "@/features/workflows/components/console/session-replay";
import { useWorkflowConsoleRuns } from "@/features/workflows/hooks/use-workflow-console-runs";

const isSameConsoleSelection = (
  currentSelection: WorkflowConsoleSelection | null,
  nextSelection: WorkflowConsoleSelection
) => {
  if (!currentSelection || currentSelection.runId !== nextSelection.runId) {
    return false;
  }

  if (currentSelection.kind === "replay") {
    return nextSelection.kind === "replay";
  }

  return (
    nextSelection.kind === "step" &&
    currentSelection.nodeId === nextSelection.nodeId
  );
};

export const WorkflowConsole = () => {
  const [selection, setSelection] = useState<WorkflowConsoleSelection | null>(
    null
  );
  const runs = useWorkflowConsoleRuns();
  const replayRun =
    selection?.kind === "replay"
      ? runs.find((run) => run.id === selection.runId)
      : undefined;

  const handleSelect = (nextSelection: WorkflowConsoleSelection) => {
    setSelection((currentSelection) => {
      if (isSameConsoleSelection(currentSelection, nextSelection)) {
        return null;
      }

      return nextSelection;
    });
  };

  return (
    <ResizablePanelGroup orientation="horizontal" className="size-full">
      <ResizablePanel minSize="12rem" className="min-h-0">
        <WorkflowConsoleRunList selection={selection} onSelect={handleSelect} />
      </ResizablePanel>

      {selection && (
        <>
          <ResizableHandle />
          <ResizablePanel defaultSize="50" minSize="12rem" className="min-h-0">
            {selection.kind === "step" ? (
              <WorkflowConsoleStepDetail selection={selection} />
            ) : replayRun?.browserbaseSessionId &&
              replayRun.status === "COMPLETED" ? (
              <section className="flex size-full min-h-0 flex-col">
                <h2 className="shrink-0 border-b px-3 py-2 text-sm font-semibold">
                  리플레이
                </h2>
                <div className="min-h-0 flex-1">
                  <SessionReplay
                    key={replayRun.browserbaseSessionId}
                    sessionId={replayRun.browserbaseSessionId}
                  />
                </div>
              </section>
            ) : (
              <p className="p-3 text-xs text-muted-foreground">
                선택한 실행의 리플레이를 찾을 수 없어요.
              </p>
            )}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
};
