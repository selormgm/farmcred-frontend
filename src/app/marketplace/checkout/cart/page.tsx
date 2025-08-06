"use client";

import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function CartCheckoutPage() {
  const { cart } = useCartStore();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"momo" | "bank" | "cod">(
    "momo"
  );
  const [fulfillmentMethod, setFulfillmentMethod] = useState<
    "delivery" | "pickup"
  >("delivery");

  const DELIVERY_FEE = 20;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total =
    fulfillmentMethod === "delivery" ? subtotal + DELIVERY_FEE : subtotal;

  const handleConfirm = () => {
    router.push("/marketplace/orders"); // Redirect after placing order
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 pt-24 pb-20 space-y-10">
        <h1 className="text-2xl font-bold">Checkout (Cart)</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* Order Summary */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-center border-b pb-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-700">
                      GH₵ {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              {/* Fulfillment Method */}
              <div className="space-y-2">
                <label className="font-medium">Fulfillment Method</label>
                <div className="flex gap-3">
                  <Button
                    variant={
                      fulfillmentMethod === "delivery" ? "default" : "outline"
                    }
                    onClick={() => setFulfillmentMethod("delivery")}
                    size="sm"
                  >
                    Delivery
                  </Button>
                  <Button
                    variant={
                      fulfillmentMethod === "pickup" ? "default" : "outline"
                    }
                    onClick={() => setFulfillmentMethod("pickup")}
                    size="sm"
                  >
                    Pickup
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  {fulfillmentMethod === "pickup"
                    ? "Pickup will be coordinated with each farmer."
                    : `Delivery Fee: GH₵ ${DELIVERY_FEE.toFixed(2)}`}
                </p>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4">
                <h2 className="text-lg font-semibold">Select Payment Method</h2>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                    />
                    Mobile Money
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    Bank Transfer
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    Cash on Delivery
                  </label>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between border-t pt-4 font-semibold text-lg text-green-700">
                <span>Total:</span>
                <span>GH₵ {total.toFixed(2)}</span>
              </div>

              {/* Confirm Button */}
              <div className="pt-4">
                <Button
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90"
                >
                  Confirm Order & Pay
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
