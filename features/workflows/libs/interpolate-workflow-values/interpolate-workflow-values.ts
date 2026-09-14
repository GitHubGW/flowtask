import { getProperty } from "dot-prop";

import type { WorkflowNodeOutputs } from "@/features/workflows/types";

const INTERPOLATION_PATTERN = /{{\s*([^{}]+?)\s*}}/g;

const formatOutputValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

/**
 * 출력 참조 표현식을 실제 값으로 변환하는 함수
 *
 * @param text - 출력 참조 표현식이 포함된 문자열
 * @param outputs - 노드 ID별 워크플로우 실행 결과
 * @returns 출력 참조 표현식이 실제 값으로 변환된 문자열
 */
export const interpolateWorkflowValues = (
  text: string,
  outputs: WorkflowNodeOutputs
) => {
  return text.replace(INTERPOLATION_PATTERN, (_, expression: string) => {
    const [nodeId, ...outputPathParts] = expression.trim().split(".");

    if (!nodeId || outputPathParts.length === 0) {
      return "";
    }

    const outputPath = outputPathParts.join(".").trim();
    const outputValue = getProperty(outputs[nodeId.trim()], outputPath);
    return formatOutputValue(outputValue);
  });
};
