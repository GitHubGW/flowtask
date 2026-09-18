import { Workflow } from "lucide-react";
import type { Metadata } from "next";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreateWorkflowButton } from "@/features/workflows/components/navigation/create-workflow-button";

export const metadata: Metadata = {
  title: "워크스페이스",
};

const WorkflowsPage = () => {
  return (
    <section className="flex min-h-svh flex-col bg-slate-50/70">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-sm font-medium text-slate-950">워크스페이스</h1>
      </header>
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <Empty className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-8 md:py-12">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="size-12 rounded-xl bg-violet-50 text-violet-600"
            >
              <Workflow aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="text-lg font-semibold text-slate-950">
              시작할 워크플로우를 선택하세요
            </EmptyTitle>
            <EmptyDescription className="max-w-xs leading-6 text-slate-500">
              왼쪽에서 기존 워크플로우를 열거나 새로 만들어보세요.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <CreateWorkflowButton />
          </EmptyContent>
        </Empty>
      </div>
    </section>
  );
};

export default WorkflowsPage;
