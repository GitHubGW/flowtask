import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/data";
import { WorkflowShell } from "@/features/workflows/components/workflow-shell";

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

  return <WorkflowShell workflowId={foundWorkflow.id} />;
};

export default WorkflowDetailPage;
