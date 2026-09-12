import { Building2, MapPinned, PartyPopper, PlaneTakeoff } from "lucide-react";

const SERVICES = [
  { icon: Building2, title: "Corporate Travel", desc: "Reliable transport for meetings, offsites, and daily commutes." },
  { icon: PartyPopper, title: "Events & Weddings", desc: "Group transport for weddings, parties, and large events." },
  { icon: MapPinned, title: "Outstation Trips", desc: "Comfortable long-distance travel between cities." },
  { icon: PlaneTakeoff, title: "Airport Transfer", desc: "On-time pickup and drop, every time." },
];

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">Our Services</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 p-6 text-center transition-shadow hover:shadow-md"
          >
            <Icon className="mx-auto h-8 w-8 text-emerald-700" />
            <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}