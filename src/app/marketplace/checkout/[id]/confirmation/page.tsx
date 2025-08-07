"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import { dummyProducts } from "@/mock/products";
import { notFound } from "next/navigation";

export default function ConfirmationPage() {
  const params = useParams();
  const product = dummyProducts.find((p) => p.id === params.id);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!product) return notFound();
  const [transactionHash, setTransactionHash] = useState<string>("");

  useEffect(() => {
    const hash = `TXN-${product.id}-${Math.floor(Math.random() * 1_000_000)}`;
    setTransactionHash(hash);
  }, [product.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-24 space-y-10 text-center">
        <h1 className="text-2xl font-bold text-green-700">
          Payment Received & Order Confirmed
        </h1>
        <p className="text-sm text-gray-600">
          Thank you for your order. It’s now being processed and the farmer has
          been notified.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm text-sm">
          <p className="font-medium">Transaction Hash:</p>
          <code className="text-green-700 font-mono">{transactionHash}</code>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 mt-8 text-left">
            <div className="space-y-2">
              <label className="block font-medium">Rate Your Experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-2xl ${
                      rating && star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">
                Leave a Comment (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="E.g. Fresh produce, fast delivery, very responsive!"
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90"
              disabled={!rating}
            >
              Submit Review
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-green-700 font-medium">
            <p>Thank you! Your review has been submitted.</p>
            <p>You may now close this page or continue shopping.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
