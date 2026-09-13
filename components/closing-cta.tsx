import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ROUTES } from "@/constants/routes";

const CLOSING_CTA_BENEFITS = [
  "무료로 시작",
  "카드 등록 불필요",
  "언제든 Pro로 확장",
] as const;

const content = {
  home: {
    title: "첫 번째 자동화를\n지금 만들어 보세요.",
    description:
      "무료 플랜으로 브라우저 자동화를 시작하세요.\n반복되는 브라우저 업무를 워크플로우에 맡겨보세요.",
    primaryHref: ROUTES.WORKFLOWS.INDEX,
    secondaryHref: ROUTES.PRICING,
  },
  pricing: {
    title: "요금제를 선택하고,\n언제든 변경하세요.",
    description:
      "카드 등록 없이 무료로 시작하세요.\n더 강력한 자동화가 필요해지면 언제든 Pro 플랜으로 확장할 수 있어요.",
    primaryHref: ROUTES.WORKFLOWS.INDEX,
    secondaryHref: "#pricing-plans",
  },
} as const;

interface ClosingCtaProps {
  page: keyof typeof content;
}

export const ClosingCta = ({ page }: ClosingCtaProps) => {
  const { title, description, primaryHref, secondaryHref } = content[page];

  return (
    <section className="relative mt-10 min-h-168 overflow-hidden bg-sky-100 px-5 pt-28 pb-6 sm:px-8 sm:pt-32">
      <Image
        src="/images/landing-footer-landscape.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-linear-to-b from-white via-white/5 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-144 max-w-6xl flex-col">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl leading-16 font-black tracking-[-0.035em] whitespace-pre-line text-slate-950 sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 whitespace-pre-line text-slate-700 sm:text-lg">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild variant="brand" size="large" shape="pill">
              <Link href={primaryHref}>시작하기</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="large"
              shape="pill"
              className="bg-white/90 hover:bg-white"
            >
              <Link href={secondaryHref}>요금제 보기</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-slate-700">
            {CLOSING_CTA_BENEFITS.map((benefit) => (
              <span key={benefit} className="flex items-center gap-1.5">
                <CircleCheck className="size-4" aria-hidden />
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};
