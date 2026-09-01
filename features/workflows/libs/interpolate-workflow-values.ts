import { getProperty } from "dot-prop";

type WorkflowNodeOutputs = Record<string, unknown>;

const INTERPOLATION_PATTERN = /{{\s*([^{}]+?)\s*}}/g;

const formatOutputValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value) ?? "";
  }

  return String(value);
};

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
