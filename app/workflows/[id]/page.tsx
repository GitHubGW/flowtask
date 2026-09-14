import { auth as clerkAuth } from "@clerk/nextjs/server";
import { auth as triggerAuth } from "@trigger.dev/sdk";
import { ReactFlowProvider } from "@xyflow/react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { WorkflowEditorLayout } from "@/features/workflows/components/editor/workflow-editor-layout";
import { WorkflowRoomProvider } from "@/features/workflows/components/providers/workflow-room-provider";
import { WorkflowRunsProvider } from "@/features/workflows/components/providers/workflow-runs-provider";
import { WORKFLOW_RUN_TAGS } from "@/features/workflows/constants/workflow-trigger";
import { getWorkflow } from "@/features/workflows/queries";

const UUID_PATTERN = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export const metadata: Metadata = {
  title: "워크플로우",
};

interface WorkflowDetailPageProps {
  params: Promise<{ id: string }>;
}

const WorkflowDetailPage = async ({ params }: WorkflowDetailPageProps) => {
  const [{ id }, { isAuthenticated, orgId, redirectToSignIn }] =
    await Promise.all([params, clerkAuth()]);

  if (!isAuthenticated) {
    redirectToSignIn({ returnBackUrl: ROUTES.WORKFLOWS.DETAIL(id) });
  }

  if (!orgId) {
    redirect(ROUTES.CHOOSE_ORGANIZATION);
  }

  if (!UUID_PATTERN.test(id)) {
    notFound();
  }

  const workflow = await getWorkflow(id, orgId);

  if (!workflow) {
    notFound();
  }

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { tags: [WORKFLOW_RUN_TAGS.workflow(id)] } },
    expirationTime: "3h",
  });

  return (
    <WorkflowRunsProvider publicAccessToken={publicAccessToken}>
      <ReactFlowProvider>
        <WorkflowRoomProvider>
          <WorkflowEditorLayout workflowName={workflow.name} />
        </WorkflowRoomProvider>
      </ReactFlowProvider>
    </WorkflowRunsProvider>
  );
};

export default WorkflowDetailPage;
