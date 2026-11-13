import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const a = articles.find((x) => x.slug === slug);
  return { title: a ? a.title : "Article" };
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = articles.find((x) => x.slug === slug);
  if (!article) notFound();

return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <p className="text-xs text-steel-grey mb-3">
        <Link href="/knowledge" className="hover:text-steel-blue">Knowledge</Link>
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-steel-navy leading-tight">{article.title}</h1>
      <p className="mt-2 text-xs text-steel-grey">Last reviewed: {article.reviewed}</p>

<div className="mt-10 space-y-8">
        {article.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="text-lg font-bold text-steel-navy">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-steel-charcoal/85 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

<p className="mt-10 text-xs text-steel-grey leading-relaxed border-t border-gray-200 pt-5">
        This article is general educational information for the steel trade, not engineering,
        legal or tax advice. Standards, specifications and commercial terms vary — always
        confirm details with your supplier.
      </p>

<div className="mt-8 bg-steel-navy text-white rounded-3xl p-8 text-center relative overflow-hidden grain">
        <div className="absolute -top-16 left-1/3 w-[220px] h-[220px] rounded-full bg-steel-blue/25 blur-[90px]" aria-hidden />
        <div className="relative">
          <p className="text-lg font-bold">Buying steel products?</p>
          <p className="mt-2 text-sm text-slate-300">Post one structured RFQ and compare quotations properly.</p>
          <Link
            href="/rfq"
            className="inline-block mt-5 bg-steel-blue hover:bg-steel-blue/85 font-semibold px-6 py-3 rounded-xl glow-sm transition-all"
          >
            Post a Requirement →
          </Link>
        </div>
      </div>
    </div>
  );
}
