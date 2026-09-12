export const WORKFLOW_VALIDATION_MESSAGES = {
  START_NODE_REQUIRED: "워크플로우에 시작 노드가 필요해요.",
  ACTION_NODE_REQUIRED: "워크플로우에 하나 이상의 액션 노드가 필요해요.",
  UNCONNECTED_ACTION_NODE:
    "시작 노드와 연결되지 않은 액션 노드가 있어요.",
  INVALID_GRAPH: "워크플로우의 연결 구조를 확인해 주세요.",
} as const;
