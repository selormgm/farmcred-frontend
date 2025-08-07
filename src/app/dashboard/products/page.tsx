"use client";

import { useState, useMemo } from "react";
import { useFarmerProducts } from "@/hooks/useFarmerProducts";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProductPage() {
  const { products, loading, error } = useFarmerProducts();
  const [sortBy, setSortBy] = useState("default");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New state for delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

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

  async function handleDeleteProductConfirmed() {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.name);
      toast.success(`Product "${productToDelete.name}" deleted successfully`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      // Optionally refresh list or re-fetch data
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    }
  }

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsAddOpen(true);
  };

  if (loading)
    return <div className="p-6 text-gray-500">Loading products...</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load products.</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header & Sort */}
      <div className="flex flex-col md:flex-row md:justify-end gap-4">
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48 border dark:bg-card rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#72BF01]"
          >
            <option value="default">Sort by</option>
            <option value="alphabetical">Alphabetical (A–Z)</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="priceLow">Price: Low to High</option>
          </select>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-[#157f20] hover:bg-[#5aa500] text-white"
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
              </DialogHeader>
              {/* AddProductForm can be a separate component */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Price (GHS)"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <select className="w-full border rounded px-3 py-2 text-sm">
                  <option>Select Image</option>
                  {/* Replace with real image list */}
                </select>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#158f20] text-white hover:bg-[#115c3a]"
                  >
                    {editingProduct ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {sortedProducts.map((product) => (
          <div
            key={product.name}
            className="border rounded-lg overflow-hidden bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow relative"
          >
            <img
              src={product.imageUrl || "/images/placeholder.png"}
              alt={product.name}
              className="w-full h-40 object-cover"
              onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
            />
            <div className="p-4 space-y-1">
              <h2 className="text-md font-semibold truncate">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">
                Added on{" "}
                {new Date(product.dateAdded).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="font-bold text-right text-sm">
                GH₵ {product.price}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                className="p-1 bg-white border rounded-full hover:bg-gray-100 dark:bg-card"
                onClick={() => handleEdit(product)}
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </button>
              <button
                className="p-1 bg-white border rounded-full hover:bg-gray-100 dark:bg-card"
                onClick={() => handleDeleteClick(product)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#158f20]">
              {productToDelete?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDeleteProductConfirmed}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-white">
          You haven't added any products yet.
        </p>
      )}
    </div>
  );
}

// Update deleteProduct to call your API
async function deleteProduct(name: string) {
  const res = await fetch(`/api/products/${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}
