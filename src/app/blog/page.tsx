import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-steel-navy">Steelsetu Blog</h1>
      <p className="mt-4 text-sm text-steel-charcoal/80 leading-relaxed">
        Editorial articles live in the Knowledge hub — written for buyers and traders, reviewed
        before publishing, with limitations always stated.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={"/knowledge/" + a.slug}
            className="bg-white border border-gray-200 rounded-2xl p-6 card-hover"
          >
            <h2 className="text-sm font-bold text-steel-navy leading-snug">{a.title}</h2>
            <p className="mt-3 text-xs font-semibold text-steel-blue">Read →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
