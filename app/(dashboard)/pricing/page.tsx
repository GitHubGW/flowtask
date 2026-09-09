import { PricingTable } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const PricingPage = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect(ROUTES.CHOOSE_ORGANIZATION);
  }

  return (
    <main className="size-full overflow-y-auto p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">요금제</h1>
          <p className="text-sm text-muted-foreground">
            조직에 맞는 요금제를 선택하세요.
          </p>
        </header>

        <PricingTable
          for="organization"
          newSubscriptionRedirectUrl={ROUTES.DASHBOARD}
        />
      </div>
    </main>
  );
};

export default PricingPage;
