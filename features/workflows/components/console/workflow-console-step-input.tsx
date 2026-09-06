import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepInputProps {
  input: RunStep["input"];
}

export const WorkflowConsoleStepInput = ({
  input,
}: WorkflowConsoleStepInputProps) => {
  return (
    <section className="space-y-1.5">
      <h3 className="text-xs font-medium text-muted-foreground">입력</h3>
      {input ? (
        <pre className="rounded-md bg-muted p-3 font-mono text-xs wrap-break-word whitespace-pre-wrap">
          {JSON.stringify(input, null, 2)}
        </pre>
      ) : (
        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          이 단계에 기록된 입력이 없습니다.
        </p>
      )}
    </section>
  );
};
