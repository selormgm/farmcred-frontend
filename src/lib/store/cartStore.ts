import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  farmerName: string
  description: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  isInCart: (id: number) => boolean;
}

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
  isInCart: (id) => !!get().cart.find((p) => p.id === id),
}));