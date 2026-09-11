export const pricingQuestions = [
  {
    question: "무료 플랜에서는 어떤 기능을 사용할 수 있나요?",
    answer:
      "Free 플랜에서는 Agent 노드를 제외한 기본 자동화 노드로 워크플로우를 구성하고 실행할 수 있어요. 단계별 입력과 출력, 실행 기록도 함께 확인할 수 있어요.",
  },
  {
    question: "Pro 플랜은 언제 필요한가요?",
    answer:
      "자연어로 복잡한 브라우저 작업을 수행하는 AI Agent 노드가 필요할 때 적합해요. 브라우저 세션 리플레이처럼 실행 과정을 자세히 확인하는 기능도 함께 사용할 수 있어요.",
  },
  {
    question: "Pro 플랜은 어떻게 결제되나요?",
    answer:
      "Pro 플랜은 월간 구독 방식으로 결제돼요. 결제를 완료하면 현재 선택한 조직에 Pro 기능이 적용되고, 해당 조직의 워크플로우에서 이용할 수 있어요.",
  },
  {
    question: "플랜은 사용자마다 따로 적용되나요?",
    answer:
      "아니요. 요금제는 개인 계정이 아니라 현재 선택한 조직을 기준으로 적용돼요. 같은 조직에 참여한 구성원은 조직에 적용된 플랜의 기능을 함께 사용할 수 있어요.",
  },
  {
    question: "Ultimate 플랜은 어떤 조직을 위한 요금제인가요?",
    answer:
      "Ultimate 플랜은 현재 준비 중이에요. 정식 제공 이후에는 더 많은 실행량이나 전용 실행 환경, 조직에 맞춘 운영 방식이 필요한 팀을 위한 맞춤형 플랜으로 제공할 예정이에요.",
  },
] as const;

export const freePlanFeatures = [
  "Agent를 제외한 기본 자동화 노드",
  "워크플로우 편집과 실행",
  "실행 기록과 단계별 결과 확인",
] as const;

export const proPlanFeatures = [
  "Free 플랜의 모든 기능",
  "자연어로 작업하는 AI Agent 노드",
  "브라우저 세션 리플레이",
] as const;

export const ultimatePlanFeatures = [
  "Pro 플랜의 모든 기능",
  "조직 규모에 맞춘 실행량",
  "전용 실행 환경 구성",
  "신규 기능 우선 이용",
  "전담 기술 지원",
] as const;
