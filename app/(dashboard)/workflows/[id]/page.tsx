import { auth } from "@clerk/nextjs/server";
import { auth as triggerAuth } from "@trigger.dev/sdk";
import { notFound, redirect } from "next/navigation";
import { getWorkflow } from "@/features/workflows/queries";
import { ReactFlowProvider } from "@xyflow/react";
import { ROUTES } from "@/constants/routes";
import { WorkflowRoomProvider } from "@/features/workflows/components/providers/workflow-room-provider";
import { WorkflowEditorLayout } from "@/features/workflows/components/editor/workflow-editor-layout";
import { WorkflowRunsProvider } from "@/features/workflows/components/providers/workflow-runs-provider";

interface WorkflowDetailPageProps {
  params: Promise<{ id: string }>;
}

const WorkflowDetailPage = async ({ params }: WorkflowDetailPageProps) => {
  const [{ id }, { isAuthenticated, orgId, redirectToSignIn }] =
    await Promise.all([params, auth()]);

  if (!isAuthenticated) {
    redirectToSignIn({ returnBackUrl: ROUTES.WORKFLOWS.DETAIL(id) });
  }

  if (!orgId) {
    redirect(ROUTES.CHOOSE_ORGANIZATION);
  }

  const workflow = await getWorkflow(id, orgId);

  if (!workflow) {
    notFound();
  }

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { tags: [`workflow:${id}`] } },
    expirationTime: "3h",
  });

  return (
    <WorkflowRunsProvider publicAccessToken={publicAccessToken}>
      <ReactFlowProvider>
        <WorkflowRoomProvider>
          <WorkflowEditorLayout />
        </WorkflowRoomProvider>
      </ReactFlowProvider>
    </WorkflowRunsProvider>
  );
};

export default WorkflowDetailPage;
