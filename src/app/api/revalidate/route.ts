import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const check = await fetch(`${BASE}/2906/verify`, { headers: { Authorization: auth }, cache: "no-store" });
  if (!check.ok) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}