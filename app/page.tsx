import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CircleCheck, Plus } from "lucide-react";
import { WorkflowBuilderDemo } from "@/features/home/components/workflow-builder-demo";
import {
  homeCapabilities,
  homeHighlights,
  homeQuestions,
} from "@/features/home/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { ROUTES } from "@/constants/routes";
import { WorkflowFeaturePreview } from "@/features/home/components/workflow-feature-preview";

export const metadata: Metadata = {
  title: "홈 | Flowtask",
};

const HomePage = () => {
  return (
    <div className="min-h-svh bg-white text-slate-950">
      <Header />

      <main>
        <section className="px-5 pt-20 pb-24 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <div>
              <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-balance text-slate-950 sm:text-5xl lg:text-6xl">
                코드 없이 브라우저 업무를 자동화하세요.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-pretty text-slate-600 sm:text-lg">
                필요한 작업을 노드로 연결해 하나의 워크플로우로 만들고 바로
                실행하세요. <br />
                반복되는 웹 업무를 자동화하고, 진행 과정과 결과까지 한눈에
                확인할 수 있어요.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800"
                >
                  <Link href={ROUTES.WORKFLOWS.INDEX}>워크플로우 시작하기</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full px-5"
                >
                  <Link href="#features">기능 살펴보기</Link>
                </Button>
              </div>
            </div>

            <WorkflowBuilderDemo />

            <div className="mt-10 grid gap-8 border-slate-200 pb-24 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200">
              {homeHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    {highlight.title}
                  </h2>
                  <p className="mt-2 text-base leading-6 text-slate-600">
                    {highlight.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div>
              <p className="text-sm font-bold text-emerald-600">주요 기능</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">
                자동화에 필요한 기능을 한곳에 담았어요.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                복잡한 설정은 줄이고, 워크플로우를 만들고 실행 결과를 쉽게
                확인할 수 있어요.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {homeCapabilities.map(
                ({ title, description, icon: Icon, type }) => (
                  <article
                    key={title}
                    className="min-h-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="p-6 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-white">
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <h3 className="font-bold tracking-tight">{title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {description}
                      </p>
                    </div>
                    <div className="min-h-48 border-t border-sky-100 bg-[linear-gradient(145deg,#e3f7ff,#f1f9dc_55%,#fff0d9)] px-5 py-4">
                      <WorkflowFeaturePreview type={type} />
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">
              자주 묻는 질문
            </h2>

            <Accordion type="single" collapsible className="mt-10 gap-3">
              {homeQuestions.map(({ question, answer }, index) => (
                <AccordionItem
                  key={question}
                  value={`question-${index + 1}`}
                  className="rounded-2xl border border-slate-200 px-5 shadow-sm"
                >
                  <AccordionTrigger className="min-h-16 items-center border-0 py-5 text-base font-bold text-slate-900 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden sm:text-lg">
                    <span>{question}</span>
                    <Plus
                      aria-hidden
                      className="ml-4 size-5 shrink-0 text-slate-500 transition-transform group-aria-expanded/accordion-trigger:rotate-45"
                    />
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl pb-5 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="relative mt-10 min-h-168 overflow-hidden bg-sky-100 px-5 pt-28 pb-6 sm:px-8 sm:pt-32">
          <Image
            src="/images/landing-footer-landscape.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-linear-to-b from-white via-white/5 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-144 max-w-6xl flex-col">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl leading-16 font-black tracking-[-0.035em] text-slate-950 sm:text-5xl">
                첫 번째 자동화를
                <br />
                지금 만들어 보세요.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                무료 플랜으로 브라우저 자동화를 시작하세요.
                <br />
                반복되는 브라우저 업무를 워크플로우에 맡겨보세요.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-sky-700 px-7 text-white hover:bg-sky-800"
                >
                  <Link href={ROUTES.WORKFLOWS.INDEX}>시작하기</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-slate-300 bg-white/90 px-7 hover:bg-white"
                >
                  <Link href={ROUTES.PRICING}>요금제 보기</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-700">
                {["무료로 시작", "카드 등록 불필요", "언제든 Pro로 확장"].map(
                  (benefit) => (
                    <span key={benefit} className="flex items-center gap-1.5">
                      <CircleCheck className="size-4" aria-hidden />
                      {benefit}
                    </span>
                  )
                )}
              </div>
            </div>

            <footer className="mt-auto border-slate-900/10 py-5 text-center text-base text-slate-900">
              © 2026 GW. All rights reserved.
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
