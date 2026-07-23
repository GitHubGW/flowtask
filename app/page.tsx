"use client";

import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { toast } from "sonner";

const HomePage = () => {
  const handleClick = () => {
    toast("버튼이 클릭되었어요");
  };

  return (
    <div className="flex min-h-svh flex-col">
      <UserButton />
      <OrganizationSwitcher />

      <main className="flex flex-1 items-center justify-center">
        <Button onClick={handleClick} aria-label="토스트 표시">
          Toast 보기
        </Button>
      </main>
    </div>
  );
};

export default HomePage;
