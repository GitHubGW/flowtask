"use server";

import { createWorkflow } from "@/features/workflows/data";
import type { helloWorldTask } from "@/trigger/example";
import { auth } from "@clerk/nextjs/server";
import { tasks } from "@trigger.dev/sdk";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createWorkflowAction = async (name: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No organization found");
  }

  const createdWorkflow = await createWorkflow(name, orgId);
  revalidatePath("/workflows", "layout");
  redirect(`/workflows/${createdWorkflow.id}`);
};

export const runWorkflowAction = async (workflowId: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No organization found");
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: `workflowId: ${workflowId}`,
  });

  return handle;
};
