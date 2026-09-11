import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Plus } from "lucide-react";
import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { PricingPlans } from "@/features/pricing/components/pricing-plans";
import { pricingQuestions } from "@/features/pricing/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가격",
};

const PricingPage = () => {
  return (
    <div className="min-h-svh bg-white text-slate-950">
      <Header />

      <main>
        <section className="px-5 pt-20 pb-24 sm:px-8 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-6xl">
            <header
              id="pricing-plans"
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                자동화에 맞는 간단한 요금제
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-slate-600 sm:text-lg">
                무료 플랜으로 브라우저 자동화를 시작하세요. <br />
                AI Agent가 필요할 때 Pro 플랜으로 확장하세요.
              </p>
            </header>

            <div className="mx-auto mt-7 max-w-6xl scroll-mt-24">
              <PricingPlans />
            </div>

            <section className="relative mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-sky-50 px-7 py-9 sm:px-10 sm:py-10">
              <Image
                src="/images/workflow-builder-landscape.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 576px"
                className="object-cover object-right opacity-80 sm:left-auto sm:w-1/2"
              />
              <div className="absolute inset-0 bg-linear-to-r from-sky-50 via-sky-50/95 to-sky-50/15 sm:via-sky-50/80" />

              <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-extrabold tracking-tight">
                    워크플로우 자동화
                  </h2>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                    필요한 노드를 연결해 반복되는 브라우저 작업을 하나의
                    흐름으로 만들고, <br />
                    실행 과정과 결과까지 한곳에서 확인하세요.
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    노드 기반 편집
                    <span className="mx-2 text-slate-400">·</span>
                    브라우저 자동화
                    <span className="mx-2 text-slate-400">·</span>
                    실시간 협업
                  </p>
                </div>

                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="h-11 self-start rounded-full border-slate-300 bg-white/90 px-6 sm:self-center"
                >
                  워크플로우 살펴보기
                </Button>
              </div>
            </section>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">
              자주 묻는 질문
            </h2>

            <Accordion type="single" collapsible className="mt-10 gap-3">
              {pricingQuestions.map(({ question, answer }, index) => (
                <AccordionItem
                  key={question}
                  value={`pricing-question-${index + 1}`}
                  className="rounded-2xl border border-slate-200 px-5 shadow-sm"
                >
                  <AccordionTrigger className="min-h-16 items-center border-0 py-5 text-base font-bold text-slate-900 hover:no-underline sm:text-lg [&_[data-slot=accordion-trigger-icon]]:hidden">
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

        <section className="relative mt-10 min-h-168 overflow-hidden bg-sky-100 px-5 pt-28 pb-20 sm:px-8 sm:pt-32">
          <Image
            src="/images/landing-footer-landscape.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-linear-to-b from-white via-white/5 to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-4xl leading-12 font-black tracking-[-0.035em] text-slate-950 sm:text-5xl sm:leading-16">
              요금제를 선택하고,
              <br />
              언제든 변경하세요.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              카드 등록 없이 무료로 시작하세요.
              <br />더 강력한 자동화가 필요해지면 언제든 Pro 플랜으로 확장할 수
              있어요.
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
                <Link href="#pricing-plans">요금제 보기</Link>
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
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
