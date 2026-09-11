export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CHOOSE_ORGANIZATION: "/choose-organization",
  PRICING: "/pricing",
  WORKFLOWS: {
    INDEX: "/workflows",
    DETAIL: (workflowId: string) => `/workflows/${workflowId}`,
  },
} as const;
