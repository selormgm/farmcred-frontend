"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function MarketplaceGridPage() {
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
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
    <section className="p-6 space-y-6 mx-21">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#157148]">Marketplace</h2>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#72BF01]"
          >
            <option value="default">Sort by</option>
            <option value="alphabetical">Alphabetical (A–Z)</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="priceLow">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 justify-center gap-x-4 gap-y-8 mb-8">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-[300px] mx-auto border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="relative w-full h-60">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h2 className="text-md font-semibold text-[#157148] truncate">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-500">
                Sold by:{" "}
                <span className="text-[#05402E] font-semibold">
                  {product.farmerName || "Unknown Farmer"}
                </span>
              </p>
              <p className="text-[#158f20] font-bold text-right text-sm">
                GH₵ {product.price}
              </p>
            </div>
            <div className="flex px-4 pb-4 gap-2">
              <Button
                size="sm"
                variant="default"
                className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
              >
                Buy
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[#158f20] hover:bg-white hover:opacity-90 shadow-lg hover:text-[#05402E]"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <Button
            key={idx}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(idx + 1)}
            className="text-sm"
          >
            {idx + 1}
          </Button>
        ))}
      </div>
    </section>
  );
}
