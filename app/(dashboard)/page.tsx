"use client";

import { Plus, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useTransition } from "react";
import { getRandomSlug } from "@/features/workflows/libs/get-random-slug";
import { createWorkflowAction } from "@/features/workflows/actions";

const DashboardPage = () => {
  const [isPending, startTransition] = useTransition();

  const handleCreateWorkflow = () => {
    startTransition(async () => {
      const randomSlug = getRandomSlug();
      await createWorkflowAction(randomSlug);
    });
  };

  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex flex-1 items-center justify-center p-6">
        <Empty className="border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Workflow aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="text-base font-semibold">
              워크플로우를 선택하세요
            </EmptyTitle>
            <EmptyDescription>
              워크플로우를 선택하거나 새로 생성하세요.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              disabled={isPending}
              onClick={handleCreateWorkflow}
              aria-label="새 워크플로우"
              className="gap-1.5"
            >
              <Plus data-icon="inline-start" aria-hidden />새 워크플로우
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
};

export default DashboardPage;
