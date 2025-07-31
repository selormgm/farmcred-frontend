import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  farmerName: string;
  description: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  updateQuantity: (id: number, delta: number) => void; // optional
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
