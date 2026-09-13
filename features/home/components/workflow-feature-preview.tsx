import { cn } from "@/libs/utils";
import { Check, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WorkflowFeaturePreviewProps {
  type: "run" | "form" | "automation" | "collaboration" | "history" | "replay";
}

export const WorkflowFeaturePreview = ({
  type,
}: WorkflowFeaturePreviewProps) => {
  if (type === "run") {
    return (
      <div className="mx-auto mt-8 w-[88%] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          워크플로우 실행
          <Badge variant="success" size="large">
            완료
          </Badge>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-full rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="mx-auto mt-8 w-[86%] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 h-2.5 w-20 rounded-full bg-violet-200" />
        <div className="space-y-2">
          <div className="h-8 rounded-md border border-slate-200 bg-slate-50" />
          <div className="h-8 rounded-md border border-slate-200 bg-slate-50" />
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
          <Check className="size-3" aria-hidden /> 입력 준비 완료
        </div>
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div className="relative mx-auto mt-7 h-28 w-[88%]">
        <div className="absolute top-2 left-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold shadow-sm">
          URL 열기
        </div>
        <div className="absolute top-16 right-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[11px] font-semibold shadow-sm">
          정보 추출
        </div>
        <svg
          aria-hidden
          className="absolute inset-0 size-full text-emerald-400"
          viewBox="0 0 260 110"
        >
          <path
            d="M78 30 C145 30 110 85 185 85"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  if (type === "collaboration") {
    return (
      <div className="mt-10 flex justify-center -space-x-3">
        {["지", "민", "수", "+3"].map((name, index) => {
          const color = [
            "bg-violet-500",
            "bg-sky-500",
            "bg-emerald-500",
            "bg-slate-700",
          ][index];

          return (
            <span
              key={name}
              className={cn(
                "flex size-12 items-center justify-center rounded-full border-4 border-white text-xs font-bold text-white shadow-sm",
                color
              )}
            >
              {name}
            </span>
          );
        })}
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="mx-auto mt-8 w-[88%] space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        {["URL 열기", "정보 추출", "이메일 전송"].map((label, index) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] font-medium text-slate-600"
          >
            <span className="size-2 rounded-full bg-emerald-500" />
            {label}
            <span className="ml-auto text-slate-400">{index + 1}.2초</span>
          </div>
        ))}
      </div>
    );
  }

  if (type === "replay") {
    return (
      <div className="mx-auto mt-8 flex aspect-video w-[88%] items-center justify-center rounded-xl bg-slate-900 shadow-lg">
        <span className="flex size-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg">
          <Play className="ml-0.5 size-5 fill-current" aria-hidden />
        </span>
      </div>
    );
  }

  return null;
};
