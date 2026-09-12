import Image from "next/image";
import type { Vehicle } from "@/lib/types";


export function Fleet({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-emerald-900 sm:text-3xl">Our Fleet</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full">
                <Image src={vehicle.imageUrl} alt={vehicle.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-slate-900">{vehicle.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{vehicle.seatCapacity} seats</p>
                <p className="mt-2 text-sm text-slate-600">{vehicle.description}</p>
                <p className="mt-3 font-semibold text-emerald-700">
                  {vehicle.priceFrom ? `From ₹${vehicle.priceFrom}` : "Contact for Quote"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}