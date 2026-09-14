import {
  Bot,
  CirclePlay,
  History,
  MousePointerClick,
  Radio,
  Users,
} from "lucide-react";

export const homeHighlights = [
  {
    title: "브라우저 업무를 한곳에서",
    description:
      "URL 열기부터 정보 추출, 이메일 전송까지 여러 작업을 하나의 흐름으로 연결하세요.",
  },
  {
    title: "직관적인 노드 편집",
    description:
      "필요한 단계를 캔버스에 추가하고 서로 연결해 원하는 자동화 흐름을 빠르게 완성하세요.",
  },
  {
    title: "모든 실행 과정을 확인",
    description:
      "단계별 상태와 입력·출력, 실행 시간, 브라우저 리플레이까지 한눈에 확인하세요.",
  },
] as const;

export const homeCapabilities = [
  {
    title: "간편한 실행과 중지",
    description:
      "원하는 시점에 워크플로우를 실행하고, 필요할 때 바로 중지할 수 있어요.",
    icon: CirclePlay,
    type: "run",
  },
  {
    title: "단계별 입력 설정",
    description: "각 단계에 필요한 입력값을 간편하게 설정할 수 있어요.",
    icon: MousePointerClick,
    type: "form",
  },
  {
    title: "브라우저 자동화",
    description:
      "URL 열기, 요소 찾기, 동작 실행, 정보 추출 등의 작업을 노드로 연결해요.",
    icon: Bot,
    type: "automation",
  },
  {
    title: "실시간 공동 편집",
    description: "같은 조직의 구성원과 워크플로우를 실시간으로 함께 편집해요.",
    icon: Users,
    type: "collaboration",
  },
  {
    title: "실행 기록과 상세 정보",
    description:
      "이전 실행 기록을 시간순으로 살펴보고 각 단계의 결과를 확인해요.",
    icon: History,
    type: "history",
  },
  {
    title: "브라우저 세션 리플레이",
    description: "자동화가 브라우저에서 실행된 과정을 영상으로 다시 확인해요.",
    icon: Radio,
    type: "replay",
  },
] as const;

export const homeQuestions = [
  {
    question: "어떤 브라우저 작업을 자동화할 수 있나요?",
    answer:
      "웹페이지 접속, 요소 클릭, 정보 추출, 이메일 전송 등 다양한 작업을 자동화할 수 있어요. Agent 노드에 원하는 작업을 자연어로 입력하면 여러 단계의 브라우저 작업도 하나의 흐름으로 실행할 수 있어요.",
  },
  {
    question: "코드를 작성하지 않아도 워크플로우를 만들 수 있나요?",
    answer:
      "필요한 노드를 캔버스에 추가하고 원하는 순서대로 연결한 뒤, 각 단계에 필요한 정보만 설정하면 돼요. 이전 단계의 결과를 다음 단계에서 활용해 여러 작업이 이어지는 자동화 흐름도 만들 수 있어요.",
  },
  {
    question: "다른 사람과 같은 워크플로우를 함께 편집할 수 있나요?",
    answer:
      "같은 조직의 사용자와 워크플로우를 함께 편집할 수 있어요. 누군가 노드를 추가하거나 이동하고 연결을 변경하면 변경된 내용이 다른 사용자의 화면에도 실시간으로 반영돼요.",
  },
  {
    question: "워크플로우 실행에 실패하면 원인을 확인할 수 있나요?",
    answer:
      "실행 기록에서 문제가 발생한 단계를 확인하고, 해당 단계의 입력값과 출력값, 실행 시간, 오류 메시지를 함께 살펴볼 수 있어요. 이전 실행 기록도 남아 있어 정상적으로 실행됐을 때와 비교하며 원인을 찾을 수 있어요.",
  },
  {
    question: "자동화가 브라우저에서 실행된 과정을 다시 볼 수 있나요?",
    answer:
      "브라우저 리플레이가 제공되는 실행은 실제 브라우저에서 작업이 진행된 과정을 다시 볼 수 있어요. 워크플로우가 의도한 순서대로 동작했는지 확인하거나, 실행 중 문제가 발생한 지점을 찾을 때 활용할 수 있어요.",
  },
] as const;
