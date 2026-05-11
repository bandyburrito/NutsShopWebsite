import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import NotifyMeForm from "@/components/NotifyMeForm";
import { PRODUCTS, formatChf } from "@/lib/products";
import { isPreLaunch, ESTIMATED_LAUNCH } from "@/lib/launch-mode";

export default function Home() {
  const preLaunch = isPreLaunch();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7 rise rise-1">
            {preLaunch ? (
              <p className="text-clay text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-clay animate-pulse" />
                Coming {ESTIMATED_LAUNCH} · Switzerland
              </p>
            ) : (
              <p className="text-clay text-xs tracking-[0.3em] uppercase mb-6">
                · Small batch · Sourced direct · Packed by hand · Made in Switzerland ·
              </p>
            )}
            <h1 className="font-display text-bark leading-[0.95] text-6xl md:text-8xl tracking-tight">
              Honest <span className="serif-display text-terracotta">nuts.</span>
              <br />
              Nothing <span className="serif-display text-terracotta">fancy.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg text-bark/75 leading-relaxed">
              We buy a tonne at a time, from growers we trust, and split it into
              hundred-gram parcels. The kind you'd find on a hotel pillow or
              beside a glass of something cold.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {preLaunch ? (
                <>
                  <Link href="#notify" className="btn-stamp">
                    Notify me at launch →
                  </Link>
                  <Link href="/products/cashews" className="btn-stamp btn-stamp-outline">
                    Browse the pantry
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/products/cashews" className="btn-stamp">
                    See what we pack
                  </Link>
                  <Link href="/wholesale" className="btn-stamp btn-stamp-outline">
                    For bars & hotels →
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-5 relative rise rise-3">
            <div className="aspect-[4/5] bg-parchment border border-bark/20 p-8 relative shadow-[8px_8px_0_#2d1f15]">
              <div className="absolute inset-0 grain pointer-events-none" />
              <div className="border border-bark/40 h-full p-6 flex flex-col items-center justify-center text-center">
                <p className="text-xs tracking-[0.4em] text-clay uppercase mb-4">No.01</p>
                <h3 className="serif-display text-5xl text-bark mb-2">Cashew</h3>
                <p className="text-bark/60 text-sm italic mb-8">— anacardium occidentale —</p>
                <svg viewBox="0 0 100 60" className="w-32 h-20 text-roast">
                  <path
                    d="M 20 30 Q 25 15, 50 18 Q 78 22, 80 35 Q 82 48, 60 50 Q 35 52, 22 45 Q 15 40, 20 30 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                  <path
                    d="M 30 28 Q 50 22, 65 30"
                    stroke="#f4ecde"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
                <p className="mt-8 text-xs tracking-[0.3em] text-bark/60 uppercase">
                  100g · packed by hand
                </p>
                <div className="mt-4 w-12 h-px bg-clay" />
                <p className="mt-3 serif-display italic text-clay">net wt. 100g</p>
              </div>
            </div>
            <p className="absolute -top-4 -left-4 serif-display italic text-roast/40 text-7xl select-none -rotate-12">
              ·
            </p>
          </div>
        </div>
      </section>

      {/* ─── LAUNCHING SOON SECTION (only during pre-launch) ────────────── */}
      {preLaunch && (
        <section id="notify" className="bg-roast text-cream grain border-y border-bark/10 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="text-clay text-xs tracking-[0.3em] uppercase mb-5 flex items-center gap-3">
                <span className="inline-block w-2 h-2 rounded-full bg-clay animate-pulse" />
                Work in progress
              </p>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
                We're still setting up the<br />
                <span className="serif-display italic text-clay">packing room.</span>
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed max-w-xl mb-3">
                The first tonne of cashews is in transit. The scales are calibrated.
                The paper bags are stamped. We're sorting the last bits — licences,
                deliveries, a phone line — and aim to open in <strong>{ESTIMATED_LAUNCH}</strong>.
              </p>
              <p className="text-cream/60 text-sm italic">
                Drop your email and you'll be the first to know when our doors open.
                No newsletter spam, just one quiet message when we're ready.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="bg-bark/40 border border-cream/15 p-7">
                <p className="serif-display italic text-clay mb-1">Be the first.</p>
                <p className="text-xs tracking-[0.3em] text-cream/60 uppercase mb-5">
                  Notify-me list
                </p>
                <NotifyMeForm variant="dark" placeholder="your@email.ch" />
              </div>
              <p className="text-xs text-cream/40 mt-3 italic leading-relaxed">
                We'll only use this to tell you we're live. You can unsubscribe
                with one click.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="bg-parchment grain py-24 border-y border-bark/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="divider text-xs tracking-[0.3em] uppercase mb-3">
                <span>Three things, done well</span>
              </p>
              <h2 className="font-display text-5xl md:text-6xl text-bark">
                The <span className="serif-display text-terracotta">pantry</span>
              </h2>
            </div>
            <p className="text-bark/70 max-w-sm">
              We don't believe in twenty kinds of anything. Just the three
              we'd actually want on our own counter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => {
              const cardData = [
                { num: "01", color: "text-clay", origin: "Tanzania", photo: "" },
                { num: "02", color: "text-olive", origin: "Iran", photo: "" },
                { num: "03", color: "text-roast", origin: "Spain", photo: "" },
              ][idx];
              const shortName = product.name.split(" — ")[0];

              return (
                <div
                  key={product.id}
                  className="group bg-cream border border-bark/15 p-8 transition-all hover:shadow-[6px_6px_0_#2d1f15] hover:-translate-y-1 hover:-translate-x-1 flex flex-col"
                >
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="aspect-[4/3] mb-6 -mx-2 -mt-2 overflow-hidden bg-parchment">
                      {cardData.photo ? (
                        <img
                          src={cardData.photo}
                          alt={shortName}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full border-2 border-dashed border-bark/20 flex flex-col items-center justify-center text-bark/40">
                          <span className="serif-display italic text-3xl mb-1">
                            {shortName}
                          </span>
                          <span className="text-xs tracking-[0.3em] uppercase">
                            photo soon
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`serif-display text-2xl ${cardData.color}`}>
                        No.{cardData.num}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-bark/50">
                        {cardData.origin}
                      </span>
                    </div>
                    <h3 className="font-display text-4xl text-bark mb-2">{shortName}</h3>
                    <p className="serif-display italic text-bark/60 mb-6">
                      {product.tagline}
                    </p>
                  </Link>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-bark/15 gap-3">
                    <span className="text-sm text-bark/70">
                      {product.weight} · {formatChf(product.priceRappen)}
                    </span>
                    <AddToCartButton
                      productId={product.id}
                      label={preLaunch ? "Preview" : "Add"}
                      className="!py-2 !px-4 !text-[10px]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE STORY STRIP */}
      <section className="py-24 grain">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <p className="serif-display text-9xl text-clay/20 leading-none">"</p>
            <p className="serif-display italic text-2xl text-bark/80 -mt-12 leading-relaxed">
              Most snack nuts pass through six middlemen. We try our best to
              skip five of them.
            </p>
          </div>
          <div className="md:col-span-7 space-y-6">
            <p className="text-clay text-xs tracking-[0.3em] uppercase">How we work</p>
            <h2 className="font-display text-4xl md:text-5xl text-bark leading-tight">
              We buy the whole sack.
            </h2>
            <p className="text-bark/75 leading-relaxed">
              A tonne at a time. From the same grower, where we can. We split
              that tonne into ten thousand small parcels — each one weighed,
              sealed, and stamped here in our own room.
            </p>
            <p className="text-bark/75 leading-relaxed">
              No middleman markup. No mystery blend. The bag you open in your
              hotel room came out of the same sack as the bag at the bar
              downstairs.
            </p>
            <Link href="/about" className="inline-block mt-4 link-underline serif-display italic text-terracotta">
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="bg-roast text-cream py-24 grain">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-clay text-xs tracking-[0.3em] uppercase mb-3">For</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16 max-w-2xl">
            Places that care <span className="serif-display text-clay">what they serve.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Hotels", body: "Mini-bars, welcome trays, room service. We supply hundred-gram packets that look like they belong on a tray, not in a vending machine." },
              { title: "Bars", body: "House snacks that don't taste like every other house snack. Small format, easy to portion, no waste." },
              { title: "At home", body: "Order online, ships across Switzerland. The same nuts the hotels get — minus the hotel markup." },
            ].map((b, i) => (
              <div key={b.title} className={`rise rise-${i + 1}`}>
                <p className="serif-display text-clay text-2xl mb-3">0{i + 1}</p>
                <h3 className="font-display text-3xl mb-4">{b.title}</h3>
                <p className="text-cream/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link href="/wholesale" className="btn-stamp" style={{ background: "#f4ecde", color: "#2d1f15", borderColor: "#f4ecde" }}>
              Wholesale inquiry
            </Link>
            <Link href="/contact" className="btn-stamp btn-stamp-outline" style={{ color: "#f4ecde", borderColor: "#f4ecde" }}>
              Just say hi →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
