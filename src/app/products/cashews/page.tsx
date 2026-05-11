import ProductPage from "@/components/ProductPage";

export default function Cashews() {
  return (
    <ProductPage
      productId="cashews"
      number="01"
      latin="anacardium occidentale"
      // To use a real photo: drop a file at /public/cashews.jpg and uncomment:
      // photo="/cashews.jpg"
      tagline="Buttery, broken-in-half, the kind that disappear when no one's looking."
      origin="Tanzania"
      accentColor="text-clay"
      description={[
        "Tanzanian raw cashews, roasted slow in small batches and salted with the lightest hand. We don't toast them dark — we want the buttery, almost sweet inside to come through.",
        "These come out in halves and whole pieces. We don't sort for size, because honestly, the broken ones taste exactly the same and we'd rather not throw food away.",
        "Best with: a cold beer, a glass of white wine, or eaten straight from the bag at midnight (no judgement).",
      ]}
      specs={[
        { label: "Origin", value: "Mtwara, Tanzania" },
        { label: "Roast", value: "Light, slow" },
        { label: "Salt", value: "A little" },
        { label: "Best by", value: "6 months" },
      ]}
      illustration={
        <svg viewBox="0 0 100 70" className="w-32 h-24 text-roast">
          <path
            d="M 20 35 Q 25 18, 50 20 Q 78 24, 80 38 Q 82 52, 60 54 Q 35 56, 22 48 Q 15 43, 20 35 Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M 30 32 Q 50 26, 65 34"
            stroke="#f4ecde"
            strokeWidth="0.6"
            fill="none"
            opacity="0.5"
          />
        </svg>
      }
    />
  );
}
