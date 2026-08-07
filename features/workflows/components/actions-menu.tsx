import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { deleteWorkflowAction } from "@/features/workflows/actions";
import { useTransition } from "react";

interface ActionsMenuProps {
  workflowId: string;
}

export const ActionsMenu = ({ workflowId }: ActionsMenuProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteWorkflow = async () => {
    startTransition(async () => {
      await deleteWorkflowAction(workflowId);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuItem
          disabled={isPending}
          variant="destructive"
          className="text-xs [&_svg:not([class*='size-'])]:size-3.5"
          onSelect={handleDeleteWorkflow}
        >
          <Trash2 />
          워크플로우 삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
