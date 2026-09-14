import { describe, expect, test } from "vitest";

import { interpolateWorkflowValues } from "./interpolate-workflow-values";

describe("interpolateWorkflowValues", () => {
  test("출력 참조 표현식을 실제 출력값으로 변환한다", () => {
    const outputs = {
      "open-url": { url: "https://react.dev" },
    };
    const result = interpolateWorkflowValues(
      "{{ open-url.url }} 페이지를 열어 주세요.",
      outputs
    );

    expect(result).toBe("https://react.dev 페이지를 열어 주세요.");
  });

  test("중첩된 객체와 배열의 출력값을 변환한다", () => {
    const outputs = {
      observe: {
        matches: [{ selector: "button[data-action='submit']" }],
      },
    };
    const result = interpolateWorkflowValues(
      "{{ observe.matches[0].selector }} 요소를 클릭해 주세요.",
      outputs
    );

    expect(result).toBe("button[data-action='submit'] 요소를 클릭해 주세요.");
  });

  test("객체와 배열 출력값을 JSON 문자열로 변환한다", () => {
    const outputs = {
      extract: {
        result: { title: "React", tags: ["UI", "Library"] },
      },
    };
    const result = interpolateWorkflowValues(
      "결과: {{ extract.result }}",
      outputs
    );

    expect(result).toBe('결과: {"title":"React","tags":["UI","Library"]}');
  });

  test("출력 경로가 없는 참조 표현식을 빈 문자열로 변환한다", () => {
    const outputs = {
      extract: { result: "React" },
    };
    const result = interpolateWorkflowValues("결과: {{ extract }}", outputs);

    expect(result).toBe("결과: ");
  });

  test("출력값이 없으면 빈 문자열로 변환한다", () => {
    const outputs = {
      extract: { result: null },
    };

    const result = interpolateWorkflowValues(
      "결과: {{ extract.result }}, 누락: {{ extract.missing }}",
      outputs
    );

    expect(result).toBe("결과: , 누락: ");
  });

  test("출력 참조 표현식이 없으면 원래 문자열을 유지한다", () => {
    const result = interpolateWorkflowValues("페이지를 열어 주세요.", {});

    expect(result).toBe("페이지를 열어 주세요.");
  });
});
