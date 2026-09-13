import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCta } from "@/components/closing-cta";
import { Faq } from "@/components/faq";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { WorkflowBuilderDemo } from "@/features/home/components/workflow-builder-demo";
import { WorkflowFeaturePreview } from "@/features/home/components/workflow-feature-preview";
import {
  homeCapabilities,
  homeHighlights,
  homeQuestions,
} from "@/features/home/data";

export const metadata: Metadata = {
  title: `홈 | ${SITE.NAME}`,
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
                <Button asChild size="large" shape="pill">
                  <Link href={ROUTES.WORKFLOWS.INDEX}>워크플로우 시작하기</Link>
                </Button>
                <Button asChild variant="secondary" size="large" shape="pill">
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

        <Faq questions={homeQuestions} />

        <ClosingCta page="home" />
      </main>
    </div>
  );
};

export default HomePage;
