"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { deleteWorkflowAction } from "@/features/workflows/actions";
import { MouseEvent, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";

export const WorkflowActionsMenu = () => {
  const { id } = useParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();
  const router = useRouter();

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (isDeleting) {
      return;
    }

    setIsDeleteDialogOpen(open);
  };

  const handleDeleteWorkflow = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    startDeleteTransition(async () => {
      try {
        await deleteWorkflowAction(id);
        toast.success("워크플로우를 삭제했습니다.");
        router.push(ROUTES.WORKFLOWS.INDEX);
      } catch {
        toast.error("워크플로우 삭제에 실패했습니다.");
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="워크플로우 메뉴 열기"
          >
            <MoreHorizontal aria-hidden />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-48">
          <DropdownMenuItem
            variant="destructive"
            className="text-xs [&_svg:not([class*='size-'])]:size-3.5"
            onSelect={handleOpenDeleteDialog}
          >
            <Trash2 aria-hidden />
            워크플로우 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>워크플로우를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              워크플로우와 실시간 협업 데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteWorkflow}
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
