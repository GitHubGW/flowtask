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
import { ROUTES } from "@/constants/routes";

const NotFound = () => {
  return (
    <section className="flex min-h-svh flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
        <Empty className="border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Workflow aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="text-base font-semibold">
              워크플로우를 찾을 수 없습니다
            </EmptyTitle>
            <EmptyDescription>
              다른 워크플로우를 선택하거나 새로 생성하세요.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild className="gap-1.5">
              <Link href={ROUTES.WORKFLOWS.INDEX}>
                <ArrowLeft data-icon="inline-start" aria-hidden />
                돌아가기
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  );
};

export default NotFound;
