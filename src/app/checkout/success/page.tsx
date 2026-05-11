import Link from "next/link";
import { stripe } from "@/lib/stripe";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  let customerName: string | null = null;
  let amountTotal: number | null = null;

  if (searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      customerName = session.customer_details?.name ?? null;
      amountTotal = session.amount_total;
    } catch {
      // Ignore — show generic thank-you
    }
  }

  return (
    <article className="grain min-h-[70vh]">
      <ClearCartOnMount />
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="serif-display text-clay text-8xl mb-4">✓</p>
        <p className="text-clay text-xs tracking-[0.3em] uppercase mb-4">— Thank you —</p>
        <h1 className="font-display text-6xl md:text-8xl text-bark leading-[0.95] mb-8">
          {customerName ? `Cheers, ${customerName.split(" ")[0]}.` : "Cheers!"}
        </h1>
        <p className="serif-display italic text-2xl text-bark/70 mb-2">
          Your order is in the basket.
        </p>
        {amountTotal && (
          <p className="text-bark/60 text-lg">
            Total paid: CHF {(amountTotal / 100).toFixed(2)}
          </p>
        )}
        <p className="text-bark/70 mt-8 max-w-md mx-auto leading-relaxed">
          We'll send a confirmation email shortly with your order details and
          tracking info as soon as it ships. Most orders go out within 1–2
          working days.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-stamp">
            Back home
          </Link>
          <Link href="/products/cashews" className="btn-stamp btn-stamp-outline">
            Keep shopping →
          </Link>
        </div>
      </section>
    </article>
  );
}
