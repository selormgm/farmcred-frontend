"use client";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useListings } from "@/hooks/useMarketPlace";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();

  const { data: products, loading, error } = useListings();
  
  const product = useMemo(() => {
    if (!products) return null;
    return products.find((p: { id: any; }) => String(p.id) === String(params.id));
  }, [products, params.id]);

  const [paymentMethod, setPaymentMethod] = useState<"momo" | "bank" | "cod">(
    "momo"
  );
  const [fulfillmentMethod, setFulfillmentMethod] = useState<
    "delivery" | "pickup"
  >("delivery");

  const DELIVERY_FEE = 20.0;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 pt-24 space-y-10">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="w-full h-24" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <div className="flex gap-3">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/2" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 p-8">Error loading product details.</p>;
  }

  if (!product) return notFound();

  const total =
    fulfillmentMethod === "delivery"
      ? product.price + DELIVERY_FEE
      : product.price;

  const handleConfirm = () => {
    router.push(`/marketplace/checkout/${product.id}/confirmation`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 pt-24 pb-20 space-y-10">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Summary */}
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <Image
                src={product.image || "/images/placeholder.png"}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-sm text-gray-700">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-700">
                  Farmer: {product.farmer}
                </p>
                <p className="text-sm text-gray-700">
                  Delivery: {product.delivery}
                </p>
              </div>
            </div>

            {/* Fulfillment Method Toggle */}
            <div className="space-y-2">
              <label className="text-sm font-normal">Fulfillment Method</label>
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
                  ? "Pickup will be coordinated with the farmer."
                  : `Delivery fee: GH₵ ${DELIVERY_FEE.toFixed(2)}`}
              </p>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t pt-4 text-sm">
              <span>Total:</span>
              <span className="font-bold text-green-700">
                GH₵ {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Select Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={() => setPaymentMethod("momo")}
                  />
                  Mobile Money (MTN, Vodafone, AirtelTigo)
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
                  Cash on Delivery (select areas)
                </label>
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
                onClick={handleConfirm}
              >
                Confirm Order & Pay
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                You’ll receive payment instructions and a receipt shortly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
