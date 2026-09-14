"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { PlanFeatures } from "@/features/pricing/components/plan-features";
import {
  type BillingPeriod,
  ProPlanButton,
} from "@/features/pricing/components/pro-plan-button";
import { planFeatures, pricingPlans } from "@/features/pricing/data";
import { cn } from "@/libs/utils";

export const PricingPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annual");
  const isAnnual = billingPeriod === "annual";
  const { free, pro, ultimate } = pricingPlans;

  const handleSelectAnnual = () => {
    setBillingPeriod("annual");
  };

  const handleSelectMonth = () => {
    setBillingPeriod("month");
  };

  return (
    <div>
      <div
        role="group"
        aria-label="결제 주기 선택"
        className="mx-auto flex w-fit rounded-full border border-slate-200 bg-white p-1 shadow-sm"
      >
        <button
          type="button"
          aria-pressed={isAnnual}
          onClick={handleSelectAnnual}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
            isAnnual
              ? "bg-slate-800 text-white"
              : "text-slate-600 hover:text-slate-950"
          )}
        >
          연간
        </button>
        <button
          type="button"
          aria-pressed={!isAnnual}
          onClick={handleSelectMonth}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
            !isAnnual
              ? "bg-slate-800 text-white"
              : "text-slate-600 hover:text-slate-950"
          )}
        >
          월간
        </button>
      </div>

      <div className="mt-16 grid items-stretch gap-5 md:grid-cols-3">
        <article className="relative flex min-h-132 flex-col rounded-3xl border border-slate-200 bg-white p-8">
          <header>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {free.name}
            </h2>
            <p className="mt-2 min-h-12 text-base leading-6 text-slate-600">
              {free.description}
            </p>
          </header>

          <div className="mt-6">
            <strong className="text-5xl font-black tracking-[-0.04em]">
              {free.price}
            </strong>
            <p className="mt-3 text-sm text-slate-600">
              항상 무료, 카드 등록 불필요
            </p>
          </div>

          <div className="mt-7 md:min-h-20">
            <Button
              asChild
              fullWidth
              variant="secondary"
              size="large"
              shape="pill"
              className="bg-slate-50"
            >
              <Link href={ROUTES.WORKFLOWS.INDEX}>무료로 시작</Link>
            </Button>
          </div>

          <div className="my-7 border-t border-slate-200" />
          <PlanFeatures title="포함된 기능" features={planFeatures.free} />
        </article>

        <article className="relative flex min-h-132 flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
          <Badge
            variant="primary"
            size="large"
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
          >
            추천
          </Badge>
          <header>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {pro.name}
            </h2>
            <p className="mt-2 min-h-12 text-base leading-6 text-slate-600">
              {pro.description}
            </p>
          </header>

          <div className="mt-6">
            <div className="flex items-end gap-1.5">
              <strong className="text-5xl font-black tracking-[-0.04em]">
                {isAnnual ? pro.annualMonthlyPrice : pro.monthlyPrice}
              </strong>
              <span className="pb-1 text-sm text-slate-500">/월</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {isAnnual
                ? `연 ${pro.annualPrice} 청구 · 월간 대비 20% 할인`
                : `매월 청구`}
            </p>
          </div>

          <div className="mt-7 md:min-h-20">
            <ProPlanButton planPeriod={billingPeriod} />
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              결제 과정은 테스트 모드로 진행되며 실제 금액 청구되지 않아요.
            </p>
          </div>

          <div className="my-7 border-t border-slate-200" />

          <PlanFeatures
            title="Free 플랜의 모든 기능과"
            features={planFeatures.pro}
          />
        </article>

        <article className="relative flex min-h-132 flex-col rounded-3xl border border-slate-200 bg-white p-8">
          <Badge
            variant="warning"
            size="large"
            className="absolute top-6 right-6"
          >
            준비 중
          </Badge>
          <header>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {ultimate.name}
            </h2>
            <p className="mt-2 min-h-12 text-base leading-6 text-slate-600">
              {ultimate.description}
            </p>
          </header>

          <div className="mt-6">
            <strong className="text-5xl font-black tracking-[-0.04em]">
              {ultimate.price}
            </strong>
            <p className="mt-3 text-sm text-slate-600">
              필요한 규모와 환경에 맞게 설계
            </p>
          </div>

          <div className="mt-7 md:min-h-20">
            <Button
              disabled
              fullWidth
              variant="secondary"
              size="large"
              shape="pill"
              type="button"
              className="bg-slate-50"
            >
              문의하기
            </Button>
          </div>

          <div className="my-7 border-t border-slate-200" />

          <PlanFeatures
            title="Pro 플랜의 모든 기능과"
            features={planFeatures.ultimate}
          />
        </article>
      </div>
    </div>
  );
};
