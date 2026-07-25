"use client";

import { useState, useTransition } from "react";
import { PlayIcon } from "lucide-react";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { Button } from "@/components/ui/button";
import { runWorkflowAction } from "@/features/workflows/actions";
import type { helloWorldTask } from "@/trigger/example";

interface RightSidebarProps {
  workflowId: string;
}

export const RightSidebar = ({ workflowId }: RightSidebarProps) => {
  const [isPending, startTransition] = useTransition();
  const [runId, setRunId] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();

  const { run, error } = useRealtimeRun<typeof helloWorldTask>(runId, {
    accessToken,
    enabled: !!runId && !!accessToken,
    skipColumns: ["payload"],
  });

  const handleRun = () => {
    startTransition(async () => {
      const handle = await runWorkflowAction(workflowId);
      setRunId(handle.id);
      setAccessToken(handle.publicAccessToken);
    });
  };

  return (
    <div className="flex size-full flex-col gap-3 p-3">
      <Button
        type="button"
        aria-label="Run workflow"
        disabled={isPending}
        onClick={handleRun}
      >
        <PlayIcon data-icon="inline-start" aria-hidden />
        {isPending ? "Starting..." : "Run"}
      </Button>

      {(run || error) && (
        <div
          className="flex flex-col gap-1 rounded-lg border border-border p-3 text-sm"
          aria-live="polite"
        >
          {error ? (
            <p className="text-destructive">{error.message}</p>
          ) : (
            <>
              <p>
                <span className="text-muted-foreground">Status: </span>
                {run?.status}
              </p>
              {run?.output?.message ? (
                <p>
                  <span className="text-muted-foreground">Result: </span>
                  {run.output.message}
                </p>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
};
