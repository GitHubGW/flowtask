interface WorkflowPanelSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const WorkflowPanelSection = ({
  title,
  icon,
  children,
}: WorkflowPanelSectionProps) => {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-12 items-center gap-2 border-b border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950">
        {icon}
        {title}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </section>
  );
};
