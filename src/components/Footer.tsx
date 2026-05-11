import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bark text-cream/85 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="serif-display text-3xl text-cream">Kernel</span>
            <span className="text-clay text-2xl">&</span>
            <span className="serif-display text-3xl text-cream">Co.</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-cream/70">
            Small-batch nuts, sourced direct from growers and packed
            by hand in 100g portions. For places that care what they serve.
          </p>
        </div>

        <div>
          <h4 className="serif-display text-xl mb-4 text-clay">Wander</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="link-underline">Home</Link></li>
            <li><Link href="/about" className="link-underline">Our Story</Link></li>
            <li><Link href="/wholesale" className="link-underline">Wholesale</Link></li>
            <li><Link href="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="serif-display text-xl mb-4 text-clay">The pantry</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products/cashews" className="link-underline">Cashews</Link></li>
            <li><Link href="/products/pistachios" className="link-underline">Pistachios</Link></li>
            <li><Link href="/products/almonds" className="link-underline">Almonds</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs text-cream/50 gap-2">
          <p>© {new Date().getFullYear()} Kernel & Co. Packed with patience.</p>
          <p className="serif-display italic">est. small, growing slowly</p>
        </div>
      </div>
    </footer>
  );
}
