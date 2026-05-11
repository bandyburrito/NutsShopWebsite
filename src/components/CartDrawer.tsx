"use client";

import { useCart } from "@/lib/cart-context";
import { PRODUCTS, formatChf } from "@/lib/products";
import { createCheckoutSession } from "@/app/actions/checkout";
import { isPreLaunch } from "@/lib/launch-mode";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    setQty,
    removeItem,
    totalRappen,
    totalQty,
    clearCart,
  } = useCart();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const preLaunch = isPreLaunch();

  function handleCheckout() {
    setError(null);
    startTransition(async () => {
      try {
        await createCheckoutSession(
          items.map((i) => ({ productId: i.productId, qty: i.qty }))
        );
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong";
        if (msg.includes("NEXT_REDIRECT")) return;
        setError(msg);
      }
    });
  }

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-bark/40 backdrop-blur-sm z-[60] transition-opacity ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-bark/15 flex items-center justify-between">
          <div>
            <p className="text-clay text-xs tracking-[0.3em] uppercase">
              {preLaunch ? "Pre-launch preview" : "Your basket"}
            </p>
            <h2 className="serif-display text-3xl text-bark">
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="text-bark/60 hover:text-bark text-2xl px-2"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {/* Pre-launch notice strip */}
        {preLaunch && (
          <div className="bg-clay/15 border-b border-clay/20 px-6 py-3 text-xs text-bark/80 leading-relaxed">
            <span className="serif-display italic text-clay mr-1">·</span>
            We're not selling online quite yet — but your basket previews how
            much your order will cost.
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="text-center py-16 text-bark/60">
              <p className="serif-display italic text-2xl mb-3">Empty.</p>
              <p className="text-sm">
                {preLaunch
                  ? "Try the products — your basket builds a preview total."
                  : "Add a packet or two and they'll show up here."}
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;
                return (
                  <li
                    key={item.productId}
                    className="flex gap-4 pb-6 border-b border-bark/10 last:border-0"
                  >
                    <div className="w-20 h-20 bg-parchment border border-bark/15 flex items-center justify-center serif-display italic text-bark/50 text-sm shrink-0">
                      {product.id.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="serif-display text-xl text-bark leading-tight">
                        {product.name}
                      </p>
                      <p className="text-xs text-bark/60 mb-3">
                        {product.weight} · {formatChf(product.priceRappen)} each
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border border-bark/30">
                          <button
                            onClick={() => setQty(item.productId, item.qty - 1)}
                            className="w-8 h-8 hover:bg-bark hover:text-cream"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-sm">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.productId, item.qty + 1)}
                            className="w-8 h-8 hover:bg-bark hover:text-cream"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="serif-display text-lg text-bark">
                          {formatChf(product.priceRappen * item.qty)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="mt-2 text-xs text-bark/50 hover:text-terracotta link-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-bark/15 bg-parchment space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-bark/70">
                {preLaunch ? "Preview total (VAT incl.)" : "Subtotal (VAT incl.)"}
              </span>
              <span className="serif-display text-2xl text-bark">
                {formatChf(totalRappen)}
              </span>
            </div>
            <p className="text-xs text-bark/60 italic">
              {preLaunch
                ? "Shipping will be calculated at real checkout."
                : "Shipping calculated at checkout."}
            </p>

            {error && (
              <p className="text-sm text-terracotta bg-cream border border-terracotta/30 p-3">
                {error}
              </p>
            )}

            {preLaunch ? (
              <>
                <Link
                  href="/#notify"
                  onClick={closeCart}
                  className="btn-stamp w-full block text-center"
                >
                  Notify me at launch →
                </Link>
                <p className="text-xs text-bark/50 text-center italic">
                  We'll email when this checkout is open for real orders.
                </p>
              </>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isPending}
                className="btn-stamp w-full disabled:opacity-50 disabled:cursor-wait"
              >
                {isPending ? "Connecting to Stripe…" : "Checkout →"}
              </button>
            )}
            <button
              onClick={clearCart}
              className="text-xs text-bark/50 hover:text-terracotta link-underline mx-auto block"
            >
              Empty basket
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
