import Link from "next/link";

export default function CheckoutCancelled() {
  return (
    <article className="grain min-h-[60vh]">
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-clay text-xs tracking-[0.3em] uppercase mb-4">— No worries —</p>
        <h1 className="font-display text-6xl md:text-7xl text-bark leading-[0.95] mb-8">
          Order <span className="serif-display text-terracotta">paused.</span>
        </h1>
        <p className="serif-display italic text-2xl text-bark/70 max-w-md mx-auto mb-10">
          Your basket's still here whenever you're ready.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-stamp">
            Back home
          </Link>
          <Link href="/products/cashews" className="btn-stamp btn-stamp-outline">
            Keep browsing →
          </Link>
        </div>
      </section>
    </article>
  );
}
