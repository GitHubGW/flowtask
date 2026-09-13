import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/libs/utils";

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent font-semibold whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground [a]:hover:bg-primary/85",
        brand: "bg-brand/10 text-brand [a]:hover:bg-brand/15",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        success: "bg-success-subtle text-success [a]:hover:bg-success/15",
        warning: "bg-warning-subtle text-warning [a]:hover:bg-warning/15",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border bg-background text-foreground [a]:hover:bg-muted",
      },
      size: {
        small:
          "h-4 gap-0.5 px-1.5 text-[10px] has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&>svg]:size-2.5",
        medium:
          "h-5 gap-1 px-2 text-[11px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3",
        large:
          "h-6 gap-1.5 px-3 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

const Badge = ({
  className,
  variant = "primary",
  size = "medium",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
