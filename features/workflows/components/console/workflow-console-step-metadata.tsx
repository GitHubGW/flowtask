import prettyMilliseconds from "pretty-ms";
import { WORKFLOW_STEP_STATUS } from "@/features/workflows/constants/workflow-step-status";
import type { RunStep } from "@/features/workflows/types";

interface WorkflowConsoleStepMetadataProps {
  step: RunStep;
}

export const WorkflowConsoleStepMetadata = ({
  step,
}: WorkflowConsoleStepMetadataProps) => {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-950">실행 정보</h3>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <dt className="text-xs text-slate-500">상태</dt>
          <dd className="mt-1 text-sm font-medium text-slate-950">
            {WORKFLOW_STEP_STATUS[step.status]}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">실행 시간</dt>
          <dd className="mt-1 text-sm font-medium text-slate-950">
            {step.durationMs === undefined
              ? "-"
              : prettyMilliseconds(step.durationMs)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">노드 유형</dt>
          <dd className="mt-1 text-sm font-medium text-slate-950">
            {step.type}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-slate-500">노드 ID</dt>
          <dd
            className="mt-1 truncate font-mono text-xs text-slate-700"
            title={step.nodeId}
          >
            {step.nodeId}
          </dd>
        </div>
      </dl>
    </section>
  );
};
