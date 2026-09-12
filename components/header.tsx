import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Image
              src="/images/logo.svg"
              width={32}
              height={32}
              alt="로고 이미지"
              className="size-8"
            />
          </span>
          {SITE.NAME}
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 text-sm font-medium text-slate-600 sm:flex"
        >
          <Link
            className="rounded-full px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
            href={ROUTES.WORKFLOWS.INDEX}
          >
            워크플로우
          </Link>
          <Link
            className="rounded-full px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
            href={ROUTES.PRICING}
          >
            가격
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Show when="signed-out">
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full px-4 sm:inline-flex"
            >
              <Link href={ROUTES.SIGN_IN}>로그인</Link>
            </Button>
          </Show>
          <Button
            asChild
            className="rounded-full bg-slate-950 px-4 text-white hover:bg-slate-800"
          >
            <Link href={ROUTES.WORKFLOWS.INDEX}>시작하기</Link>
          </Button>
          <Show when="signed-in">
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "size-9" } }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
};
