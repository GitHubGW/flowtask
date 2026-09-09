"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export const useProPlan = () => {
  const { has, isLoaded, orgId } = useAuth();
  const router = useRouter();
  const hasProPlan = isLoaded && Boolean(orgId) && has({ plan: "pro" });

  const goToPricing = () => {
    router.push(ROUTES.PRICING);
  };

  return { isLoaded, hasProPlan, goToPricing };
};
