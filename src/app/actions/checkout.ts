"use server";

import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type CartItemInput = { productId: string; qty: number };

/**
 * Creates a Stripe checkout session and redirects the user to it.
 *
 * SECURITY NOTE: We never trust prices from the browser. The browser only
 * sends product IDs and quantities. We look up the actual prices from our
 * own product catalog (PRODUCTS) here on the server. This is critical —
 * otherwise a sneaky user could open dev tools and change CHF 5.80 to 0.01.
 */
export async function createCheckoutSession(items: CartItemInput[]) {
  // ─── 1. Validate input ──────────────────────────────────────────────────
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty");
  }

  // ─── 2. Build line items from our trusted catalog ───────────────────────
  const lineItems = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) return null;
      const qty = Math.max(1, Math.min(99, Math.floor(item.qty))); // clamp 1-99
      return {
        price_data: {
          currency: "chf",
          product_data: {
            name: product.name,
            description: `${product.weight} · ${product.tagline}`,
          },
          // Stripe expects the smallest currency unit — for CHF that's rappen
          unit_amount: product.priceRappen,
          // Swiss VAT for food is 2.6% — let Stripe Tax handle this if you
          // enable it later. For now we treat prices as VAT-included.
          tax_behavior: "inclusive" as const,
        },
        quantity: qty,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (lineItems.length === 0) {
    throw new Error("No valid items in cart");
  }

  // ─── 3. Where Stripe should send the user after checkout ────────────────
  const origin = headers().get("origin") ?? "http://localhost:3000";

  // ─── 4. Create the session ──────────────────────────────────────────────
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // Cards work everywhere. TWINT is huge in Switzerland — turn it on in
    // your Stripe dashboard under "Payment methods" once your account is
    // approved, then it'll appear automatically.
    payment_method_types: ["card"],
    line_items: lineItems,

    // Switzerland-only shipping — restrict to CH so no one orders from abroad
    // before he's set up international logistics.
    shipping_address_collection: {
      allowed_countries: ["CH", "LI"], // Liechtenstein uses CHF too
    },

    // Flat-rate shipping. Swap this for proper rates later.
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 700, currency: "chf" }, // CHF 7.00 flat
          display_name: "Swiss Post — 2-3 working days",
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 1200, currency: "chf" }, // CHF 12.00
          display_name: "Swiss Post Priority — next working day",
        },
      },
    ],

    // We need the email to send order confirmations later
    customer_email: undefined, // Stripe will collect this on the checkout page

    // Where Stripe redirects the customer after payment
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancelled`,

    // Useful metadata you can read in the webhook later
    metadata: {
      source: "kernel-co-website",
    },

    // Switzerland is German/French/Italian/Romansh — let Stripe pick based
    // on the customer's browser. Set it explicitly if you only want one.
    locale: "auto",
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  // Redirect user straight to Stripe-hosted checkout page
  redirect(session.url);
}
