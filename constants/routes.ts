export const ROUTES = {
  DASHBOARD: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  CHOOSE_ORGANIZATION: "/choose-organization",
  WORKFLOWS: {
    INDEX: "/workflows",
    DETAIL: (id: string) => `/workflows/${id}`,
  },
};
