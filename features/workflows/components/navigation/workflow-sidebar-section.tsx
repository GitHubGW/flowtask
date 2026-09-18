"use client";

import { Loader2, Plus, Trash2, Workflow } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/routes";
import {
  createWorkflowAction,
  deleteWorkflowAction,
} from "@/features/workflows/actions";
import { WORKFLOW_MESSAGES } from "@/features/workflows/constants/workflow-messages";
import type { WorkflowRow } from "@/libs/db/schema";
import { cn } from "@/libs/utils";

interface WorkflowSidebarSectionProps {
  workflows: Pick<WorkflowRow, "id" | "name">[];
}

export const WorkflowSidebarSection = ({
  workflows,
}: WorkflowSidebarSectionProps) => {
  const pathname = usePathname();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const [workflowToDeleteId, setWorkflowToDeleteId] = useState<string | null>(
    null
  );
  const [isCreating, startCreating] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const router = useRouter();
  const workflowToDelete = workflows.find(
    (workflow) => workflow.id === workflowToDeleteId
  );

  const isWorkflowActive = (workflowId: string) => {
    return pathname === ROUTES.WORKFLOWS.DETAIL(workflowId);
  };

  const handleWorkflowSelect = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleCreateWorkflow = () => {
    startCreating(async () => {
      try {
        const { workflowId } = await createWorkflowAction();
        toast.success(WORKFLOW_MESSAGES.CREATE_SUCCESS);
        setOpenMobile(false);
        router.push(ROUTES.WORKFLOWS.DETAIL(workflowId));
      } catch {
        toast.error(WORKFLOW_MESSAGES.CREATE_ERROR);
      }
    });
  };

  const handleDeleteWorkflow = () => {
    if (!workflowToDelete) {
      return;
    }

    startDeleting(async () => {
      try {
        await deleteWorkflowAction(workflowToDelete.id);
        setWorkflowToDeleteId(null);
        toast.success(WORKFLOW_MESSAGES.DELETE_SUCCESS);
        router.push(ROUTES.WORKFLOWS.INDEX);
      } catch {
        toast.error(WORKFLOW_MESSAGES.DELETE_ERROR);
      }
    });
  };

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(ROUTES.WORKFLOWS.INDEX)}
                    tooltip="워크플로우"
                    aria-label="워크플로우"
                    disabled={isCreating}
                  >
                    <Workflow />
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  align="start"
                  sideOffset={12}
                  className="w-64 gap-0 p-1"
                >
                  <button
                    type="button"
                    disabled={isCreating}
                    onClick={handleCreateWorkflow}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {isCreating ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Plus className="size-4 shrink-0" aria-hidden />
                    )}
                    {isCreating ? "워크플로우 생성 중..." : "워크플로우 추가"}
                  </button>
                  <div className="my-1 border-t" />
                  <ul className="flex max-h-80 flex-col overflow-y-auto">
                    {workflows.map((workflow) => (
                      <li key={workflow.id}>
                        <Link
                          href={ROUTES.WORKFLOWS.DETAIL(workflow.id)}
                          onClick={handleWorkflowSelect}
                          className={cn(
                            "flex w-full items-center truncate rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                            isWorkflowActive(workflow.id) &&
                              "bg-accent font-medium text-accent-foreground"
                          )}
                          aria-current={
                            isWorkflowActive(workflow.id) ? "page" : undefined
                          }
                        >
                          {workflow.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="gap-1">
      <SidebarGroupLabel className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
        워크플로우
      </SidebarGroupLabel>
      <SidebarGroupAction
        title="워크플로우 추가"
        onClick={handleCreateWorkflow}
        disabled={isCreating}
      >
        {isCreating ? <Loader2 className="animate-spin" /> : <Plus />}
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {workflows.map((workflow) => {
            const isActive = isWorkflowActive(workflow.id);

            return (
              <SidebarMenuItem key={workflow.id}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "h-9 rounded-lg px-1.5 text-slate-600 hover:bg-white hover:text-slate-950 data-[active=true]:bg-white data-[active=true]:text-slate-950 data-[active=true]:shadow-sm",
                    isActive && "pr-9"
                  )}
                >
                  <Link
                    href={ROUTES.WORKFLOWS.DETAIL(workflow.id)}
                    onClick={handleWorkflowSelect}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Workflow className="size-4 text-slate-400" aria-hidden />
                    <span>{workflow.name}</span>
                  </Link>
                </SidebarMenuButton>
                {isActive ? (
                  <SidebarMenuAction
                    type="button"
                    title="워크플로우 삭제"
                    aria-label={`${workflow.name} 워크플로우 삭제`}
                    onClick={() => setWorkflowToDeleteId(workflow.id)}
                    className="top-2 right-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 aria-hidden />
                  </SidebarMenuAction>
                ) : null}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>

      <AlertDialog
        open={Boolean(workflowToDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setWorkflowToDeleteId(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-red-50 text-red-600">
              <Trash2 aria-hidden />
            </AlertDialogMedia>
            <AlertDialogTitle>워크플로우를 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              워크플로우가 영구적으로 삭제돼요.
              <br />이 작업은 되돌릴 수 없어요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();
                handleDeleteWorkflow();
              }}
            >
              {isDeleting ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : null}
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarGroup>
  );
};
