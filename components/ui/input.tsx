import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/libs/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-lg border border-input text-foreground transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-background shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30",
        filled:
          "bg-muted/70 shadow-none focus-visible:border-brand focus-visible:ring-brand/15 dark:bg-muted/50",
      },
      size: {
        small: "h-8 px-2.5 py-1 text-sm file:h-6",
        medium: "h-10 px-3 py-2 text-sm file:h-7",
        large: "h-11 px-3.5 py-2.5 text-base file:h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
);

function Input({
  className,
  variant = "default",
  size = "medium",
  type,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      data-size={size}
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
