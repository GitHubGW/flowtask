import type { Edge, Node } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";

/**
 * 워크플로우 스텝 타입
 */
export type WorkflowStepType =
  "start" | "open-url" | "act" | "extract" | "observe" | "agent" | "send-email";

/**
 * 워크플로우 스텝 타입이 담당하는 역할
 * - `trigger`: 워크플로우 실행을 시작하는 스텝
 * - `action`: 실제 작업을 수행하는 스텝
 */
export type WorkflowStepKind = "trigger" | "action";

/**
 * 워크플로우 스텝 타입에 해당하는 역할 관계
 * - `start`에는 `trigger`
 * - 나머지 실행 스텝에는 `action`만 지정 가능
 */
export type WorkflowStepKindByType = {
  /** 워크플로우 실행 시작 */
  start: "trigger";
  /** URL 이동 */
  "open-url": "action";
  /** 자연어 기반 브라우저 동작 실행 */
  act: "action";
  /** 웹 페이지 데이터 추출 */
  extract: "action";
  /** 실행 가능한 브라우저 동작 탐색 */
  observe: "action";
  /** 자율적인 다단계 브라우저 작업 실행 */
  agent: "action";
  /** 이메일 전송 */
  "send-email": "action";
};

/**
 * 전체 스텝 타입에서 실제 작업을 수행하는 `action` 타입
 */
export type WorkflowActionStepType = {
  [K in WorkflowStepType]: WorkflowStepKindByType[K] extends "action"
    ? K
    : never;
}[WorkflowStepType];

/**
 * 노드 인스펙터에 표시할 입력 필드 정의
 * - 실제 입력값이 아닌 입력 UI 구성을 위한 정적 메타데이터
 */
export interface WorkflowStepInputDefinition {
  /** `inputValues`에서 입력값을 식별할 때 사용하는 키 */
  key: string;
  /** 입력 필드에 표시할 이름 */
  label: string;
  /** 입력값이 없을 때 표시할 예시 문구 */
  placeholder?: string;
  /** 멀티라인 입력 UI 사용 여부 */
  multiline?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
}

/**
 * 다른 스텝에서 참조할 수 있는 출력 필드 정의
 * - 실제 출력값이 아닌 출력값의 이름과 접근 경로를 나타내는 정적 메타데이터
 */
interface WorkflowStepOutputDefinition {
  /** 출력 필드에 표시할 이름 */
  label: string;
  /**
   * 실행 결과 객체에서 값을 찾기 위한 경로
   * @example
   * `{ label: "Selector", path: "matches[0].selector" }`
   */
  path: string;
}

/**
 * 워크플로우 스텝 타입별 UI 및 입출력 구성을 위한 정의
 */
export interface WorkflowStepDefinition<
  K extends WorkflowStepType = WorkflowStepType,
> {
  /** 워크플로우 스텝 타입 */
  type: K;
  /** 워크플로우 스텝 타입이 담당하는 역할 */
  kind: WorkflowStepKindByType[K];
  /** 노드 팔레트와 UI에 표시할 기본 이름 */
  label: string;
  /** 워크플로우 스텝 타입에 대한 설명 */
  description: string;
  /** 스텝을 시각적으로 구분할 아이콘 컴포넌트 */
  icon: LucideIcon;
  /** 스텝 아이콘 등에 적용할 강조 색상 클래스 */
  accent: string;
  /** 사용자에게 입력받을 필드 목록 */
  inputs: WorkflowStepInputDefinition[];
  /** 다른 스텝에서 참조할 수 있는 출력 필드 목록 */
  outputs: WorkflowStepOutputDefinition[];
}

/**
 * React Flow 워크플로우 노드의 `data`에 저장되는 스텝 정보
 */
export type WorkflowStepNodeData = {
  /** 각 스텝 타입에 대응하는 노드 데이터 구조 */
  [K in WorkflowStepType]: {
    /** 워크플로우 스텝 타입 */
    type: K;
    /** 워크플로우에서 노드가 담당하는 상위 역할 */
    kind: WorkflowStepKindByType[K];
    /** 노드 인스턴스 이름 */
    title: string;
    /** 사용자가 에디터에 저장한 원본 입력값 */
    inputValues: Record<string, string>;
  };
}[WorkflowStepType];

/**
 * React Flow 캔버스에서 사용하는 `"step"` 타입의 워크플로우 노드
 */
export type WorkflowStepNode = Node<WorkflowStepNodeData, "step">;

/**
 * React Flow 노드와 엣지로 구성된 워크플로우 그래프
 */
export interface WorkflowGraph {
  /** 워크플로우를 구성하는 React Flow 노드 목록 */
  nodes: WorkflowStepNode[];
  /** React Flow 노드 사이의 연결 관계 목록 */
  edges: Edge[];
}

export type WorkflowNodeOutputs = Record<string, unknown>;

/**
 * 실행 콘솔에서 선택한 스텝의 식별 정보
 */
export interface RunStepSelection {
  /** 콘솔 선택 대상 종류 */
  kind: "step";
  /** Trigger.dev에서 생성한 워크플로우 실행 ID */
  runId: string;
  /** 해당 실행에서 선택한 React Flow 노드 ID */
  nodeId: string;
}

/**
 * 실행 콘솔에서 선택한 Browserbase 세션 리플레이의 식별 정보
 */
export interface RunReplaySelection {
  /** 콘솔 선택 대상 종류 */
  kind: "replay";
  /** 리플레이가 속한 Trigger.dev 워크플로우 실행 ID */
  runId: string;
}

/**
 * 실행 콘솔에서 선택할 수 있는 스텝 또는 리플레이 정보
 */
export type WorkflowConsoleSelection = RunStepSelection | RunReplaySelection;

/**
 * 워크플로우 실행 중인 개별 스텝의 상태와 입출력 정보
 */
export interface RunStep {
  /** 실행한 React Flow 노드 ID */
  nodeId: string;
  /** 워크플로우 스텝 타입 */
  type: WorkflowStepType;
  /** 노드 이름 */
  title: string;
  /** 해당 단계의 현재 실행 상태 */
  status: "pending" | "running" | "done" | "failed";
  /** 보간을 마친 후 실행기에 전달된 실제 입력값 */
  input?: Record<string, string>;
  /** 실행기가 반환한 결과. */
  output?: unknown;
  /** 단계 실행에 걸린 시간 */
  durationMs?: number;
  /** 실행 오류 메시지 */
  error?: string;
}
