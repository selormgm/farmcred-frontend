import { create } from "zustand";
import { CartState } from "../types/marketplacetypes";

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  
  addToCart: (item) => {
    const existing = get().cart.find((p) => p.id === item.id);
    if (!existing) {
      set((state) => ({
        cart: [...state.cart, item],
      }));
    }
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  isInCart: (id) => !!get().cart.find((item) => item.id === id),

  updateQuantity: (id, delta) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    }));
  },
}));
