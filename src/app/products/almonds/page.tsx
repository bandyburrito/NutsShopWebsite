import ProductPage from "@/components/ProductPage";

export default function Almonds() {
  return (
    <ProductPage
      productId="almonds"
      number="03"
      latin="prunus dulcis"
      // To use a real photo: drop a file at /public/almonds.jpg and uncomment:
      // photo="/almonds.jpg"
      tagline="Toasted slow, salted lightly, and absolutely nothing else."
      origin="Spain"
      accentColor="text-roast"
      description={[
        "Marcona almonds from Valencia, Spain. The short, round, buttery kind — not the long pointy ones you get in the supermarket. Toasted in their own oil and salted just enough.",
        "These are the almonds people get a little weird about, and we get it. They taste like marzipan before it became candy.",
        "Best with: a sherry, a hard cheese, or as the only thing you actually need on a cheese board.",
      ]}
      specs={[
        { label: "Origin", value: "Valencia, Spain" },
        { label: "Variety", value: "Marcona" },
        { label: "Roast", value: "Slow, in own oil" },
        { label: "Best by", value: "6 months" },
      ]}
      illustration={
        <svg viewBox="0 0 100 70" className="w-32 h-24 text-roast">
          <ellipse cx="35" cy="35" rx="14" ry="20" transform="rotate(-15 35 35)" fill="currentColor" opacity="0.85" />
          <ellipse cx="60" cy="38" rx="13" ry="18" transform="rotate(20 60 38)" fill="currentColor" opacity="0.75" />
          <ellipse cx="78" cy="32" rx="10" ry="15" transform="rotate(-10 78 32)" fill="currentColor" opacity="0.65" />
        </svg>
      }
    />
  );
}
