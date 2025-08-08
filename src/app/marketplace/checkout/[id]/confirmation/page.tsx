"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import { useConfirmationStatus } from "@/hooks/useConfirmation";
import { CheckCircle, Hourglass, TimerOff, XCircle } from "lucide-react";

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

export default function ProducePurchaseConfirmationpage() {
  const params = useParams();
  const confirmationPk = Number(params.pk);

  if (isNaN(confirmationPk) || confirmationPk === 0) {
    return notFound();
  }

  const {
    data: confirmation,
    loading,
    error,
    refetch,
  } = useConfirmationStatus(confirmationPk);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (confirmation && confirmation.status === "pending") {
      interval = setInterval(() => {
        refetch(); // Refetch every few seconds if still pending
      }, 5000); // Poll every 5 seconds
    }
    return () => clearInterval(interval);
  }, [confirmation, refetch]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-10 pt-24 text-center">
          <h1 className="text-2xl font-bold">Loading Order Status...</h1>
          <p className="text-gray-600">
            Please wait while we fetch your order details.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-10 pt-24 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error Loading Confirmation: {error}
          </h1>
          <p className="text-gray-600">
            There was an issue retrieving your confirmation details.
          </p>
          <Link href="/marketplace">
            <Button className="mt-4">Return to Marketplace</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!confirmation) {
    // If confirmation is null after loading and no error, it means it wasn't found
    return notFound();
  }

  // Extract data from data_context for produce purchase
  const { product_name, quantity, total_amount, delivery_days } =
    confirmation.data_context;

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 pt-24 space-y-8 bg-white shadow-lg rounded-xl my-8">
        <div className="text-center space-y-4">
          {confirmation.status === "confirmed" && (
            <h1 className="text-4xl font-extrabold text-green-700 flex items-center justify-center gap-3">
              <CheckCircle className="w-8 h-8" />
              Order Confirmed!
            </h1>
          )}
          {confirmation.status === "pending" && (
            <h1 className="text-4xl font-extrabold text-yellow-600 flex items-center justify-center gap-3">
              <Hourglass className="w-8 h-8" />
              Awaiting Farmer's Response...
            </h1>
          )}
          {confirmation.status === "denied" && (
            <h1 className="text-4xl font-extrabold text-red-700 flex items-center justify-center gap-3">
              <XCircle className="w-8 h-8"/>
              Order Denied 
            </h1>
          )}
          {confirmation.status === "expired" && (
            <h1 className="text-4xl font-extrabold text-gray-500 flex items-center justify-center gap-3">
               <TimerOff className="w-8 h-8"/>
              Order Expired 
            </h1>
          )}
          <p className="text-lg text-gray-700">
            Confirmation ID:{" "}
            <span className="font-semibold">
              {confirmation.confirmation_id}
            </span>
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <p>
              <span className="font-semibold">Product:</span> {product_name}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-semibold">Total Amount:</span> GH₵{" "}
              {total_amount?.toFixed(2) || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Farmer:</span>{" "}
              {confirmation.target_account.full_name} (
              {confirmation.target_account.phone_number})
            </p>
            {delivery_days && (
              <p>
                <span className="font-semibold">Expected Delivery:</span>{" "}
                {getDeliveryDateRange(delivery_days)}
              </p>
            )}
            <p>
              <span className="font-semibold">Request Type:</span>{" "}
              {confirmation.request_type}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-bold ${
                  confirmation.status === "confirmed"
                    ? "text-green-600"
                    : confirmation.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {confirmation.status.toUpperCase()}
              </span>
            </p>
            <p>
              <span className="font-semibold">Requested On:</span>{" "}
              {new Date(confirmation.created_at).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Expires On:</span>{" "}
              {new Date(confirmation.expires_at).toLocaleString()}
            </p>
          </div>
        </div>
         {confirmation.status === "confirmed" && (
          <div className="border-t border-gray-200 pt-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Next Steps</h3>
            <p className="text-gray-700">
              The farmer has accepted your purchase request! You can now proceed to payment.
            </p>
            {/* Replace with your actual payment page path */}
            <Link href={`/marketplace/payment/${confirmation.pk}`}>
              <Button
                size="lg"
                className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
              >
                Proceed to Payment
              </Button>
            </Link>
          </div>
        )}

        {confirmation.status === "denied" && (
          <div className="border-t border-gray-200 pt-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">What's Next?</h3>
            <p className="text-gray-700">
              The farmer was unable to fulfill this request at this time.
            </p>
            <Link href="/marketplace">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:opacity-90 shadow-lg"
              >
                Browse Other Products
              </Button>
            </Link>
          </div>
        )}

        {confirmation.status === "pending" && (
          <div className="border-t border-gray-200 pt-6 text-center space-y-4">
            <p className="text-gray-700">
              We're waiting for the farmer to respond to your request. This page will update automatically.
            </p>
            <p className="text-sm text-gray-500">
              You can close this page and come back later, or keep it open.
            </p>
          </div>
        )}

        {confirmation.status === "expired" && (
          <div className="border-t border-gray-200 pt-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Request Expired</h3>
            <p className="text-gray-700">
              This purchase request has expired. The farmer did not respond in time.
            </p>
            <Link href="/marketplace">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:opacity-90 shadow-lg"
              >
                Browse Other Products
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer/>
    </div>

  );
}
