"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { createWorkflowAction } from "@/features/workflows/actions";
import { WORKFLOW_MESSAGES } from "@/features/workflows/constants/workflow-messages";

export const CreateWorkflowButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      try {
        const { workflowId } = await createWorkflowAction();
        toast.success(WORKFLOW_MESSAGES.CREATE_SUCCESS);
        router.push(ROUTES.WORKFLOWS.DETAIL(workflowId));
      } catch {
        toast.error(WORKFLOW_MESSAGES.CREATE_ERROR);
      }
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleCreateWorkflow}
      className="gap-1.5 rounded-lg bg-slate-950 text-white hover:bg-slate-800"
    >
      <Plus data-icon="inline-start" aria-hidden />
      {isPending ? "워크플로우 생성 중..." : "워크플로우 추가"}
    </Button>
  );
};
