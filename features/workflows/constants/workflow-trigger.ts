export const WORKFLOW_TASK_ID = "run-workflow-task";

export const WORKFLOW_RUN_TAGS = {
  workflow: (workflowId: string) => `workflow:${workflowId}`,
  organization: (organizationId: string) => `organization:${organizationId}`,
} as const;
