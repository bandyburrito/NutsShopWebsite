import Link from "next/link";

export default function About() {
  return (
    <article className="grain">
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <p className="text-clay text-xs tracking-[0.3em] uppercase mb-6">— Our story —</p>
        <h1 className="font-display text-6xl md:text-8xl text-bark leading-[0.95]">
          We started <br /> with <span className="serif-display text-terracotta">one sack.</span>
        </h1>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 space-y-8 text-lg text-bark/80 leading-relaxed">
        <p>
          A friend ran a small hotel and complained — for the third time that
          year — that the welcome nuts on his pillows tasted like cardboard.
          We looked at the supplier list. Six middlemen between the grower
          and the pillow.
        </p>

        <p className="serif-display italic text-2xl text-clay border-l-2 border-clay pl-6 my-12">
          So we bought a sack ourselves. Then another. Then a tonne.
        </p>

        <p>
          We rented a small room. We bought a scale, a heat sealer, and
          stamped paper bags. We started splitting that tonne into hundred-
          gram parcels, by hand, on a wooden table.
        </p>

        <p>
          That's still how we do it. The room is bigger now. The table is the
          same. We're picky about who we buy from — we'd rather sell three
          things we love than thirty we don't.
        </p>
      </section>

      {/* THREE PRINCIPLES */}
      <section className="bg-parchment border-y border-bark/10 py-20 grain">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl text-bark mb-16">
            Three things we won't do.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "We won't blend.",
                body: "Every bag is one origin, one roast, one batch. No mystery mix.",
              },
              {
                num: "02",
                title: "We won't add weird stuff.",
                body: "Salt and oil. That's the list. If it needs flavouring, the nut wasn't good enough to start with.",
              },
              {
                num: "03",
                title: "We won't pretend to be big.",
                body: "We pack a few thousand bags a week, by hand. If we run out, we run out.",
              },
            ].map((p) => (
              <div key={p.num}>
                <p className="serif-display text-clay text-2xl mb-3">No.{p.num}</p>
                <h3 className="font-display text-3xl text-bark mb-4">{p.title}</h3>
                <p className="text-bark/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="serif-display italic text-3xl text-bark/80 mb-10">
          Want some in your hotel, bar, or cupboard?
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/wholesale" className="btn-stamp">Wholesale</Link>
          <Link href="/contact" className="btn-stamp btn-stamp-outline">Get in touch</Link>
        </div>
      </section>
    </article>
  );
}
