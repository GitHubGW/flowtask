import { Check } from "lucide-react";

interface PlanFeaturesProps {
  features: readonly string[];
  title: string;
}

export const PlanFeatures = ({ features, title }: PlanFeaturesProps) => {
  return (
    <div>
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-5 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm leading-5 text-slate-600"
          >
            <Check
              className="mt-0.5 size-4 shrink-0 text-slate-950"
              strokeWidth={2.2}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
