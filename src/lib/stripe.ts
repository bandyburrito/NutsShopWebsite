import Stripe from "stripe";

/**
 * Server-only Stripe client.
 *
 * We delay throwing until the client is actually used — that way the site
 * works fine during pre-launch even if the key isn't set.
 *
 * NEVER import this from a "use client" component — it would leak the secret
 * key into the browser bundle.
 */

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "sk_test_placeholder") {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local — see .env.local.example. " +
        "If you're still in pre-launch mode, you shouldn't be hitting checkout yet."
    );
  }
  cached = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  return cached;
}

/**
 * Convenience export for existing code that uses `stripe` as a value.
 * Calling any method on this proxy initializes the real client.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return Reflect.get(getStripe(), prop);
  },
});
