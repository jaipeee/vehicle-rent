import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Folder } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

// Placeholder posts — swap once real blog content exists.
const POSTS: BlogPost[] = [
  {
    slug: "choosing-the-right-tempo-traveller",
    title: "How to Choose the Right Tempo Traveller for Your Group Size",
    excerpt: "From a small family trip to a large wedding party — here's how seating, luggage space, and route length should shape your pick.",
    category: "Travel Tips",
    date: "Sep 10, 2026",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "corporate-travel-checklist",
    title: "A Corporate Travel Checklist for Stress-Free Offsites",
    excerpt: "Booking transport for a company event? Here's what to confirm before you lock in a vehicle for your team.",
    category: "Corporate",
    date: "Sep 5, 2026",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "wedding-transport-planning-guide",
    title: "Wedding Transport Planning: A Complete Guide",
    excerpt: "Decorated cars, guest buses, and timing logistics — plan your wedding-day transport without last-minute stress.",
    category: "Weddings",
    date: "Aug 28, 2026",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
];

export function BlogSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-emerald-900/90 px-2.5 py-1 text-xs font-semibold text-white">
                  {post.date}
                </span>
              </div>
              <div className="p-5">
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <Folder className="h-3.5 w-3.5" />
                  {post.category}
                </span>
                <h3 className="mt-2 line-clamp-2 font-bold text-slate-900">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}