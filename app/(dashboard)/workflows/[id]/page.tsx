import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/queries";
import { WorkflowShell } from "@/features/workflows/components/workflow-shell";
import { Room } from "@/features/workflows/components/room";
import { ReactFlowProvider } from "@xyflow/react";

interface WorkflowDetailPageProps {
  params: Promise<{ id: string }>;
}

const WorkflowDetailPage = async ({ params }: WorkflowDetailPageProps) => {
  const { id } = await params;
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    notFound();
  }

  const foundWorkflow = orgId ? await getWorkflow(id, orgId) : null;

  if (!foundWorkflow) {
    notFound();
  }

  return (
    <ReactFlowProvider>
      <Room roomId={id}>
        <WorkflowShell workflowId={id} />
      </Room>
    </ReactFlowProvider>
  );
};

export default WorkflowDetailPage;
