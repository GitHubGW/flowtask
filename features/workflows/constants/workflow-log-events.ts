export const WORKFLOW_LOG_EVENTS = {
  CREATED: {
    name: "workflow.created",
    message: "워크플로우 생성 완료",
  },
  DELETED: {
    name: "workflow.deleted",
    message: "워크플로우 삭제 완료",
  },
  RUN_REQUESTED: {
    name: "workflow.run.requested",
    message: "워크플로우 실행 요청 완료",
  },
  RUN_CANCEL_REQUESTED: {
    name: "workflow.run.cancel_requested",
    message: "워크플로우 실행 취소 요청 완료",
  },
  RUN_STARTED: {
    name: "workflow.run.started",
    message: "워크플로우 실행 시작",
  },
  STEP_STARTED: {
    name: "workflow.step.started",
    message: "워크플로우 단계 실행 시작",
  },
  RUN_COMPLETED: {
    name: "workflow.run.completed",
    message: "워크플로우 실행 완료",
  },
  REPLAY_REQUEST_FAILED: {
    name: "workflow.replay.request_failed",
    message: "워크플로우 리플레이 요청 실패",
    unknownErrorMessage: "알 수 없는 리플레이 오류",
  },
} as const;
