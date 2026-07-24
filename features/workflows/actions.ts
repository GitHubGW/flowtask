"use server";

import { createWorkflow } from "@/features/workflows/data";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createWorkflowAction = async (name: string) => {
  const { orgId } = await auth();

  if (!orgId) {
    throw new Error("No organization found");
  }

  const createdWorkflow = await createWorkflow(name, orgId);
  revalidatePath("/workflows", "layout");
  redirect(`/workflows/${createdWorkflow.name}`);
};
