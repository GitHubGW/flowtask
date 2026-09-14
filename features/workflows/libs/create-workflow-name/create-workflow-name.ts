const dateTimeFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Seoul",
  dateStyle: "short",
  timeStyle: "medium",
});

/**
 * 생성 시각을 기준으로 워크플로우 기본 이름 생성
 *
 * @param createdAt 워크플로우 생성 시각
 * @returns `2026-01-01 23:11:00` 형태의 이름
 */
export const createWorkflowName = (createdAt: Date = new Date()) => {
  return `${dateTimeFormatter.format(createdAt)}`;
};
