import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/data";
import { WorkflowShell } from "@/features/workflows/components/workflow-shell";
import { Room } from "@/features/workflows/components/room";

interface WorkflowDetailPageProps {
  params: Promise<{ id: string }>;
}

const WorkflowDetailPage = async ({ params }: WorkflowDetailPageProps) => {
  const { id } = await params;
  const { orgId } = await auth();
  const foundWorkflow = orgId ? await getWorkflow(id, orgId) : null;

  if (!foundWorkflow) {
    notFound();
  }

  return (
    <Room roomId={foundWorkflow.id}>
      <WorkflowShell workflowId={foundWorkflow.id} />
    </Room>
  );
};

export default WorkflowDetailPage;
