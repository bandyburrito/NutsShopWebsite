import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { getProduct, formatChf, type Product } from "@/lib/products";

type Spec = { label: string; value: string };

interface ProductPageProps {
  productId: Product["id"];
  number: string;
  latin: string;
  tagline: string;
  description: string[];
  origin: string;
  specs: Spec[];
  accentColor: string;
  illustration: React.ReactNode;
  /** Path to product photo in /public folder, e.g. "/cashews.jpg".
   *  If provided, the photo is shown instead of the SVG illustration. */
  photo?: string;
}

export default function ProductPage(props: ProductPageProps) {
  const product = getProduct(props.productId);
  if (!product) {
    return <p>Product not found.</p>;
  }
  const name = product.name.split(" — ")[0]; // "Cashews" from "Cashews — Tanzania"

  return (
    <article>
      {/* HEAD */}
      <section className="grain pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="text-sm text-bark/60 link-underline">
            ← Back to the pantry
          </Link>
          <p className={`mt-10 ${props.accentColor} text-xs tracking-[0.3em] uppercase mb-4`}>
            No.{props.number} · {props.origin}
          </p>
          <h1 className="font-display text-7xl md:text-9xl text-bark leading-none">
            {name}
          </h1>
          <p className="serif-display italic text-bark/50 text-2xl mt-4">— {props.latin} —</p>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="pb-24 grain">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          {/* Photo or illustration */}
          <div className="md:col-span-5 md:col-start-1">
            <div className="aspect-square bg-parchment border border-bark/20 p-10 relative shadow-[8px_8px_0_#2d1f15]">
              <div className="absolute inset-0 grain pointer-events-none" />
              {props.photo ? (
                <div className="h-full w-full overflow-hidden border border-bark/30 relative">
                  <img
                    src={props.photo}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-cream/90 px-3 py-1.5 text-[10px] tracking-[0.3em] text-bark uppercase">
                    No.{props.number}
                  </div>
                </div>
              ) : (
                <div className="border border-bark/30 h-full flex flex-col items-center justify-center p-8 text-center">
                  <p className={`text-xs tracking-[0.4em] ${props.accentColor} uppercase mb-4`}>
                    No.{props.number}
                  </p>
                  <h2 className="serif-display text-5xl text-bark mb-2">{name}</h2>
                  <p className="text-bark/60 text-sm italic mb-8">— {props.latin} —</p>
                  <div className="my-6">{props.illustration}</div>
                  <p className="mt-6 text-xs tracking-[0.3em] text-bark/60 uppercase">
                    {product.weight} · packed by hand
                  </p>
                  <div className="mt-3 w-12 h-px bg-clay" />
                  <p className="mt-3 serif-display italic text-clay">net wt. {product.weight}</p>
                </div>
              )}
            </div>
          </div>

          {/* Copy + buy */}
          <div className="md:col-span-7">
            <p className={`serif-display italic text-3xl ${props.accentColor} mb-8`}>
              {props.tagline}
            </p>
            <div className="space-y-5 text-bark/80 leading-relaxed text-lg max-w-prose">
              {props.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 max-w-md">
              {props.specs.map((s) => (
                <div key={s.label} className="border-t border-bark/20 pt-3">
                  <p className="text-xs uppercase tracking-widest text-bark/50">{s.label}</p>
                  <p className="serif-display text-xl text-bark mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 border border-bark/20 bg-cream max-w-md">
              <div className="flex items-baseline justify-between mb-1">
                <span className="serif-display text-3xl text-bark">
                  {formatChf(product.priceRappen)}
                </span>
                <span className="text-sm text-bark/60">per {product.weight}</span>
              </div>
              <p className="text-xs text-bark/60 mb-5">
                VAT included · ships from Switzerland
              </p>
              <div className="flex gap-3 flex-wrap">
                <AddToCartButton productId={props.productId} />
                <Link href="/wholesale" className="btn-stamp btn-stamp-outline">
                  Buy in bulk →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCTS */}
      <section className="bg-parchment border-y border-bark/10 py-16 grain">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">Also in the pantry</p>
          <div className="flex flex-wrap gap-6 mt-6 serif-display text-3xl">
            {["cashews", "pistachios", "almonds"]
              .filter((s) => s !== props.productId)
              .map((s) => (
                <Link
                  key={s}
                  href={`/products/${s}`}
                  className="link-underline italic text-bark hover:text-terracotta"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)} →
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}
