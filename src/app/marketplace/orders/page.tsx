"use client";

import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMyOrders } from "@/hooks/usePayment";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_TABS = ["All", "Preparing", "Out for Delivery", "Delivered"];
const PAGE_SIZE = 6;

export default function OrderHistoryPage() {
  const { data: allOrders, loading, error } = useMyOrders();
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders =
    selectedTab === "All"
      ? allOrders || []
      : (allOrders || []).filter((o:any) => o.status === selectedTab);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil((filteredOrders || []).length / PAGE_SIZE);
  if (loading){
    return(
    <div className="flex flex-col min-h-screen">
        <MarketplaceNavbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 py-24 space-y-10">
          <h1 className="text-[#158f20] text-2xl font-bold">My Orders</h1>
          <div className="flex gap-3 pb-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg bg-white shadow-sm p-4">
                <Skeleton className="w-full h-48 rounded-md mb-4" />
                <div className="space-y-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  if (error) {
    return <p className="text-red-600 p-8">Error loading orders.</p>;
  }

  return (
    <>
      <MarketplaceNavbar />
      <main className="max-w-6xl mx-auto px-4 py-24 space-y-10">
        <h1 className="text-[#158f20] text-2xl font-bold">My Orders</h1>

        {/* Filter Tabs */}
        <div className="flex gap-3 pb-2">
          {STATUS_TABS.map((status) => (
            <Button
              key={status}
              variant={selectedTab === status ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedTab(status);
                setCurrentPage(1); // reset to page 1
              }}
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Grid */}
        {paginatedOrders.length === 0 ? (
          <p className="text-gray-600">No orders in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrders.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-lg bg-white shadow-sm p-4 flex flex-col relative"
              >
                <div className="relative w-full">
                <Image
                  src={order.image}
                  alt={order.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Out for Delivery"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h2 className="text-lg font-semibold">{order.name}</h2>
                  <p className="text-sm text-gray-600">
                    GH₵ {order.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Review:{" "}
                    {order.reviewed ? (
                      <span className="text-green-600">Submitted</span>
                    ) : (
                      <span className="text-red-600">Not yet</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <Link href={`/marketplace/orders/${order.id}/tracking`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Track Order
                    </Button>
                  </Link>
                  {!order.reviewed && (
                    <Link
                      href={`/marketplace/checkout/${order.id}/confirmation`}
                    >
                      <Button size="sm" className="w-full">
                        Leave Review
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
