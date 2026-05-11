"use client";

import { useState } from "react";

export default function Wholesale() {
  const [sent, setSent] = useState(false);

  return (
    <article className="grain">
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <p className="text-clay text-xs tracking-[0.3em] uppercase mb-6">— For hotels & bars —</p>
        <h1 className="font-display text-6xl md:text-8xl text-bark leading-[0.95]">
          Bulk, by <br /> the <span className="serif-display text-terracotta">case.</span>
        </h1>
        <p className="serif-display italic text-2xl text-bark/60 mt-8 max-w-2xl">
          Hundred-gram packs, sold by the case. Friendly with the procurement
          spreadsheet. Friendlier with the guest.
        </p>
      </section>

      {/* WHY */}
      <section className="bg-roast text-cream py-20 grain">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl mb-14 max-w-2xl">
            Why hotels and bars buy from us.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: "01", title: "Right format", body: "100g portions in stamped paper bags. Shelf-ready. No re-portioning. No waste." },
              { num: "02", title: "Real pricing", body: "Volume tiers from 200 packs. We send a quote, not a 14-page contract." },
              { num: "03", title: "Honest sourcing", body: "We tell you the grower. You can put it on your menu. Your sommelier will love it." },
            ].map((b) => (
              <div key={b.num}>
                <p className="serif-display text-clay text-2xl mb-3">No.{b.num}</p>
                <h3 className="font-display text-3xl mb-4">{b.title}</h3>
                <p className="text-cream/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="py-20 grain">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">Volume guide</p>
          <h2 className="font-display text-4xl md:text-5xl text-bark mb-12">
            How <span className="serif-display text-terracotta">it scales.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Try it out", count: "200 packs", per: "€3.40", note: "First-order pricing. Mix any three." },
              { name: "Standard", count: "500 packs", per: "€2.90", note: "Most popular for boutique hotels." },
              { name: "Full pallet", count: "2,000+ packs", per: "€2.40", note: "Custom labels available." },
            ].map((t, i) => (
              <div
                key={t.name}
                className={`border border-bark/20 p-8 ${i === 1 ? "bg-bark text-cream" : "bg-parchment"} relative`}
              >
                {i === 1 && (
                  <span className="absolute -top-3 left-8 bg-clay text-cream text-xs tracking-widest uppercase px-3 py-1">
                    Most ordered
                  </span>
                )}
                <p className={`serif-display italic ${i === 1 ? "text-clay" : "text-clay"} text-xl mb-2`}>
                  {t.name}
                </p>
                <p className={`font-display text-4xl mb-1 ${i === 1 ? "text-cream" : "text-bark"}`}>
                  {t.count}
                </p>
                <p className={`text-sm ${i === 1 ? "text-cream/60" : "text-bark/60"} mb-6`}>
                  per 100g pack
                </p>
                <p className={`serif-display text-3xl ${i === 1 ? "text-clay" : "text-terracotta"} mb-4`}>
                  {t.per}
                </p>
                <p className={`text-sm ${i === 1 ? "text-cream/70" : "text-bark/70"} leading-relaxed`}>
                  {t.note}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-bark/60 italic">
            Prices are indicative — final quote depends on the mix and shipping.
          </p>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section className="bg-parchment border-y border-bark/10 py-20 grain">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">Get a quote</p>
          <h2 className="font-display text-4xl md:text-5xl text-bark mb-10">
            Tell us about your place.
          </h2>

          <div className="border border-bark/20 bg-cream p-8 md:p-10 shadow-[8px_8px_0_#2d1f15] relative">
            <div className="absolute inset-0 grain pointer-events-none" />
            {sent ? (
              <div className="relative text-center py-16">
                <p className="serif-display text-clay text-7xl mb-4">✓</p>
                <p className="serif-display italic text-3xl text-bark mb-3">Cheers — quote on its way.</p>
                <p className="text-bark/70">We usually reply within one working day.</p>
              </div>
            ) : (
              <div className="relative grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Business name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Type
                  </label>
                  <select className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta">
                    <option>Hotel</option>
                    <option>Bar</option>
                    <option>Restaurant</option>
                    <option>Retail / Shop</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    City / country
                  </label>
                  <input
                    type="text"
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Estimated volume / month
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 300 packs"
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Anything else?
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-parchment border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta resize-none"
                  />
                </div>
                <div className="md:col-span-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setSent(true)}
                    className="btn-stamp"
                  >
                    Request a quote →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
