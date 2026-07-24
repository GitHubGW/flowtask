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

const HomePage = () => {
  const handleNewWorkflow = () => {
    // TODO: open create workflow flow
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
              No workflow selected
            </EmptyTitle>
            <EmptyDescription>
              Select a workflow from the sidebar or create a new one to get
              started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={handleNewWorkflow}
              aria-label="New workflow"
              className="gap-1.5"
            >
              <Plus data-icon="inline-start" aria-hidden />
              New workflow
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
};

export default HomePage;
