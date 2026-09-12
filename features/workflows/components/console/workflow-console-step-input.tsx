import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepInputProps {
  input: RunStep["input"];
}

export const WorkflowConsoleStepInput = ({
  input,
}: WorkflowConsoleStepInputProps) => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-950">입력</h3>
      {input ? (
        <pre className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-5 wrap-break-word whitespace-pre-wrap text-slate-800">
          {JSON.stringify(input, null, 2)}
        </pre>
      ) : (
        <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
          이 단계에 기록된 입력이 없어요.
        </p>
      )}
    </section>
  );
};
