"use client";

import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <MarketplaceNavbar />
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-56 space-y-10">
        <h1 className="text-3xl font-bold">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                    </div>

                    <p className="text-sm text-gray-700 font-semibold">
                      GH₵ {item.price * item.quantity}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="flex justify-between text-sm text-gray-700">
                <span>Total</span>
                <span className="font-bold">GH₵ {totalPrice}</span>
              </div>
              <Link href="/marketplace/checkout/cart">
                <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
