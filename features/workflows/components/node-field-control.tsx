import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { NodeField } from "@/features/workflows/types";

interface NodeFieldControlProps {
  field: NodeField;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

export const NodeFieldControl = ({
  field,
  value,
  onChange,
  onFocus,
}: NodeFieldControlProps) => {
  const Control = field.multiline ? Textarea : Input;

  return (
    <Control
      required={field.required}
      id={field.key}
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
      onFocus={onFocus}
    />
  );
};
