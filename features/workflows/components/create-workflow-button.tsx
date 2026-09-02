"use client";

import { useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createWorkflowAction } from "@/features/workflows/actions";
import { toast } from "sonner";

export const CreateWorkflowButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      try {
        await createWorkflowAction();
        toast.success("워크플로우를 생성했습니다.");
      } catch {
        toast.error("워크플로우 생성에 실패했습니다.");
      }
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
