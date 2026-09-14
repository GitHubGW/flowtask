import { describe, expect, test } from "vitest";

import { createWorkflowName } from "./create-workflow-name";

describe("createWorkflowName", () => {
  test("UTC 시각을 한국 시간 형식으로 변환한다", () => {
    const createdAt = new Date("2026-01-01T14:11:00.000Z");
    const result = createWorkflowName(createdAt);

    expect(result).toBe("2026-01-01 23:11:00");
  });

  test("UTC 시각을 한국 시간으로 바꾸면 날짜가 하루 넘어가는 경우를 변환한다", () => {
    const createdAt = new Date("2026-01-01T15:00:00.000Z");
    const result = createWorkflowName(createdAt);

    expect(result).toBe("2026-01-02 00:00:00");
  });
});
