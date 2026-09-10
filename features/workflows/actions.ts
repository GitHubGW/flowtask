"use server";

import { ERROR_MESSAGES } from "@/constants/error-messages";
import { REVALIDATION_PATHS } from "@/constants/revalidation-paths";
import { createWorkflowName } from "@/features/workflows/libs/create-workflow-name";
import {
  createWorkflow,
  deleteWorkflow,
  updateWorkflowGraph,
} from "@/features/workflows/queries";
import type { runWorkflowTask } from "@/features/workflows/tasks/run-workflow/run-workflow-task";
import type { WorkflowGraph } from "@/features/workflows/types";
import { liveblocks } from "@/libs/liveblocks";
import { auth } from "@clerk/nextjs/server";
import * as Sentry from "@sentry/nextjs";
import { runs, tasks } from "@trigger.dev/sdk";
import { revalidatePath } from "next/cache";

/**
 * 워크플로우 생성
 *
 * @returns 생성된 워크플로우 ID
 */
export const createWorkflowAction = async () => {
  const { orgId, has } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  if (!has({ plan: "pro" })) {
    throw new Error(ERROR_MESSAGES.PRO_PLAN_REQUIRED);
  }

  const workflowName = createWorkflowName();
  const createdWorkflow = await createWorkflow(workflowName, orgId);
  await liveblocks.createRoom(createdWorkflow.id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: { [orgId]: ["room:write"] },
    metadata: { title: createdWorkflow.name },
  });

  revalidatePath(REVALIDATION_PATHS.DASHBOARD_LAYOUT, "layout");

  Sentry.logger.info("워크플로우 생성", {
    "workflow.id": createdWorkflow.id,
    "organization.id": orgId,
  });

  return { workflowId: createdWorkflow.id };
};

/**
 * 워크플로우 삭제
 *
 * @param workflowId 워크플로우 ID
 */
export const deleteWorkflowAction = async (workflowId: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const deletedWorkflow = await deleteWorkflow(workflowId, orgId);

  if (!deletedWorkflow) {
    throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
  }

  await liveblocks.deleteRoom(deletedWorkflow.id);

  revalidatePath(REVALIDATION_PATHS.DASHBOARD_LAYOUT, "layout");

  Sentry.logger.info("워크플로우 삭제", {
    "workflow.id": deletedWorkflow.id,
    "organization.id": orgId,
  });
};

/**
 * 워크플로우 실행
 *
 * @param workflowId 워크플로우 ID
 * @param graph 워크플로우 그래프
 * @returns 실행 작업 핸들
 */
export const runWorkflowAction = async (
  workflowId: string,
  graph: WorkflowGraph
) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const updatedWorkflow = await updateWorkflowGraph({
    workflowId,
    organizationId: orgId,
    graph,
  });

  if (!updatedWorkflow) {
    throw new Error(ERROR_MESSAGES.NO_WORKFLOW_FOUND);
  }

  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow-task",
    { workflowId, organizationId: orgId, graph },
    { tags: [`workflow:${workflowId}`] }
  );

  Sentry.logger.info("워크플로우 실행 트리거", {
    "workflow.id": workflowId,
    "organization.id": orgId,
    "trigger.run_id": handle.id,
    "workflow.node_count": graph.nodes.length,
  });

  return handle;
};

/**
 * 워크플로우 실행 취소
 *
 * @param runId 실행 ID
 */
export const cancelRunWorkflowAction = async (runId: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  await runs.cancel(runId);
};
