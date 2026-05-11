import Link from "next/link";
import CartButton from "./CartButton";
import { isPreLaunch } from "@/lib/launch-mode";

export default function Header() {
  const preLaunch = isPreLaunch();
  return (
    <>
      {/* Pre-launch top strip — sits above the header */}
      {preLaunch && (
        <div className="bg-bark text-cream text-center text-xs tracking-[0.25em] uppercase py-2 px-4">
          <span className="text-clay">·</span>
          <span className="mx-3">Pre-launch preview · Coming soon to Switzerland</span>
          <span className="text-clay">·</span>
        </div>
      )}

      <header className="border-b border-bark/15 bg-cream/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="serif-display text-2xl text-bark">Kernel</span>
            <span className="text-clay text-xl">&</span>
            <span className="serif-display text-2xl text-bark">Co.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-bark/80">
            <Link href="/" className="link-underline">Home</Link>
            <Link href="/products/cashews" className="link-underline">Cashews</Link>
            <Link href="/products/pistachios" className="link-underline">Pistachios</Link>
            <Link href="/products/almonds" className="link-underline">Almonds</Link>
            <Link href="/about" className="link-underline">Story</Link>
            <Link href="/wholesale" className="link-underline">Wholesale</Link>
            <Link href="/contact" className="link-underline">Contact</Link>
          </nav>

          <CartButton />
        </div>
      </header>
    </>
  );
}
