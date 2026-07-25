import Link from "next/link";
import { ArrowLeft, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const NotFound = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <main className="flex flex-1 items-center justify-center p-6">
        <Empty className="border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Workflow aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="text-base font-semibold">
              Workflow not found
            </EmptyTitle>
            <EmptyDescription>
              The workflow you are looking for does not exist or may have been
              deleted. Select another workflow from the sidebar or create a new
              one.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild className="gap-1.5" aria-label="Back to home">
              <Link href="/">
                <ArrowLeft data-icon="inline-start" aria-hidden />
                Back to home
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    </div>
  );
};

export default NotFound;
