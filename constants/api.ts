export const API = {
  LIVEBLOCKS_AUTH: "/api/liveblocks-auth",
  USER: "/api/user",
  REPLAY_DETAIL: (sessionId: string) => `/api/replays/${sessionId}`,
} as const;
