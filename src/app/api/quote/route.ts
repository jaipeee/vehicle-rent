import { NextResponse } from "next/server";

// Light spam guard: 5 requests per 10 minutes per IP (resets if the server restarts).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const s = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const num = (v: unknown, min: number) => String(Math.min(500, Math.max(min, Math.floor(Number(v)) || min)));
const bad = (message: string, status = 400) => NextResponse.json({ message }, { status });

export async function POST(req: Request) {
  const scriptUrl = process.env.QUOTE_SCRIPT_URL;
  if (!scriptUrl) return bad("Quote service is not configured.", 500);

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return bad("Too many requests. Please try again later or call us.", 429);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const ref = `IV-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Honeypot filled = bot. Pretend it worked, send nothing.
  if (s(b.hp_site)) return NextResponse.json({ ok: true, ref });

  const models = Array.isArray(b.models) ? b.models.map((m) => s(m, 60)).filter(Boolean).slice(0, 12) : [];
  const stops = Array.isArray(b.stops) ? b.stops.map((x) => s(x, 150)).filter(Boolean).slice(0, 15) : [];
  const phone = s(b.phone, 20).replace(/\D/g, "");

  if (!s(b.name) || !/^\d{6,12}$/.test(phone) || !s(b.pickup) || !s(b.drop) || !s(b.pdate) || !s(b.ddate) || !models.length) {
    return bad("Please fill in all the required fields.");
  }

  // Same column names your Apps Script already receives from the old HTML form.
  const params = new URLSearchParams({
    "Pickup Address": s(b.pickup, 200),
    "Pickup Date": s(b.pdate, 20),
    "Drop Address": s(b.drop, 200),
    "Drop Date": s(b.ddate, 20),
    "Trip Type": s(b.tripType, 40),
    "Route Stops": stops.join(" → "),
    Itinerary: s(b.itin, 250),
    Passengers: num(b.pax, 1),
    Baggages: num(b.bag, 0),
    "Vehicle Category": s(b.category, 40),
    "Vehicle Models": models.join(", "),
    "Full Name": s(b.name, 100),
    Phone: `${s(b.cc, 6)} ${phone}`,
    Email: s(b.email, 120),
    "Company Name": s(b.company, 120),
    "GST No": s(b.gst, 15).toUpperCase(),
    Message: s(b.message, 1000),
    "Source Page": s(b.sourcePage, 120),
    "Quote Ref": ref,
    "Submitted At": new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    key: process.env.QUOTE_SECRET_KEY ?? "",
  });

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      redirect: "follow",
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
    return NextResponse.json({ ok: true, ref });
  } catch (err) {
    console.error("Quote submit failed:", err);
    return bad("Couldn’t send your request. Please try again or call us.", 502);
  }
}