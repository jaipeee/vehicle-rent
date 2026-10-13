import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Folder, Calendar } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

// Keep sorted newest first: the first post is the featured card,
// the next 3 become the small cards.
const POSTS: BlogPost[] = [
  {
    slug: "choosing-the-right-tempo-traveller",
    title: "How to Choose the Right Tempo Traveller for Your Group Size",
    excerpt:
      "From a small family trip to a large wedding party — here's how seating, luggage space, and route length should shape your pick.",
    category: "Travel Tips",
    date: "Sep 10, 2026",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "corporate-travel-checklist",
    title: "A Corporate Travel Checklist for Stress-Free Offsites",
    excerpt:
      "Booking transport for a company event? Here's what to confirm before you lock in a vehicle for your team.",
    category: "Corporate",
    date: "Sep 5, 2026",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "wedding-transport-planning-guide",
    title: "Wedding Transport Planning: A Complete Guide",
    excerpt:
      "Decorated cars, guest buses, and timing logistics — plan your wedding-day transport without last-minute stress.",
    category: "Weddings",
    date: "Aug 28, 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "rajasthan-road-trip-essentials",
    title: "Rajasthan Road Trip Essentials: Routes, Stops & Timing",
    excerpt:
      "Planning a multi-city journey? Here are the best routes, rest stops, and travel timings to make the drive comfortable.",
    category: "Destinations",
    date: "Aug 20, 2026",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
  },
];

export function BlogSection() {
  const [latest, ...rest] = POSTS;
  const previous = rest.slice(0, 3); // always max 3 small cards

  return (
    <section className="py-16 bg-amber-100/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Latest <span className="text-amber-500">Blogs</span>
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View All Blogs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Wrapper */}
        <div className="mt-10 grid gap-5 rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm lg:grid-cols-[1fr_2.4fr]">
          {/* ---------- Featured (latest) post ---------- */}
          {latest && (
            <Link
              href={`/blog/${latest.slug}`}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl text-white shadow-md"
            >
              <Image
                src={latest.image}
                alt={latest.title}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-900/60 to-emerald-900/10" />

              <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
                Latest Post
              </span>

              <div className="relative p-6">
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-200">
                  <Folder className="h-3.5 w-3.5" />
                  {latest.category}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold leading-tight">
                  {latest.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-emerald-50/90">
                  {latest.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-100">
                    <Calendar className="h-3.5 w-3.5" />
                    {latest.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 transition-colors group-hover:bg-amber-50">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* ---------- Previous posts: 3 small cards ---------- */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previous.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white shadow">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 font-bold text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-sm text-slate-500">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}