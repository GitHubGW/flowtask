import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";

const textareaVariants = cva(
  "field-sizing-content w-full rounded-lg border border-input text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "bg-background shadow-xs focus-visible:border-ring focus-visible:ring-ring/50",
        filled:
          "bg-muted/70 shadow-none focus-visible:border-brand focus-visible:ring-brand/15",
      },
      size: {
        small: "min-h-16 px-2.5 py-2 text-sm",
        medium: "min-h-24 px-3 py-2.5 text-sm",
        large: "min-h-32 px-3.5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
);

const Textarea = ({
  className,
  variant = "default",
  size = "medium",
  ...props
}: React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants>) => {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      data-size={size}
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Textarea, textareaVariants };
