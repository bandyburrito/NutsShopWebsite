"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

// ─── Types ────────────────────────────────────────────────────────────────
export type CartItem = {
  productId: Product["id"];
  qty: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; productId: Product["id"]; qty?: number }
  | { type: "REMOVE"; productId: Product["id"] }
  | { type: "SET_QTY"; productId: Product["id"]; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

// ─── Reducer ──────────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.productId === action.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.productId
              ? { ...i, qty: i.qty + (action.qty ?? 1) }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { productId: action.productId, qty: action.qty ?? 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "SET_QTY":
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, qty: action.qty } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────
type CartContextValue = {
  items: CartItem[];
  addItem: (productId: Product["id"], qty?: number) => void;
  removeItem: (productId: Product["id"]) => void;
  setQty: (productId: Product["id"], qty: number) => void;
  clearCart: () => void;
  totalRappen: number;
  totalQty: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "kernelco_cart_v1";

// ─── Provider ─────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isCartOpen, setCartOpen] = useReducer((_: boolean, v: boolean) => v, false);

  // Load saved cart from localStorage on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch {
      // localStorage unavailable / corrupted — ignore, start with empty cart
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage full / blocked — ignore silently
    }
  }, [state]);

  // Compute totals from server-trusted prices (PRODUCTS is the source of truth)
  const totalRappen = state.items.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return product ? sum + product.priceRappen * item.qty : sum;
  }, 0);

  const totalQty = state.items.reduce((sum, item) => sum + item.qty, 0);

  const value: CartContextValue = {
    items: state.items,
    addItem: (productId, qty) => {
      dispatch({ type: "ADD", productId, qty });
      setCartOpen(true);
    },
    removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
    setQty: (productId, qty) => dispatch({ type: "SET_QTY", productId, qty }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    totalRappen,
    totalQty,
    isCartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
