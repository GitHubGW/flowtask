"use client";

import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  const handleClick = () => {
    toast("버튼이 클릭되었어요");
  };

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-end gap-2 border-b px-4 py-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="ghost" aria-label="로그인">
              로그인
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button aria-label="회원가입">회원가입</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <Button onClick={handleClick} aria-label="토스트 표시">
          Toast 보기
        </Button>
      </main>
    </div>
  );
};

export default HomePage;
