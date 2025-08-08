"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import { useOrderDetail, useConfirmPayment } from "@/hooks/usePayment";
import { toast } from "sonner";

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

export default function PaymentPage() {
  const params = useParams();
  const orderId = Number(params.orderId);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [transactionRef, setTransactionRef] = useState<string>("");
  const {
    data: order,
    loading: orderLoading,
    error: orderError,
  } = useOrderDetail(orderId);
  const {
    confirm: confirmPayment,
    loading: paymentLoading,
    error: paymentError,
  } = useConfirmPayment();

  if (isNaN(orderId) || orderId === 0) {
    return notFound();
  }

  if (orderLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-10 pt-24 text-center">
          <h1 className="text-2xl font-bold">Loading Order Details...</h1>
          <p className="text-gray-600">
            Please wait while we prepare your payment.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-10 pt-24 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error Loading Order: {orderError}
          </h1>
          <p className="text-gray-600">
            There was an issue retrieving your order details for payment.
          </p>
          <Link href="/marketplace">
            <Button className="mt-4">Return to Marketplace</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return notFound();
  }

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      toast.warning("Please select a payment method.");
      return;
    }

    if (!transactionRef && selectedPaymentMethod !== "cash_on_delivery") {
      toast.warning("Please enter a transaction reference.");
      return;
    }

    try {
      toast.info("Processing payment...");

      // Simulate payment gateway interaction
      console.log(
        `Simulating payment for Order ID: ${orderId} via ${selectedPaymentMethod}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const payload = {
        status: "completed",
        transaction_reference:
          transactionRef || `COD-${order.id}-${Date.now()}`,
      };

      // Confirm with backend
      await confirmPayment(orderId, payload);

      toast.success("Payment successful! Redirecting...");

      // Redirect to confirmation page
      window.location.href = `/marketplace/order-confirmed/${orderId}`;
    } catch (err: any) {
      console.error("Payment confirmation error:", err);

      toast.error("Payment failed", {
        description:
          paymentError || err.message || "An unknown error occurred.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MarketplaceNavbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 pt-24 space-y-8 bg-white shadow-lg rounded-xl my-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Complete Your Payment
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Your order is confirmed by the farmer. Please proceed with payment to
          finalize your purchase.
        </p>

        <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-blue-50">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-700">
            <p>
              <span className="font-medium">Product:</span>{" "}
              {order.product_name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-medium">Farmer:</span>{" "}
              {order.farmer_name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Delivery:</span>{" "}
              {order.delivery_days
                ? getDeliveryDateRange(order.delivery_days)
                : "N/A"}
            </p>
            <p className="col-span-2 text-2xl font-bold text-green-700">
              Total: GH₵ {order.total_amount?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Select Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="mobile_money"
                checked={selectedPaymentMethod === "mobile_money"}
                onChange={() => setSelectedPaymentMethod("mobile_money")}
                className="form-radio text-green-600 h-5 w-5"
              />
              <span className="text-lg font-medium text-gray-700">
                Mobile Money (MTN, Vodafone, AirtelTigo)
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={selectedPaymentMethod === "bank_transfer"}
                onChange={() => setSelectedPaymentMethod("bank_transfer")}
                className="form-radio text-green-600 h-5 w-5"
              />
              <span className="text-lg font-medium text-gray-700">
                Bank Transfer
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-md hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="cash_on_delivery"
                checked={selectedPaymentMethod === "cash_on_delivery"}
                onChange={() => setSelectedPaymentMethod("cash_on_delivery")}
                className="form-radio text-green-600 h-5 w-5"
              />
              <span className="text-lg font-medium text-gray-700">
                Cash on Delivery (COD)
              </span>
            </label>
          </div>

          {selectedPaymentMethod &&
            selectedPaymentMethod !== "cash_on_delivery" && (
              <div className="space-y-2 mt-4">
                <label
                  htmlFor="transactionRef"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transaction Reference / ID
                </label>
                <input
                  type="text"
                  id="transactionRef"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="Enter transaction ID from your payment"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500">
                  Please enter the reference number provided by your payment
                  service.
                </p>
              </div>
            )}

          {paymentError && (
            <p className="text-red-600 text-center mt-4">{paymentError}</p>
          )}

          <Button
            onClick={handlePaymentSubmit}
            disabled={
              paymentLoading ||
              !selectedPaymentMethod ||
              (selectedPaymentMethod !== "cash_on_delivery" && !transactionRef)
            }
            size="lg"
            className="w-full bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg py-3 mt-6"
          >
            {paymentLoading ? "Processing Payment..." : "Confirm Payment"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
