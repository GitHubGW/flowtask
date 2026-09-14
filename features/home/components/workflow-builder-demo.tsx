import { Bot, Globe, Mail, Map as MapIcon, Play } from "lucide-react";
import Image from "next/image";

import styles from "./workflow-builder-demo.module.css";
import { WorkflowDemoNode } from "./workflow-demo-node";

const demoEdges = [
  { id: "one", className: styles.edgeOne, d: "M304 108 V144" },
  { id: "two", className: styles.edgeTwo, d: "M304 227 V263" },
  { id: "three", className: styles.edgeThree, d: "M304 346 V382" },
] as const;

export const WorkflowBuilderDemo = () => {
  return (
    <div className="relative mt-12 min-h-132 w-full overflow-hidden rounded-[2rem] border border-sky-100 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] sm:min-h-144">
      <Image
        src="/images/workflow-builder-landscape.png"
        alt=""
        fill
        sizes="(max-width: 1200px) 100vw, 1152px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/25" />

      <div className="absolute inset-x-4 top-1/2 mx-auto h-124 max-w-152 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/90 bg-white shadow-2xl shadow-sky-950/15 sm:inset-x-8">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[14px_14px] opacity-70" />

        <div
          aria-label="길동 프로필"
          className="absolute top-3 right-3 z-20 flex size-8 items-center justify-center rounded-full border-2 border-white bg-teal-800 text-[10px] font-semibold text-white shadow-sm ring-1 ring-slate-200"
        >
          길동
        </div>

        <svg
          aria-hidden
          viewBox="0 0 608 496"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          <defs>
            {demoEdges.map((edge) => (
              <marker
                key={edge.id}
                id={`workflow-demo-arrow-${edge.id}`}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  className={edge.className}
                  d="M 0 0 L 10 5 L 0 10 z"
                  fill="currentColor"
                />
              </marker>
            ))}
          </defs>
          {demoEdges.map((edge) => (
            <path
              key={edge.id}
              className={edge.className}
              d={edge.d}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              markerEnd={`url(#workflow-demo-arrow-${edge.id})`}
            />
          ))}
        </svg>

        <WorkflowDemoNode
          className="top-14 left-1/2 -translate-x-1/2"
          executionStep={1}
          icon={Play}
          iconClassName="bg-amber-500 text-white"
          kind="trigger"
          label="시작"
        />
        <WorkflowDemoNode
          className="top-37.75 left-1/2 -translate-x-1/2"
          executionStep={2}
          icon={Globe}
          iconClassName="bg-blue-500 text-white"
          input="https://books.toscrape.com"
          kind="action"
          label="URL 열기"
        />
        <WorkflowDemoNode
          className="top-67.5 left-1/2 -translate-x-1/2"
          executionStep={3}
          icon={Bot}
          iconClassName="bg-fuchsia-500 text-white"
          input="화면에 보이는 책 중에 가장 비싼 책 페이지 열어주세요"
          kind="action"
          label="AI 에이전트"
        />
        <WorkflowDemoNode
          className="top-97.25 left-1/2 -translate-x-1/2"
          executionStep={4}
          icon={Mail}
          iconClassName="bg-emerald-500 text-white"
          input="me@gmail.com"
          kind="action"
          label="이메일 전송"
        />

        <details className="group absolute right-3 bottom-3 z-20">
          <summary className="ml-auto flex size-9 cursor-pointer list-none items-center justify-center rounded-xl bg-violet-500 text-white shadow-sm transition-colors hover:bg-violet-600 focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <MapIcon className="size-4" aria-hidden />
            <span className="sr-only">미니맵 열기</span>
          </summary>
          <div className="absolute right-0 bottom-12 h-24 w-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/95 shadow-lg">
            <div className="absolute inset-2 rounded-md border border-slate-200 bg-white">
              <span className="absolute top-2 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-sm bg-amber-300" />
              <span className="absolute top-7 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-sm bg-blue-300" />
              <span className="absolute top-12 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-sm bg-fuchsia-300" />
              <span className="absolute top-17 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-sm bg-emerald-300" />
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
