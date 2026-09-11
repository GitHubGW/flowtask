import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepOutputProps {
  step: RunStep;
}

export const WorkflowConsoleStepOutput = ({
  step,
}: WorkflowConsoleStepOutputProps) => {
  if (step.error) {
    return (
      <section>
        <h3 className="text-sm font-semibold text-slate-950">오류</h3>
        <pre
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 p-4 font-mono text-xs leading-5 wrap-break-word whitespace-pre-wrap text-red-700"
        >
          {step.error}
        </pre>
      </section>
    );
  }

  if (step.output !== undefined) {
    return (
      <section>
        <h3 className="text-sm font-semibold text-slate-950">출력</h3>
        <pre className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-5 wrap-break-word whitespace-pre-wrap text-slate-800">
          {JSON.stringify(step.output, null, 2)}
        </pre>
      </section>
    );
  }

  if (step.status === "pending") {
    return (
      <section>
        <h3 className="text-sm font-semibold text-slate-950">출력</h3>
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          아직 실행되지 않은 단계입니다.
        </p>
      </section>
    );
  }

  if (step.status === "running") {
    return (
      <section>
        <h3 className="text-sm font-semibold text-slate-950">출력</h3>
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          단계 실행 중입니다.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-950">출력</h3>
      <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
        이 단계에서 생성된 출력이 없습니다.
      </p>
    </section>
  );
};
