import Link from "next/link";
import { catalog } from "@/lib/catalog";
import { brands } from "@/lib/brands";
import { articles } from "@/lib/articles";
import BrandLogo from "@/components/brands/BrandLogo";

export const metadata = { title: "Search — Steelsetu" };

function match(text: string, query: string) {
  return text.toLowerCase().includes(query.toLowerCase());
}

export default async function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await props.searchParams;
  const query = (q || "").trim();

const productResults = query
    ? catalog.filter((c) => match(c.name, query) || match(c.short, query) || match(c.description, query))
    : [];
  const brandResults = query
    ? brands.filter((b) => match(b.name, query) || match(b.about, query))
    : [];
  const articleResults = query
    ? articles.filter((a) => match(a.title, query) || match(a.excerpt, query))
    : [];
  const total = productResults.length + brandResults.length + articleResults.length;

return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {query ? (
          <>
            <h1 className="text-2xl font-extrabold text-steel-navy">
              {total > 0 ? `${total} results for “${query}”` : `No results for “${query}”`}
            </h1>

{total === 0 && (
              <div className="mt-6 bg-white rounded-2xl shadow p-8 text-center">
                <p className="text-4xl">🔍</p>
                <p className="mt-3 text-sm text-slate-500">
                  Kuch nahi mila. Product ka naam try kijiye — jaise “TMT”, “sheet”, “coil”, ya brand naam.
                </p>
                <Link href="/products" className="inline-block mt-5 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">
                  Browse All Products
                </Link>
              </div>
            )}

{productResults.length > 0 && (
              <section className="mt-8">
                <h2 className="text-sm font-bold text-steel-navy uppercase tracking-wide">Products ({productResults.length})</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {productResults.map((c) => (
                    <Link key={c.slug} href={"/products/" + c.slug} className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition-shadow">
                      <p className="font-bold text-sm text-steel-navy">{c.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{c.short}</p>
                      <p className="mt-3 text-xs font-bold text-steel-blue">View →</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

{brandResults.length > 0 && (
              <section className="mt-10">
                <h2 className="text-sm font-bold text-steel-navy uppercase tracking-wide">Brands ({brandResults.length})</h2>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {brandResults.map((b) => (
                    <Link key={b.slug} href={"/brands/" + b.slug} className="flex items-center gap-4 bg-white rounded-2xl shadow p-5 hover:shadow-md transition-shadow">
                      <BrandLogo slug={b.slug} name={b.name} />
                      <div>
                        <p className="font-bold text-sm text-steel-navy">{b.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{b.hq}</p>
                        <p className="mt-1 text-xs font-bold text-steel-blue">View →</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

{articleResults.length > 0 && (
              <section className="mt-10">
                <h2 className="text-sm font-bold text-steel-navy uppercase tracking-wide">Knowledge ({articleResults.length})</h2>
                <div className="mt-3 space-y-3">
                  {articleResults.map((a) => (
                    <Link key={a.slug} href={"/knowledge/" + a.slug} className="block bg-white rounded-2xl shadow p-5 hover:shadow-md transition-shadow">
                      <p className="font-bold text-sm text-steel-navy">{a.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{a.excerpt}</p>
                      <p className="mt-3 text-xs font-bold text-steel-blue">Read →</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <p className="text-4xl">🔍</p>
            <h1 className="mt-3 text-xl font-extrabold text-steel-navy">Steelsetu Search</h1>
            <p className="mt-2 text-sm text-slate-500">
              Header ke search bar se products, brands aur knowledge articles dhoondhiye.
            </p>
            <Link href="/products" className="inline-block mt-5 bg-steel-navy hover:bg-steel-blue text-white text-sm font-bold px-6 py-2.5 rounded-xl">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}



