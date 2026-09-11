import { Workflow } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CreateWorkflowButton } from "@/features/workflows/components/navigation/create-workflow-button";

const WorkflowsPage = () => {
  return (
    <section className="flex min-h-svh flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
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
            <CreateWorkflowButton />
          </EmptyContent>
        </Empty>
      </div>
    </section>
  );
};

export default WorkflowsPage;
