"use client";

import { useCart } from "@/lib/cart-context";
import { isPreLaunch } from "@/lib/launch-mode";

export default function CartButton() {
  const { totalQty, openCart } = useCart();
  const preLaunch = isPreLaunch();

  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 px-4 py-2.5 border border-bark text-bark hover:bg-bark hover:text-cream transition-colors text-xs tracking-widest uppercase"
      aria-label={`Open basket, ${totalQty} items`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6h18l-2 12H5L3 6z M9 10v4 M15 10v4 M3 6L2 3H0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{preLaunch ? "Preview" : "Basket"}</span>
      {totalQty > 0 && (
        <span className="absolute -top-2 -right-2 bg-terracotta text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalQty}
        </span>
      )}
    </button>
  );
}
