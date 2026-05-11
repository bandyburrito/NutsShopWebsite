import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

/**
 * Stripe webhook endpoint.
 *
 * Stripe sends a server-to-server POST here when payment events happen.
 * This is more reliable than the success-page redirect because:
 *  1. The customer might close their browser before being redirected
 *  2. The success-page can be faked, webhooks are cryptographically signed
 *
 * For now we just log events. Later you'll want to:
 *  - Send an order confirmation email to the customer
 *  - Send a "new order!" email/Slack to your collaborator
 *  - Save the order to a database for tracking
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe-signature header", { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Server is missing STRIPE_WEBHOOK_SECRET", { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", msg);
    return new NextResponse(`Webhook Error: ${msg}`, { status: 400 });
  }

  // ─── Handle the event ───────────────────────────────────────────────────
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✓ Payment successful for session:", session.id);
      console.log("  Customer:", session.customer_details?.email);
      console.log("  Amount:", session.amount_total, session.currency);
      // TODO: send confirmation email
      // TODO: notify collaborator (email or Slack)
      // TODO: save order to a database
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Session expired (customer didn't pay):", session.id);
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      console.log("Refund issued for charge:", charge.id);
      break;
    }
    default:
      // Lots of other event types Stripe sends — ignore the ones we don't care about
      console.log("Unhandled event type:", event.type);
  }

  // Always 200 quickly so Stripe doesn't think we failed and retry
  return NextResponse.json({ received: true });
}
