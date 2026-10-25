import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqData } from "@/lib/types";

// Built-in defaults, used when the database has no FAQs for the page.
const DEFAULT_FAQS: { q: string; a: string }[] = [
  { q: "What types of vehicles does Indiventra offer across India?", a: "Indiventra offers a diverse Pan-India fleet including premium cars, SUVs, Force Urbania, Tempo Travellers, Mini Buses, Luxury Buses, Volvo, and Sleeper Buses to suit all travel needs across the country." },
  { q: "How can I book a vehicle with Indiventra?", a: "Booking is a simple 3-step process: submit your enquiry via call, WhatsApp, or our website, select the ideal vehicle we suggest, and pay a small advance to instantly confirm your Pan-India ride." },
  { q: "Are there any hidden charges in your rental service?", a: "Indiventra strictly maintains a transparent pricing policy with absolutely zero hidden charges. The final bill matches your exact quote. You only pay standard tolls, parking, and state permits directly during the journey." },
];

export function FAQ({ items = [] }: { items?: FaqData[] }) {
  const faqs =
    items.length > 0
      ? items.map((i) => ({ id: i.id, q: i.question, a: i.answer }))
      : DEFAULT_FAQS.map((f, i) => ({ id: `default-${i}`, ...f }));

  // Two columns: the left one gets the extra item when the count is odd.
  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  const renderColumn = (list: typeof faqs, prefix: string, className: string) => (
    <Accordion type="single" collapsible className={className}>
      {list.map((item) => (
        <AccordionItem
          key={item.id}
          value={`${prefix}-${item.id}`}
          className="rounded-xl border border-slate-200 bg-white px-4"
        >
          <AccordionTrigger className="text-left font-semibold text-slate-900">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-slate-600">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <section className="bg-[#fe980a2d] py-16">
      <div className="flex items-center justify-center gap-3 pb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
        <span className="h-px w-8 bg-amber-400" />
        FAQ
        <span className="h-px w-8 bg-amber-400" />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
          Frequently Asked <span className="text-amber-500">Questions</span>
        </h2>

        <div className="mt-10 grid gap-x-8 lg:grid-cols-2">
          {renderColumn(left, "left", "space-y-3")}
          {right.length > 0 && renderColumn(right, "right", "mt-3 space-y-3 lg:mt-0")}
        </div>
      </div>
    </section>
  );
}