import { Badge } from "@/components/ui/badge";

/**
 * Pro 플랜에서만 사용할 수 있는 기능임을 알리는 뱃지
 */
export const ProPlanBadge = () => (
  <Badge className="h-4 rounded-full bg-violet-100 px-1.5 text-[10px] font-semibold text-violet-700">
    Pro
  </Badge>
);
