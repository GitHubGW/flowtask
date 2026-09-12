import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {
  questions: readonly {
    question: string;
    answer: string;
  }[];
}

export const Faq = ({ questions }: FaqProps) => {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">
          자주 묻는 질문
        </h2>

        <Accordion type="single" collapsible className="mt-10 gap-3">
          {questions.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              value={question}
              className="rounded-2xl border border-slate-200 px-5 shadow-sm"
            >
              <AccordionTrigger className="min-h-16 items-center border-0 py-5 text-base font-bold text-slate-900 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden sm:text-lg">
                <span>{question}</span>
                <Plus
                  aria-hidden
                  className="ml-4 size-5 shrink-0 text-slate-500 transition-transform group-aria-expanded/accordion-trigger:rotate-45"
                />
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-5 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
