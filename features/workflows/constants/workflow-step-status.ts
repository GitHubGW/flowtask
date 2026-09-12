import type { RunStep } from "@/features/workflows/types";

export const WORKFLOW_STEP_STATUS = {
  pending: "실행 전",
  running: "실행 중",
  done: "완료",
  failed: "실패",
} satisfies Record<RunStep["status"], string>;
