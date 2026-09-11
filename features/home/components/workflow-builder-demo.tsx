import Image from "next/image";
import {
  Bot,
  Braces,
  Check,
  Globe2,
  MousePointer2,
  Play,
  Sparkles,
} from "lucide-react";
import { WorkflowDemoNode } from "./workflow-demo-node";
import { cn } from "@/libs/utils";
import styles from "./workflow-builder-demo.module.css";

export const WorkflowBuilderDemo = () => {
  return (
    <div className="relative mt-12 min-h-124 w-full overflow-hidden rounded-[2rem] border border-sky-100 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] sm:min-h-136">
      <Image
        src="/images/workflow-builder-landscape.png"
        alt=""
        fill
        sizes="(max-width: 1200px) 100vw, 1152px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/25" />

      <div className="absolute inset-x-4 top-1/2 mx-auto h-116 max-w-152 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/90 bg-white shadow-2xl shadow-sky-950/15 sm:inset-x-8">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[14px_14px] opacity-70" />

        <div className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          실시간 편집
        </div>
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">
          <Play className="size-3 fill-current" aria-hidden />
          테스트
        </div>

        <svg
          aria-hidden
          viewBox="0 0 608 464"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full text-slate-300"
        >
          <path
            d="M304 117 V151 M304 215 V249 M304 313 V340 M304 340 H142 V376 M304 340 H466 V376"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <WorkflowDemoNode
          className="top-17 left-1/2 -translate-x-1/2"
          icon={Sparkles}
          iconClassName="bg-blue-500"
          label="시작"
          subtitle="워크플로우 실행"
          meta="TRIGGER"
        />
        <WorkflowDemoNode
          className="top-38 left-1/2 -translate-x-1/2"
          icon={Globe2}
          iconClassName="bg-emerald-500"
          label="URL 열기"
          subtitle="웹페이지로 이동"
        />
        <WorkflowDemoNode
          className={cn("top-59 left-1/2 -translate-x-1/2", styles.agentNode)}
          icon={Bot}
          iconClassName="bg-rose-500"
          label="Agent"
          subtitle="브라우저 작업 수행"
          meta="AI"
        />
        <WorkflowDemoNode
          className="bottom-7 left-[7%] hidden sm:flex"
          icon={Braces}
          iconClassName="bg-amber-500"
          label="정보 추출"
          subtitle="필요한 데이터 정리"
        />
        <WorkflowDemoNode
          className="right-[7%] bottom-7 hidden sm:flex"
          icon={Check}
          iconClassName="bg-cyan-500"
          label="이메일 전송"
          subtitle="결과 전달"
        />

        <div
          className={cn(
            "pointer-events-none absolute top-72 left-1/2 z-20 w-76 rounded-xl border border-slate-200 bg-white p-3 opacity-0 shadow-2xl sm:left-[55%]",
            styles.configurationPanel
          )}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-[10px] font-bold tracking-wide text-slate-500">
            <Sparkles className="size-3 text-violet-500" aria-hidden />
            AGENT 설정
          </div>
          <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2">
            <span className="text-[10px] font-semibold text-slate-500">
              실행 모델
            </span>
            <div className="mt-1.5 flex items-center justify-between text-xs font-semibold text-slate-700">
              Gemini 2.5 Flash
              <Check className="size-3.5 text-emerald-500" aria-hidden />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-[10px] font-semibold text-slate-500">
              지시사항
            </span>
            <div className="mt-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500">
              페이지에서 필요한 작업을 수행하세요.
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute top-[34%] left-[73%] z-30 opacity-0",
            styles.cursor
          )}
        >
          <MousePointer2
            className="size-6 fill-slate-900 text-white drop-shadow-md"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
};
