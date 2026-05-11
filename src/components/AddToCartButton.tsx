"use client";

import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { isPreLaunch } from "@/lib/launch-mode";
import Link from "next/link";

export default function AddToCartButton({
  productId,
  className = "",
  label,
}: {
  productId: Product["id"];
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const preLaunch = isPreLaunch();

  // During pre-launch, this is a "scroll to notify" link instead of add-to-cart
  if (preLaunch) {
    return (
      <Link href="/#notify" className={`btn-stamp ${className}`}>
        {label ?? "Notify me at launch →"}
      </Link>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addItem(productId, 1);
      }}
      className={`btn-stamp ${className}`}
    >
      {label ?? "Add to basket"}
    </button>
  );
}
