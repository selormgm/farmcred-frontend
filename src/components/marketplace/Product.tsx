"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function MarketplaceGridPage() {
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      image: "/images/freshtomatoes.jpg",
      price: 25.0,
      description: "Fresh from the farm in Volta Region",
      farmerName: "Kwame Okoro",
    },
    {
      id: 2,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 3,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 4,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 5,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 6,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 7,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 8,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
    {
      id: 9,
      name: "Yellow Maize",
      image: "/images/freshmaize.jpg",
      price: 50.0,
      description: "Grown without chemicals in Bono East",
    },
  ];
  const sortedProducts = useMemo(() => {
    if (!products) return [];

    const sorted = [...products];

    switch (sortBy) {
      case "alphabetical":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "priceHigh":
        return sorted.sort((a, b) => b.price - a.price);
      case "priceLow":
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedProducts.slice(startIndex, startIndex + pageSize);
  }, [sortedProducts, currentPage]);

  // 3. RESET PAGE WHEN SORTING CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  return (
    <section className="py-6">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Header and Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#157148]">Marketplace</h2>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-44 sm:w-52 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#72BF01]"
            >
              <option value="default">Sort by</option>
              <option value="alphabetical">Alphabetical (A–Z)</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="priceLow">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="w-full border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white text-[#158f20] text-sm font-semibold px-2 py-2 rounded shadow-sm">
                  GH₵ {product.price}
                </div>
              </div>
              <div className="p-4 lg:p-3 space-y-2">
                <h2 className="text-base md:text-lg font-semibold text-[#157148] truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm text-gray-500">
                  Sold by:{" "}
                  <span className="text-[#05402E] font-semibold">
                    {product.farmerName || "Unknown Farmer"}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap px-4 pb-4 gap-2">
                <Link href={`/buy/${product.id}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
                  >
                    Buy
                  </Button>
                </Link>
                <Link href={`/cart/add/${product.id}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-[#158f20] hover:bg-white hover:opacity-90 shadow-lg hover:text-[#05402E]"
                  >
                    Add to Cart
                  </Button>{" "}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            className="text-sm px-3 py-1.5"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {/* Dynamic Page Buttons */}
          {(() => {
            const pageButtons = [];
            const maxVisible = 5;
            const half = Math.floor(maxVisible / 2);
            let start = Math.max(currentPage - half, 1);
            let end = Math.min(start + maxVisible - 1, totalPages);

            if (end - start < maxVisible - 1) {
              start = Math.max(end - maxVisible + 1, 1);
            }

            if (start > 1) {
              pageButtons.push(
                <span key="start-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            for (let i = start; i <= end; i++) {
              pageButtons.push(
                <Button
                  key={i}
                  variant={currentPage === i ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i)}
                  className={`w-9 h-9 p-0 text-sm ${
                    currentPage === i ? "bg-[#158f20] text-white" : ""
                  }`}
                >
                  {i}
                </Button>
              );
            }

            if (end < totalPages) {
              pageButtons.push(
                <span key="end-ellipsis" className="px-2 text-gray-400">
                  ...
                </span>
              );
            }

            return pageButtons;
          })()}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            className="text-sm px-3 py-1.5"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
