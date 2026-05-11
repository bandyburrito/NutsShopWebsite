# Development guide

Everything you need to run the project locally, set up Stripe, view signup data, and prepare for launch.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000.

In **pre-launch mode** (the default), no Stripe keys are needed — the site runs fully without any external services configured.

---

## Environment variables

Edit `.env.local` (copy from `.env.local.example`):

```bash
# Optional — only needed to view the notify-me signup list at /admin/notify-list
ADMIN_KEY=pick-any-random-string-you-want

# Optional during pre-launch — required when going live
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

`.env.local` is gitignored — never commit it.

---

## The launch-mode toggle

`src/lib/launch-mode.ts` has one line that controls the whole site:

```ts
export const LAUNCH_MODE: LaunchMode = "preLaunch";
```

| Mode | What changes |
|---|---|
| `"preLaunch"` | Notify-me forms shown, checkout disabled, "launching soon" section visible, no Stripe keys needed |
| `"live"` | Real checkout active, banners removed, "Add to basket" buttons everywhere, Stripe required |

---

## Viewing notify-me signups

1. Set `ADMIN_KEY` in `.env.local` to any random string
2. Restart `npm run dev`
3. Open `http://localhost:3000/admin/notify-list?key=YOUR_KEY`

Wrong key → 404. So if `ADMIN_KEY` isn't set, the page doesn't exist.

Signups are stored in `data/notify-list.json` (gitignored).

---

## Changing prices and products

Single source of truth: `src/lib/products.ts`.

Prices are in **rappen** (1 CHF = 100 rappen) — Stripe expects integer amounts.
- `580` = `CHF 5.80`
- `1200` = `CHF 12.00`

Never hardcode prices anywhere else. The cart, checkout server action, and Stripe line items all read from this catalog.

---

## Adding real product photos

See `PHOTOS.md` for the photo brief. Once you have files:

1. Drop `cashews.jpg`, `pistachios.jpg`, `almonds.jpg` into `/public/`
2. In each `src/app/products/<name>/page.tsx`, uncomment the `// photo="..."` line
3. In `src/app/page.tsx`, change `photo: ""` to `photo: "/cashews.jpg"` (etc.) in the homepage product card data

---

## Stripe setup

### Test mode (start here)

1. Sign up at https://stripe.com (free, no card required for test mode)
2. Dashboard → Developers → API keys → copy:
   - `pk_test_…` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `sk_test_…` → `STRIPE_SECRET_KEY`
3. Restart `npm run dev`

### Webhooks (local testing)

Install the Stripe CLI:
```bash
# Arch / CachyOS:
yay -S stripe-cli

# macOS:
brew install stripe/stripe-cli/stripe

# Or download from https://stripe.com/docs/stripe-cli
```

In a second terminal, run:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

It'll print a webhook secret like `whsec_xxxx`. Put it in `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_xxxx
```

### Test cards

| Result | Card number |
|---|---|
| ✅ Success | `4242 4242 4242 4242` |
| 🔐 3D Secure required | `4000 0027 6000 3184` |
| ❌ Declined | `4000 0000 0000 9995` |

Any future expiry, any 3-digit CVC, any postcode.

### Going live

1. Switch from test keys to live keys (`sk_live_…`, `pk_live_…`)
2. In Stripe Dashboard → Webhooks → add an endpoint pointing to `https://yourdomain.ch/api/webhooks/stripe` and copy that webhook secret
3. Stripe Dashboard → Payment methods → enable **TWINT** (very common in Switzerland)
4. Stripe Dashboard → Tax → configure VAT for Switzerland (food is at 2.6%)

---

## Daily git workflow

Using GitHub Desktop:
1. Make your changes in VS Code, save
2. Open GitHub Desktop — review the diffs
3. Write a clear commit message (e.g. `"updated cashew price to CHF 6.20"`)
4. **Commit to main** → **Push origin**

---

## Build and deploy

```bash
npm run build       # production build
npm start           # serve the built site locally
```

For deployment, the project is set up for Vercel:
1. Push to GitHub (already done)
2. Connect the repo at https://vercel.com
3. Add the environment variables in Vercel's project settings
4. Every push to `main` auto-deploys

---

## Launch checklist 🚨

Before flipping `LAUNCH_MODE` to `"live"`:

### Content
- [ ] Real product photos (`PHOTOS.md` has the brief)
- [ ] Real prices set in `src/lib/products.ts`
- [ ] Real business name (currently "Kernel & Co.")
- [ ] Real contact info (search code for `+00`, `hello@kernel-co`, "Street address")
- [ ] Allergen declarations on each product page (legally required for food)
- [ ] Storage and best-before dates

### Legal (Switzerland)
- [ ] Privacy policy page (FADP compliance)
- [ ] Terms of service / general conditions
- [ ] Right of withdrawal info (14 days, food exceptions apply)
- [ ] Imprint / legal notice (Swiss requirement)
- [ ] Cookie banner if analytics are added

### Business
- [ ] Stripe account verified (business registration, bank account)
- [ ] VAT registration if revenue > CHF 100,000/year expected
- [ ] Food handling / safety registration with local authorities
- [ ] Real shipping rates (current ones in `actions/checkout.ts` are placeholders)
- [ ] Domain registered and pointed at Vercel

### Tech
- [ ] Swap notify-me storage from local JSON to a real service before going live (Vercel's filesystem is read-only in production)
- [ ] Email service (Resend.com recommended) wired into the webhook handler for order confirmations
- [ ] Contact and wholesale forms hooked up to a real email destination
- [ ] Live Stripe keys in production env vars
- [ ] Webhook endpoint registered in Stripe dashboard with production secret
- [ ] TWINT enabled in Stripe payment methods
- [ ] Test full checkout flow end-to-end in live mode

### Final step
- [ ] Change `LAUNCH_MODE` from `"preLaunch"` to `"live"` in `src/lib/launch-mode.ts`
- [ ] Commit, push — Vercel auto-deploys live mode

---

## Useful commands

```bash
npm run dev          # development server
npm run build        # production build
npm start            # serve built app
npm run lint         # check code style
```

---

## Where things live

- **Colors and design tokens** → `tailwind.config.js` + `src/app/globals.css`
- **Fonts** → top of `src/app/globals.css` (Google Fonts import)
- **Product data** → `src/lib/products.ts`
- **Cart logic** → `src/lib/cart-context.tsx`
- **Stripe session creation** → `src/app/actions/checkout.ts`
- **Notify-me storage** → `src/app/actions/notify.ts`
- **Webhook handler** → `src/app/api/webhooks/stripe/route.ts`
- **Launch mode toggle** → `src/lib/launch-mode.ts`
