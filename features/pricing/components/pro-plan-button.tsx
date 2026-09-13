"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BILLING_PLANS } from "@/constants/billing";
import { ROUTES } from "@/constants/routes";

const CLERK_PRO_PLAN_ID = process.env.NEXT_PUBLIC_CLERK_PRO_PLAN_ID;

export type BillingPeriod = "annual" | "month";

interface ProPlanButtonProps {
  planPeriod: BillingPeriod;
}

export const ProPlanButton = ({ planPeriod }: ProPlanButtonProps) => {
  const { isLoaded, userId, orgId, has } = useAuth();

  if (!isLoaded) {
    return (
      <Button disabled fullWidth variant="brand" size="large" shape="pill">
        불러오는 중...
      </Button>
    );
  }

  if (!userId) {
    return (
      <SignInButton mode="modal">
        <Button fullWidth variant="brand" size="large" shape="pill">
          Pro 시작하기
        </Button>
      </SignInButton>
    );
  }

  if (!orgId) {
    return (
      <Button asChild fullWidth variant="brand" size="large" shape="pill">
        <Link href={ROUTES.CHOOSE_ORGANIZATION}>조직 선택하기</Link>
      </Button>
    );
  }

  if (has?.({ plan: BILLING_PLANS.PRO })) {
    return (
      <Button asChild fullWidth variant="brand" size="large" shape="pill">
        <Link href={ROUTES.WORKFLOWS.INDEX}>워크플로우로 이동</Link>
      </Button>
    );
  }

  if (!CLERK_PRO_PLAN_ID) {
    return (
      <Button disabled fullWidth variant="brand" size="large" shape="pill">
        Pro 시작하기
      </Button>
    );
  }

  return (
    <CheckoutButton
      planId={CLERK_PRO_PLAN_ID}
      planPeriod={planPeriod}
      for="organization"
      newSubscriptionRedirectUrl={ROUTES.WORKFLOWS.INDEX}
    >
      <Button fullWidth variant="brand" size="large" shape="pill">
        Pro 시작하기
      </Button>
    </CheckoutButton>
  );
};
