const workflowNameFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Seoul",
  dateStyle: "short",
  timeStyle: "medium",
});

/**
 * 생성 시각을 기준으로 워크플로우 기본 이름 생성
 *
 * @param createdAt 워크플로우 생성 시각
 * @returns `워크플로우 2026-09-11 23:11` 형태의 이름
 */
export const createWorkflowName = (createdAt: Date = new Date()) => {
  return `${workflowNameFormatter.format(createdAt)}`;
};
