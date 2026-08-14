"use server";

import { ERROR_MESSAGES } from "@/constants/error-messages";
import { ROUTES } from "@/constants/routes";
import {
  createWorkflow,
  deleteWorkflow,
  updateWorkflowGraph,
} from "@/features/workflows/queries";
import type { runWorkflowTask } from "@/features/workflows/tasks/run-workflow";
import { WorkflowGraph } from "@/libs/db/schema";
import { liveblocks } from "@/libs/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { runs, tasks } from "@trigger.dev/sdk";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 워크플로우 생성
 *
 * @param name 워크플로우 이름
 */
export const createWorkflowAction = async (name: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  const createdWorkflow = await createWorkflow(name, orgId);
  await liveblocks.createRoom(createdWorkflow.id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: { [orgId]: ["room:write"] },
    metadata: { title: createdWorkflow.name },
  });

  revalidatePath(ROUTES.WORKFLOWS.INDEX, "layout");
  redirect(ROUTES.WORKFLOWS.DETAIL(createdWorkflow.id));
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

  await deleteWorkflow(workflowId, orgId);
  await liveblocks.deleteRoom(workflowId);

  revalidatePath(ROUTES.WORKFLOWS.INDEX, "layout");
  redirect(ROUTES.DASHBOARD);
};

/**
 * 워크플로우 실행
 *
 * @param workflowId 워크플로우 ID
 * @param graph 워크플로우 그래프
 */
export const runWorkflowAction = async (
  workflowId: string,
  graph: WorkflowGraph
) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error(ERROR_MESSAGES.NO_ORGANIZATION_FOUND);
  }

  await updateWorkflowGraph({ id: workflowId, organizationId: orgId, graph });

  const handle = await tasks.trigger<typeof runWorkflowTask>(
    "run-workflow",
    { workflowId, organizationId: orgId },
    { tags: [`workflow:${workflowId}`] }
  );

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
