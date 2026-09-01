"use client";

import { useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWorkflowAction } from "@/features/workflows/actions";

export const CreateWorkflowButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      await createWorkflowAction();
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleCreateWorkflow}
      className="gap-1.5"
    >
      <Plus data-icon="inline-start" aria-hidden />
      {isPending ? "워크플로우 생성 중..." : "워크플로우 추가"}
    </Button>
  );
};
