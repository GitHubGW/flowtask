import type {
  WorkflowStepDefinition,
  WorkflowStepType,
} from "@/features/workflows/types";
import {
  Bot,
  Globe,
  Mail,
  MousePointerClick,
  Play,
  ScanText,
  Search,
} from "lucide-react";

type WorkflowStepRegistry = {
  [K in WorkflowStepType]: WorkflowStepDefinition<K>;
};

/**
 * 워크플로우 스텝 타입과 UI/입출력 정의를 연결하는 매핑 객체
 */
export const workflowStepRegistry = {
  start: {
    type: "start",
    kind: "trigger",
    label: "시작",
    description: "워크플로우 실행을 시작해요.",
    icon: Play,
    accent: "bg-amber-500 text-white",
    inputs: [],
    outputs: [],
  },
  "open-url": {
    type: "open-url",
    kind: "action",
    label: "URL 열기",
    description: "지정한 웹페이지를 열어요.",
    icon: Globe,
    accent: "bg-blue-500 text-white",
    inputs: [
      {
        key: "url",
        label: "URL",
        placeholder: "https://google.com",
        required: true,
      },
    ],
    outputs: [
      { label: "Title", path: "title" },
      { label: "URL", path: "url" },
    ],
  },
  observe: {
    type: "observe",
    kind: "action",
    label: "요소 찾기",
    description: "페이지에서 실행 가능한 요소를 찾아요.",
    icon: Search,
    accent: "bg-cyan-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "실행할 동작",
        placeholder: "로그인 버튼을 찾으세요.",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { label: "Selector", path: "matches[0].selector" },
      { label: "Description", path: "matches[0].description" },
      { label: "Matches", path: "matches" },
    ],
  },
  extract: {
    type: "extract",
    kind: "action",
    label: "정보 추출",
    description: "페이지에서 필요한 정보를 추출해요.",
    icon: ScanText,
    accent: "bg-orange-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "실행할 동작",
        placeholder: "상품 가격을 추출하세요.",
        multiline: true,
        required: true,
      },
    ],
    outputs: [{ label: "Extraction", path: "extraction" }],
  },
  act: {
    type: "act",
    kind: "action",
    label: "동작 실행",
    description: "페이지에서 지정한 동작을 수행해요.",
    icon: MousePointerClick,
    accent: "bg-violet-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "실행할 동작",
        placeholder: "시작하기 버튼을 클릭하세요.",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { label: "Success", path: "success" },
      { label: "Message", path: "message" },
      { label: "URL", path: "url" },
    ],
  },
  "send-email": {
    type: "send-email",
    kind: "action",
    label: "이메일 전송",
    description: "작성한 내용을 이메일로 전송해요.",
    icon: Mail,
    accent: "bg-emerald-500 text-white",
    inputs: [
      {
        key: "to",
        label: "받는 사람",
        placeholder: "test@gmail.com",
        required: true,
      },
      {
        key: "subject",
        label: "제목",
        placeholder: "안녕하세요!",
        required: true,
      },
      {
        key: "html",
        label: "내용",
        placeholder: "메시지를 작성하세요.",
        required: true,
        multiline: true,
      },
    ],
    outputs: [{ label: "Email ID", path: "id" }],
  },
  agent: {
    type: "agent",
    kind: "action",
    label: "AI 에이전트",
    description: "AI가 여러 단계의 브라우저 작업을 수행해요.",
    icon: Bot,
    accent: "bg-fuchsia-500 text-white",
    inputs: [
      {
        key: "instruction",
        label: "실행할 동작",
        placeholder: "회원가입 폼을 작성하고 제출하세요.",
        multiline: true,
        required: true,
      },
    ],
    outputs: [
      { label: "Success", path: "success" },
      { label: "Message", path: "message" },
      { label: "Completed", path: "completed" },
    ],
  },
} satisfies WorkflowStepRegistry;
