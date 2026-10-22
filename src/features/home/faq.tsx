import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What types of vehicles does Indiventra offer across India?",
    a: "Indiventra offers a diverse Pan-India fleet including premium cars, SUVs, Force Urbania, Tempo Travellers, Mini Buses, Luxury Buses, Volvo, and Sleeper Buses to suit all travel needs across the country.",
  },
  {
    q: "Can I book a Tempo Traveller or Maharaja Tempo for group travel?",
    a: "Yes, we provide 9 to 26-seater Tempo Travellers and Maharaja Tempos. They feature premium pushback seating, AC vents, and ample luggage space, making them perfect for comfortable, memorable group travel across India.",
  },
  {
    q: "What seating capacities are available for Mini Buses and Luxury Buses?",
    a: "Our luxury buses offer spacious seating capacities from 40 to 56 passengers. Available in 2x1 and 2x2 reclining configurations, they are ideal for large corporate groups, weddings, and events across India.",
  },
  {
    q: "Do you offer Sleeper Buses for overnight journeys?",
    a: "Yes, Indiventra provides comfortable Sleeper Buses designed specifically for long-distance, overnight journeys across India. They offer spacious berths and a smooth ride, ensuring travelers arrive at their destination well-rested and refreshed.",
  },
  {
    q: "Which destinations are covered for pilgrimage travel?",
    a: "Indiventra covers all major pilgrimage routes and spiritual destinations across India. Our verified, experienced drivers ensure a safe, peaceful, and reliable travel experience for all your sacred family excursions and religious tours.",
  },
  {
    q: "Do you provide drivers with all vehicle rentals?",
    a: "Absolutely. Every Indiventra rental includes a verified, background-checked, and highly trained driver. They are experts in defensive driving, always punctual, and dedicated to ensuring a safe, smooth journey across any Indian route.",
  },
  {
    q: "Are AC and luxury amenities available in all vehicles?",
    a: "Yes, our entire fleet features excellent air-conditioning. Premium vehicles like Force Urbania and Luxury Buses include individual AC vents, USB charging points, reclining seats, and advanced music systems for ultimate travel comfort.",
  },
  {
    q: "Can I rent a vehicle for weddings, corporate events, or airport transfers?",
    a: "Yes, Indiventra specializes in rentals for weddings, corporate events, airport transfers, and family trips. Our transparent booking process ensures you get the perfect vehicle and punctual driver for any occasion anywhere in India.",
  },
  {
    q: "How can I book a vehicle with Indiventra?",
    a: "Booking is a simple 3-step process: submit your enquiry via call, WhatsApp, or our website, select the ideal vehicle we suggest, and pay a small advance to instantly confirm your Pan-India ride.",
  },
  {
    q: "What are the per km rates for vehicle rentals?",
    a: "We offer highly competitive, transparent per-kilometer rates starting from ₹18/km for Tempo Travellers up to ₹50/km for Luxury Buses. Indiventra guarantees zero hidden charges, so your final bill perfectly matches your initial quote.",
  },
  {
    q: "Are Sleeper Buses suitable for overnight or pilgrimage travel?",
    a: "Yes, our Sleeper Buses are perfect for long overnight and pilgrimage trips across India. They provide spacious, comfortable berths, ensuring passengers rest properly while our expert drivers navigate the long-distance routes safely.",
  },
  {
    q: "Do you offer buses with washrooms?",
    a: "Yes, select large luxury buses and sleeper coaches in our fleet are equipped with onboard washrooms. Please specify this requirement during your initial enquiry, and we will arrange the ideal vehicle for you.",
  },
  {
    q: "Are there any hidden charges in your rental service?",
    a: "Indiventra strictly maintains a transparent pricing policy with absolutely zero hidden charges. The final bill matches your exact quote. You only pay standard tolls, parking, and state permits directly during the journey.",
  },
  {
    q: "Why should I choose Indiventra for vehicle rentals across India?",
    a: "Indiventra guarantees transparent pricing, well-maintained vehicles, and zero last-minute cancellations. Our verified drivers and reliable Pan-India service ensure a safe, comfortable, and premium travel experience that makes us the best choice for you.",
  },
];

export function FAQ() {
  // Split array into equal halves (7 items in each column)
  const [left, right] = [FAQS.slice(0, 7), FAQS.slice(7)];

  return (
    <section className="bg-[#fe980a2d] py-16">
      <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-600 pb-4">
        <span className="h-px w-8 bg-amber-400" />
        FAQ
        <span className="h-px w-8 bg-amber-400" />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">
          Frequently Asked <span className="text-amber-500">Questions</span>
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