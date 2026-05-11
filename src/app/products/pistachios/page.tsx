import ProductPage from "@/components/ProductPage";

export default function Pistachios() {
  return (
    <ProductPage
      productId="pistachios"
      number="02"
      latin="pistacia vera"
      // To use a real photo: drop a file at /public/pistachios.jpg and uncomment:
      // photo="/pistachios.jpg"
      tagline="Salt, sun, and a stubborn shell that's worth the wrestle."
      origin="Iran"
      accentColor="text-olive"
      description={[
        "Iranian pistachios from Kerman province, roasted in their shells with sea salt. The flavour we want: green, slightly sweet, a touch grassy. Not the bright-red dyed ones you grew up with.",
        "We pack them in their shells because that's how they keep best — and because cracking them open is half the fun. Yes, it's a bit more work. We think it's worth it.",
        "Best with: an aperitivo, a long lunch, or an even longer afternoon.",
      ]}
      specs={[
        { label: "Origin", value: "Kerman, Iran" },
        { label: "Form", value: "In-shell" },
        { label: "Salt", value: "Sea salt" },
        { label: "Best by", value: "8 months" },
      ]}
      illustration={
        <svg viewBox="0 0 100 70" className="w-32 h-24 text-olive">
          <ellipse cx="40" cy="35" rx="22" ry="14" fill="currentColor" opacity="0.85" />
          <ellipse cx="62" cy="38" rx="20" ry="13" fill="currentColor" opacity="0.7" />
          <path
            d="M 30 28 Q 40 32, 50 28"
            stroke="#f4ecde"
            strokeWidth="0.6"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 55 30 Q 65 34, 75 30"
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
