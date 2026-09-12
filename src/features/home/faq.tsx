import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What types of vehicles are available for rental?",
    a: "We offer sedans, SUVs, tempo travellers, mini buses, and luxury buses across every city we serve — from a 4-seater for a quick city trip to a 40-seater for a large group.",
  },
  {
    q: "How can I book a vehicle rental?",
    a: "Fill out the Get a Quote form on our homepage or any city page with your details, and our team will get back to you shortly to confirm your booking.",
  },
  {
    q: "What are the rental rates?",
    a: "Rates depend on vehicle type, trip distance, and duration. Some vehicles show a starting price; for others, submit an enquiry and we'll send a transparent quote with no hidden charges.",
  },
  {
    q: "Can I rent a vehicle for an outstation trip?",
    a: "Yes, outstation trips are one of our core services — just mention your route and dates in the enquiry form.",
  },
  {
    q: "What's the difference between our vehicle categories?",
    a: "Economy is budget-friendly for everyday travel, Premium adds extra comfort and amenities, Luxury offers a top-tier ride experience, and Maharaja is our most exclusive, fully appointed class.",
  },
  {
    q: "Are rentals available for corporate events?",
    a: "Yes — we regularly support corporate meetings, offsites, and employee transport with reliable, on-time service.",
  },
  {
    q: "Do you provide vehicles for weddings?",
    a: "Yes, we offer decorated cars and group transport (tempo travellers, buses) for wedding parties and guests.",
  },
  {
    q: "Do you provide vehicles for pilgrimage tours?",
    a: "Yes, we regularly serve pilgrimage routes with comfortable, well-maintained vehicles suited for longer journeys.",
  },
  {
    q: "How many types of buses are available?",
    a: "We offer mini buses and luxury buses in a range of seating capacities, suitable for group tours, weddings, and corporate events.",
  },
  {
    q: "How many types of luxury cars and SUVs are available?",
    a: "Our Luxury and Maharaja categories include premium sedans and SUVs — ask in your enquiry and we'll recommend the best fit for your trip.",
  },
  {
    q: "Which cities do you serve?",
    a: "We currently operate in Delhi, Mumbai, Pune, Bangalore, and Hyderabad, with more cities being added regularly.",
  },
  {
    q: "Is there a cancellation fee?",
    a: "Once a booking is confirmed, it's guaranteed on our end. Reach out to our support team as early as possible if your plans change.",
  },
];

export function FAQ() {
  const [left, right] = [FAQS.slice(0, 6), FAQS.slice(6)];

  return (
    <section className="bg-amber-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 grid gap-x-8 lg:grid-cols-2">
          <Accordion type="single" collapsible className="space-y-3">
            {left.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`left-${i}`}
                className="rounded-xl border border-slate-200 bg-white px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="mt-3 space-y-3 lg:mt-0">
            {right.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`right-${i}`}
                className="rounded-xl border border-slate-200 bg-white px-4"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-600">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}