import type { LucideIcon } from "lucide-react";

import { cn } from "@/libs/utils";

interface WorkflowDemoNodeProps {
  className?: string;
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  meta?: string;
  subtitle: string;
}

export const WorkflowDemoNode = ({
  className,
  icon: Icon,
  iconClassName,
  label,
  meta,
  subtitle,
}: WorkflowDemoNodeProps) => {
  return (
    <div
      className={cn(
        "absolute z-10 flex w-52 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm",
        className
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg text-white",
          iconClassName
        )}
      >
        <Icon className="size-4.5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold text-slate-900">
          {label}
        </span>
        <span className="block truncate text-xs text-slate-500">
          {subtitle}
        </span>
      </span>
      {meta ? (
        <span className="rounded-md bg-slate-100 px-1.5 py-1 text-[9px] font-bold tracking-wide text-slate-500">
          {meta}
        </span>
      ) : null}
    </div>
  );
};
