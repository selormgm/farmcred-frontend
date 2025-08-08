"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useListings } from "@/hooks/useMarketPlace";
import { Skeleton } from "@/components/ui/skeleton";

const steps = ["Preparing Order", "Out for Delivery", "Delivered"];

export default function OrderTrackingPage() {
  const params = useParams();
  const { data: products, loading, error } = useListings();
  const [statusIndex, setStatusIndex] = useState(0);

  const product = useMemo(() => {
    if (!products) return null;
    return products.find((p: { id: any; }) => String(p.id) === String(params.id));
  }, [products, params.id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-24 space-y-12">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
          </div>
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full mx-auto" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 p-8">Error loading tracking information.</p>;
  }

  if (!product) return notFound();

  // Auto-progress for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 4000); // update every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MarketplaceNavbar />
      <main className="max-w-3xl mx-auto px-4 py-24 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Track Your Order</h1>
          <p className="text-gray-600 text-sm">Order for: {product.name}</p>
        </div>

        {/* Step Tracker */}
        <div className="flex flex-col gap-6">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  index <= statusIndex
                    ? "bg-[#158f20] border-[#158f20] text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <div className="text-sm font-medium">{step}</div>
              {index === statusIndex && (
                <span className="text-xs text-gray-500 ml-2">(Current)</span>
              )}
            </div>
          ))}
        </div>

        {/* Mock Delivery Info */}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm text-sm text-gray-700">
          <p>
            Delivery Partner: <strong>FarmCred Logistics</strong>
          </p>
          <p>
            Estimated Arrival:{" "}
            <span className="text-green-700 font-medium">
              {statusIndex === 0
                ? "Pending Dispatch"
                : statusIndex === 1
                ? "Within 24 hours"
                : "Delivered ✔"}
            </span>
          </p>
        </div>

        {/* Navigation */}
        <div className="pt-4 text-center">
          <Button
            onClick={() => (window.location.href = "/marketplace")}
            className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white"
          >
            Back to Marketplace
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
