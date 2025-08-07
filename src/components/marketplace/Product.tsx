"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import ChartDrawer from "@/components/marketplace/ChartDrawer";
import { useSearchStore } from "@/lib/store/searchStore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wheat, Leaf, Carrot, Apple, ListFilter } from "lucide-react";
import { Product } from "@/lib/types/marketplacetypes";

const allProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    imageURL: "/images/freshtomatoes.jpg",
    price: 25.0,
    description: "Fresh from the farm in Volta Region",
    farmerName: "Kwame Okoro",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Yellow Maize",
    imageURL: "/images/freshmaize.jpg",
    price: 50.0,
    description: "Grown without chemicals in Bono East",
    farmerName: "Ama Mensah",
    category: "Grains",
  },
  {
    id: 3,
    name: "Sweet Cassava",
    imageURL: "/images/freshsweetcassava.jpg",
    price: 40.0,
    description: "Harvested this week in Eastern Region",
    farmerName: "Yaw Boateng",
    category: "Tubers",
  },
  {
    id: 4,
    name: "Pineapples",
    imageURL: "/images/freshpineapple.jpg",
    price: 60.0,
    description: "Juicy pineapples from Central Region",
    farmerName: "Akua Sarpong",
    category: "Fruits",
  },
];

export default function MarketplaceGridPage() {
  const router = useRouter();
  const { addToCart, isInCart } = useCartStore();
  const [sortBy, setSortBy] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeChat, setActiveChat] = useState<Product | null>(null);
  const { query, setQuery } = useSearchStore();

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;

      const queryText = query.toLowerCase();
      const matchesQuery =
        p.name.toLowerCase().includes(queryText) ||
        p.farmerName.toLowerCase().includes(queryText);

      return matchesCategory && matchesQuery;
    });
  }, [allProducts, categoryFilter, query]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
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
  }, [filteredProducts, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProducts.slice(start, start + pageSize);
  }, [sortedProducts, currentPage]);

  useEffect(() => setCurrentPage(1), [sortBy, categoryFilter]);

  const handleAddToCart = (product: Product) => {
    if (!isInCart(product.id)) {
      addToCart({
        ...product, quantity: 1,
        image: ""
      });
      toast.success(`${product.name} added to cart`, {
        action: {
          label: "View Cart",
          onClick: () => router.push("/marketplace/cart"),
        },
      });
    }
  };

  return (
    <section className="py-6">
      <div className="container mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Header and Filters */}
        <h2 className="text-2xl font-bold text-[#158f20]">Marketplace</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category buttons */}
          {/* Category Tabs */}
          <Tabs
            defaultValue="All"
            value={categoryFilter}
            onValueChange={(val) => setCategoryFilter(val)}
          >
            <TabsList className="flex flex-wrap gap-2">
              <TabsTrigger value="All" className="flex items-center gap-2">
                <ListFilter className="w-4 h-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="Grains" className="flex items-center gap-2">
                <Wheat className="w-4 h-4" />
                Grains
              </TabsTrigger>
              <TabsTrigger value="Tubers" className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Tubers
              </TabsTrigger>
              <TabsTrigger
                value="Vegetables"
                className="flex items-center gap-2"
              >
                <Carrot className="w-4 h-4" />
                Vegetables
              </TabsTrigger>
              <TabsTrigger value="Fruits" className="flex items-center gap-2">
                <Apple className="w-4 h-4" />
                Fruits
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Sorting dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-44 border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="default">Sort by</option>
              <option value="alphabetical">Alphabetical (A–Z)</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="priceLow">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg bg-white shadow hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={product.imageURL}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white text-[#158f20] text-sm font-semibold px-2 py-2 rounded shadow-sm">
                  GH₵ {product.price}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-base font-semibold text-[#157148] truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm text-gray-500">
                  Sold by:{" "}
                  <span className="text-[#05402E] font-semibold">
                    {product.farmerName}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap px-4 pb-4 gap-2">
                <Link href={`/marketplace/buy/${product.id}`}>
                  <Button className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg">
                    Buy
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  disabled={isInCart(product.id)}
                  onClick={() => handleAddToCart(product)}
                  className="text-[#158f20] hover:bg-white hover:opacity-90 shadow-lg hover:text-[#05402E]"
                >
                  {isInCart(product.id) ? "Added" : "Add to Cart"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveChat(product)}
                  className="text-[#158f20]"
                >
                  Inquire to Buy
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-[#158f20] text-white" : ""}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <ChartDrawer
        activeChat={activeChat}
        onClose={() => setActiveChat(null)}
      />
    </section>
  );
}
