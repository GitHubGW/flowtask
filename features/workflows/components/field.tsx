import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { NodeField } from "@/features/workflows/types";

interface FieldProps {
  field: NodeField;
  value: string;
  onChange: (value: string) => void;
}

export const Field = ({ field, value, onChange }: FieldProps) => {
  if (field.multiline) {
    return (
      <Textarea
        id={field.key}
        value={value}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <Input
      id={field.key}
      value={value}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
