/**
 * The single source of truth for all products.
 * Prices are in RAPPEN (1 CHF = 100 rappen) — Stripe expects integer amounts.
 *
 * IMPORTANT — Swiss VAT note:
 * Food in Switzerland is at the reduced VAT rate of 2.6%.
 * The prices below are TVA-included (gross). Stripe will charge what you list.
 * Once the business crosses the CHF 100,000/year threshold, you'll need to
 * register for VAT and send tax-properly-itemized invoices.
 */

export type Product = {
  id: "cashews" | "pistachios" | "almonds";
  name: string;
  tagline: string;
  /** Price in RAPPEN, not CHF. e.g. 580 = CHF 5.80 */
  priceRappen: number;
  weight: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "cashews",
    name: "Cashews — Tanzania",
    tagline: "Buttery, broken-in-half kind",
    priceRappen: 580, // CHF 5.80
    weight: "100g",
  },
  {
    id: "pistachios",
    name: "Pistachios — Iran",
    tagline: "Salt, sun, and a stubborn shell",
    priceRappen: 720, // CHF 7.20
    weight: "100g",
  },
  {
    id: "almonds",
    name: "Almonds — Spain",
    tagline: "Toasted slow, nothing else added",
    priceRappen: 640, // CHF 6.40
    weight: "100g",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Format rappen as CHF — e.g. 580 → "CHF 5.80" */
export function formatChf(rappen: number): string {
  return `CHF ${(rappen / 100).toFixed(2)}`;
}
