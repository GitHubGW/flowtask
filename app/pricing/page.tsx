import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { PricingPlans } from "@/features/pricing/components/pricing-plans";
import { pricingQuestions } from "@/features/pricing/data";

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
            <div id="pricing-plans" className="mx-auto max-w-3xl text-center">
              <h1 className="mt-6 text-4xl font-extrabold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl">
                자동화에 맞는 간단한 요금제
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-slate-600 sm:text-lg">
                무료 플랜으로 브라우저 자동화를 시작하세요. <br />
                AI Agent가 필요할 때 Pro 플랜으로 확장하세요.
              </p>
            </div>

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
                  asChild
                  variant="secondary"
                  size="large"
                  shape="pill"
                  className="self-start bg-white/90 sm:self-center"
                >
                  <Link href={ROUTES.WORKFLOWS.INDEX}>워크플로우 살펴보기</Link>
                </Button>
              </div>
            </section>
          </div>
        </section>

        <Faq questions={pricingQuestions} />

        <ClosingCta page="pricing" />
      </main>
    </div>
  );
};

export default PricingPage;
