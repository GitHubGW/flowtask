import {
  CircleCheck,
  Globe,
  Mail,
  MonitorPlay,
  MousePointerClick,
  Play,
  Plus,
  ScanText,
  Search,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/libs/utils";

interface WorkflowFeaturePreviewProps {
  type: "run" | "form" | "automation" | "collaboration" | "history" | "replay";
}

export const WorkflowFeaturePreview = ({
  type,
}: WorkflowFeaturePreviewProps) => {
  if (type === "run") {
    return (
      <div
        aria-hidden
        className="mx-auto w-[94%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex h-11 items-center justify-between border-b border-slate-200 px-3">
          <span className="flex h-7 items-center gap-1 rounded-lg bg-slate-100 px-2.5 text-[10px] font-medium text-slate-700">
            <Plus className="size-3" />
            추가
          </span>
          <span className="flex h-7 items-center gap-1 rounded-lg bg-violet-500 px-2.5 text-[10px] font-medium text-white shadow-sm">
            <Play className="size-3 fill-current" />
            실행
          </span>
        </div>

        <div className="relative h-29 bg-slate-50/60 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[12px_12px]">
          <div className="absolute top-9 left-1/2 w-[82%] -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Badge
              variant="warning"
              size="small"
              className="absolute -top-5 left-0 rounded-md"
            >
              <Zap className="size-2.5" />
              Trigger
            </Badge>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-800">
              <span className="flex size-7 items-center justify-center rounded-md bg-amber-500 text-white">
                <Play className="size-3.5 fill-current" />
              </span>
              시작
            </div>
            <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-slate-400 shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="mx-auto w-[94%] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white">
            <Globe className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <Badge variant="secondary" size="small">
              Action
            </Badge>
            <p className="mt-1 truncate text-xs font-semibold text-slate-950">
              URL 열기
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 px-4 py-3">
          <p className="text-xs font-semibold text-slate-950">입력</p>
          <div className="mt-2">
            <p className="text-[10px] text-slate-500">
              URL <span className="text-red-500">*</span>
            </p>
            <div className="mt-1.5 truncate rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] text-slate-600">
              https://books.toscrape.com
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "automation") {
    return (
      <div
        aria-hidden
        className="relative mx-auto h-42 w-[94%] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[12px_12px]"
      >
        <div className="absolute inset-x-[8%] top-4 h-14 rounded-xl border border-cyan-400 bg-white px-3 shadow-sm">
          <span className="absolute -top-4 right-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[7px] font-medium text-emerald-600">
            ✓ 완료
          </span>
          <div className="flex h-full items-center gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-white">
              <Search className="size-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-900">요소 찾기</p>
              <p className="mt-1 truncate text-[9px] text-slate-400">
                로그인 버튼을 찾아줘
              </p>
            </div>
          </div>
          <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-slate-400" />
        </div>

        <span className="absolute top-18 left-1/2 h-6 -translate-x-1/2 border-l border-violet-300 after:absolute after:bottom-0 after:-left-1 after:border-x-4 after:border-t-4 after:border-x-transparent after:border-t-violet-300" />

        <div className="absolute inset-x-[8%] top-25 h-14 rounded-xl border border-violet-400 bg-white px-3 shadow-sm">
          <span className="absolute -top-4 right-0 rounded-md bg-violet-50 px-1.5 py-0.5 text-[7px] font-medium text-violet-600">
            ◌ 실행 중
          </span>
          <div className="flex h-full items-center gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-500 text-white">
              <MousePointerClick className="size-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-900">동작 실행</p>
              <p className="mt-1 truncate text-[9px] text-slate-400">
                찾은 버튼을 클릭해줘
              </p>
            </div>
          </div>
          <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-400" />
          <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-white bg-slate-400" />
        </div>
      </div>
    );
  }

  if (type === "collaboration") {
    return (
      <div className="mt-10 flex justify-center -space-x-3">
        {["지민", "민수", "수진"].map((name, index) => {
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
    const history = [
      {
        label: "시작",
        icon: Play,
        iconClassName: "bg-amber-500",
        duration: null,
        completed: true,
      },
      {
        label: "URL 열기",
        icon: Globe,
        iconClassName: "bg-blue-500",
        duration: "4.6s",
        completed: true,
      },
      {
        label: "요소 찾기",
        icon: Search,
        iconClassName: "bg-cyan-500",
        duration: "3.7s",
        completed: true,
      },
      {
        label: "동작 실행",
        icon: MousePointerClick,
        iconClassName: "bg-violet-500",
        duration: "4.9s",
        completed: true,
      },
      {
        label: "정보 추출",
        icon: ScanText,
        iconClassName: "bg-orange-500",
        duration: "17.4s",
        completed: true,
      },
      {
        label: "이메일 전송",
        icon: Mail,
        iconClassName: "bg-emerald-500",
        duration: "780ms",
        completed: true,
      },
      {
        label: "리플레이",
        icon: MonitorPlay,
        iconClassName: "bg-slate-100 text-slate-500",
        duration: null,
        completed: false,
      },
    ] as const;

    return (
      <div className="mx-auto w-[94%] space-y-1 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        {history.map(
          ({ label, icon: Icon, iconClassName, duration, completed }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-lg px-1 py-0.5 text-[10px] font-medium text-slate-700"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md text-white",
                  iconClassName
                )}
              >
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span>{label}</span>
              {duration ? (
                <span className="ml-auto text-slate-400">{duration}</span>
              ) : null}
              {completed ? (
                <CircleCheck
                  className={cn(
                    "size-3.5 shrink-0 text-emerald-500",
                    duration ? null : "ml-auto"
                  )}
                  aria-hidden
                />
              ) : null}
            </div>
          )
        )}
      </div>
    );
  }

  if (type === "replay") {
    return (
      <div className="relative mx-auto aspect-video w-[88%] overflow-hidden rounded-xl bg-slate-100 shadow-lg">
        <div className="absolute inset-0" aria-hidden>
          <div className="flex h-5 items-center gap-1.5 border-b border-slate-200 bg-white px-2">
            <span className="size-1.5 rounded-full bg-rose-300" />
            <span className="size-1.5 rounded-full bg-amber-300" />
            <span className="size-1.5 rounded-full bg-emerald-300" />
            <span className="ml-2 h-2.5 flex-1 rounded-full bg-slate-100" />
          </div>

          <div className="bg-amber-50 px-4 py-3 text-center">
            <div className="mx-auto h-2 w-14 rounded-full bg-slate-800" />
            <div className="mx-auto mt-1.5 h-1.5 w-24 rounded-full bg-slate-300" />
          </div>

          <div className="grid grid-cols-3 gap-2 bg-white px-3 py-2.5">
            {[
              "bg-sky-100",
              "bg-rose-100",
              "bg-emerald-100",
              "bg-violet-100",
              "bg-orange-100",
              "bg-cyan-100",
              "bg-lime-100",
              "bg-fuchsia-100",
              "bg-indigo-100",
            ].map((color, index) => (
              <div key={color} className="overflow-hidden rounded bg-white">
                <div className={cn("h-7", color)} />
                <div className="mt-1 h-1.5 w-4/5 rounded-full bg-slate-300" />
                <div className="mt-1 flex items-center justify-between">
                  <span className="h-1.5 w-7 rounded-full bg-slate-200" />
                  <span className="text-[5px] font-semibold text-slate-400">
                    {index + 3}.99
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-slate-950/58" />
        <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-4 ring-white/15">
          <Play className="ml-0.5 size-5 fill-current" aria-hidden />
          <span className="sr-only">세션 리플레이 재생</span>
        </span>
      </div>
    );
  }

  return null;
};
