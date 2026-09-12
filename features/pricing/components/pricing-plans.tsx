"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { PlanFeatures } from "@/features/pricing/components/plan-features";
import {
  ProPlanButton,
  type BillingPeriod,
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

          <div className="mt-7">
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-full border-slate-300 bg-slate-50"
            >
              <Link href={ROUTES.WORKFLOWS.INDEX}>무료로 시작</Link>
            </Button>
          </div>

          <div className="my-7 border-t border-slate-200" />
          <PlanFeatures title="포함된 기능" features={planFeatures.free} />
        </article>

        <article className="relative flex min-h-132 flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-950 px-4 py-1.5 text-xs font-bold text-white">
            추천
          </span>
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
                {pro.price}
              </strong>
              <span className="pb-1 text-sm text-slate-500">/월</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {isAnnual ? "월 고정 요금, 연 단위 청구" : "월 고정 요금"}
            </p>
          </div>

          <div className="mt-7">
            <ProPlanButton planPeriod={billingPeriod} />
          </div>

          <div className="my-7 border-t border-slate-200" />

          <PlanFeatures
            title="Free 플랜의 모든 기능과"
            features={planFeatures.pro}
          />
        </article>

        <article className="relative flex min-h-132 flex-col rounded-3xl border border-slate-200 bg-white p-8">
          <span className="absolute top-6 right-6 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
            준비 중
          </span>
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

          <div className="mt-7">
            <Button
              type="button"
              disabled
              variant="outline"
              className="h-11 w-full rounded-full border-slate-300 bg-slate-50"
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
