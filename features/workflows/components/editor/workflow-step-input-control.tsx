import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { WorkflowStepInputDefinition } from "@/features/workflows/types";

interface WorkflowStepInputControlProps {
  input: WorkflowStepInputDefinition;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

export const WorkflowStepInputControl = ({
  input,
  value,
  onChange,
  onFocus,
}: WorkflowStepInputControlProps) => {
  const Control = input.multiline ? Textarea : Input;

  return (
    <Control
      variant="filled"
      size="medium"
      required={input.required}
      id={input.key}
      value={value}
      placeholder={input.placeholder}
      onChange={(event) => onChange(event.target.value)}
      onFocus={onFocus}
    />
  );
};
