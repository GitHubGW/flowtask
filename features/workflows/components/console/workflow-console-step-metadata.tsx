import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepMetadataProps {
  step: RunStep;
}

export const WorkflowConsoleStepMetadata = ({
  step,
}: WorkflowConsoleStepMetadataProps) => {
  const metadata = {
    nodeId: step.nodeId,
    type: step.type,
    status: step.status,
    durationMs: step.durationMs,
  };

  return (
    <section className="space-y-1.5">
      <h3 className="text-xs font-medium text-muted-foreground">실행 정보</h3>
      <pre className="rounded-md bg-muted p-3 font-mono text-xs wrap-break-word whitespace-pre-wrap">
        {JSON.stringify(metadata, null, 2)}
      </pre>
    </section>
  );
};
