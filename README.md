# Kernel & Co.

A small-batch nut shop website — built with Next.js, TypeScript, and Tailwind CSS.

The site sells 100g packets of cashews, pistachios, and almonds, sourced from single growers and packed by hand. It targets two audiences: walk-in online customers and wholesale buyers (hotels, bars, restaurants).

> 🚧 Currently in **pre-launch mode**. Online checkout is disabled while the business gets set up; visitors can browse and join a notify-me list. Flipping a single config value enables the full e-commerce flow.

---

## What's in it

- **Marketing pages** — homepage with hero, brand story, and "who it's for" sections
- **Three product pages** — each with origin, sourcing notes, and a paper-label-styled illustration (real photos slot in when available)
- **About / Story** page
- **Contact** page with email form
- **Wholesale inquiry** page with B2B pricing tiers and quote form
- **Cart system** — drawer-style basket with localStorage persistence
- **Stripe Checkout** — server-side session creation, CHF currency, Swiss shipping, VAT-inclusive pricing
- **Webhook endpoint** — handles `checkout.session.completed` and related events
- **Pre-launch mode** — a one-line toggle that hides checkout and shows a "launching soon" section with email signup
- **Hidden admin route** — view the notify-me list locally with a secret key

---

## Tech

| Layer | Stack |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Payments | Stripe (test mode by default) |
| State | React Context + localStorage |
| Forms | Server Actions |
| Hosting | Vercel-ready |

No database. Notify-me signups are stored in a local JSON file during pre-launch; this gets swapped for a proper email service (Resend / Mailchimp) before going live.

---

## Design

Warm, rustic, artisan-shop feel — meant to evoke a hand-stamped paper bag rather than a glossy e-commerce site. The palette is built around cream, clay, terracotta, and a deep roasted brown, with a subtle paper-grain texture overlaid on most sections. Typography pairs Fraunces (serif, for headings and accents) with Inter Tight (sans, for body text).

Buttons use a "stamp" treatment — hard edges, drop shadow on hover, no rounded corners. Section dividers use small dots and minimal lines instead of heavy borders.

---

## Pre-launch vs live mode

One file controls the entire site's behavior: `src/lib/launch-mode.ts`.

```ts
export const LAUNCH_MODE: LaunchMode = "preLaunch";
```

Change `"preLaunch"` to `"live"` to:
- Hide the launching-soon banner and homepage section
- Re-enable real Stripe checkout
- Switch all "Notify me at launch" buttons to "Add to basket"

This means the same codebase serves both stages with no branching or feature flags scattered across files.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                    Homepage
│   ├── layout.tsx                  Shared layout (header, footer, cart provider)
│   ├── about/                      Brand story
│   ├── contact/                    Contact form
│   ├── wholesale/                  B2B inquiry page
│   ├── products/                   Cashews, pistachios, almonds
│   ├── checkout/                   Stripe success and cancelled pages
│   ├── admin/notify-list/          Email signup admin (key-protected)
│   ├── actions/                    Server actions: checkout, notify
│   └── api/webhooks/stripe/        Stripe webhook handler
├── components/                     Header, footer, cart, product page, forms
└── lib/
    ├── launch-mode.ts              The one-line mode toggle
    ├── products.ts                 Product catalog (single source of truth)
    ├── stripe.ts                   Server-only Stripe client
    └── cart-context.tsx            Cart state with localStorage sync
```

---

## Running it locally

See [DEVELOPMENT.md](./DEVELOPMENT.md) for full setup instructions, environment variables, Stripe test mode, and the launch checklist.

The short version:
```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Then open `http://localhost:3000`. During pre-launch mode no Stripe keys are required.

---

## Status

🚧 Work in progress. The site is functional but still has placeholder content (product photos, business contact details, real prices, legal pages). See `DEVELOPMENT.md` for the launch checklist.
