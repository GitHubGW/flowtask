import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getWorkflow } from "@/features/workflows/data";
import { WorkflowShell } from "@/features/workflows/components/workflow-shell";
import { Room } from "@/features/workflows/components/room";
import { liveblocks } from "@/libs/liveblocks";

interface WorkflowDetailPageProps {
  params: Promise<{ id: string }>;
}

const WorkflowDetailPage = async ({ params }: WorkflowDetailPageProps) => {
  const { id } = await params;
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  const foundWorkflow = orgId ? await getWorkflow(id, orgId) : null;

  if (!foundWorkflow) {
    notFound();
  }

  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: { [orgId]: ["room:write"] },
    metadata: { title: foundWorkflow.name },
  });

  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  );
};

export default WorkflowDetailPage;
