import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepOutputProps {
  step: RunStep;
}

export const WorkflowConsoleStepOutput = ({
  step,
}: WorkflowConsoleStepOutputProps) => {
  if (step.error) {
    return (
      <section className="space-y-1.5">
        <h3 className="text-xs font-medium text-muted-foreground">오류</h3>
        <pre
          role="alert"
          className="rounded-md bg-muted p-3 font-mono text-xs wrap-break-word whitespace-pre-wrap text-destructive"
        >
          {step.error}
        </pre>
      </section>
    );
  }

  if (step.output !== undefined) {
    return (
      <section className="space-y-1.5">
        <h3 className="text-xs font-medium text-muted-foreground">출력</h3>
        <pre className="rounded-md bg-muted p-3 font-mono text-xs wrap-break-word whitespace-pre-wrap">
          {JSON.stringify(step.output, null, 2)}
        </pre>
      </section>
    );
  }

  if (step.status === "pending") {
    return (
      <section className="space-y-1.5">
        <h3 className="text-xs font-medium text-muted-foreground">출력</h3>
        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          아직 실행되지 않은 단계입니다.
        </p>
      </section>
    );
  }

  if (step.status === "running") {
    return (
      <section className="space-y-1.5">
        <h3 className="text-xs font-medium text-muted-foreground">출력</h3>
        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          단계 실행 중입니다.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-1.5">
      <h3 className="text-xs font-medium text-muted-foreground">출력</h3>
      <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
        이 단계에서 생성된 출력이 없습니다.
      </p>
    </section>
  );
};
