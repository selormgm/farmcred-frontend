"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { useListings } from "@/hooks/useMarketPlace";
import { Skeleton } from "@/components/ui/skeleton";

function getDeliveryDateRange(days: string) {
  const [min, max] = days.match(/\d+/g)?.map(Number) || [1, 2];
  const today = new Date();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });

  const start = new Date(today);
  start.setDate(today.getDate() + min);

  const end = new Date(today);
  end.setDate(today.getDate() + max);

  return `${formatter.format(start)} – ${formatter.format(end)}`;
}

export default function BuyPage() {
  const [fulfillmentMethod, setFulfillmentMethod] = useState<
    "delivery" | "pickup"
  >("delivery");

  const params = useParams();
  const { data: products, loading, error } = useListings();
  const product = useMemo(() => {
    if (!products) return null;
    return products.find(
      (p: { id: any }) => String(p.id) === String(params.id)
    );
  }, [products, params.id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-10 pt-24 space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="w-full h-[400px]" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
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

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 pt-24 space-y-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Image
              src={product.image || "/images/placeholder.png"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full rounded-xl object-cover h-[400px]"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <p className="text-green-600 text-xl font-semibold">
              GH₵ {product.price}
            </p>
            {product.stock && product.stock> 5 ? (
              <p className="text-sm text-green-600">In stock</p>
            ) : (
              <p className="text-sm text-red-600">
                Only {product.stock} left — order soon!
              </p>
            )}
            <p className="text-sm">Quantity: {product.quantity}</p>
            <p className="text-sm">Farmer: {product.farmerName}</p>
            <p className="text-sm">Delivery: {product.delivery}</p>
            <p className="text-sm text-gray-600">
              Expected Delivery: {getDeliveryDateRange(product.delivery)}
            </p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-2">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Mobile Money (MTN, Vodafone, AirtelTigo)</li>
            <li>Bank Transfer</li>
            <li>Cash on Delivery (select areas)</li>
          </ul>

          <h3 className="text-lg font-semibold pt-4">How to Pay</h3>
          <p className="text-sm text-gray-600">
            After checkout, you will receive payment instructions based on your
            selected method. Once confirmed, your order will be processed.
          </p>
        </div>

        <div className="pt-6">
          <Link href={`/marketplace/checkout/${product.id}`}>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
            >
              Buy Now / Proceed to Payment
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
