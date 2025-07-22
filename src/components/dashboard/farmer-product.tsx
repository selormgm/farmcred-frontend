import { useFarmerProducts } from "@/hooks/useFarmerProducts";
import { Avatar, AvatarImage } from "../ui/avatar";

const FarmerProduct = () => {
  const { products, loading, error } = useFarmerProducts();

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error)
    return <div className="p-4 text-red-600">Failed to load products</div>;

  return (
    <div className="space-y-1.5">
      {(products || []).slice(0, 4).map((product, index) => {
        const productName = product.name || "Unnamed Product";
        const initial = productName.charAt(0).toUpperCase();

        return (
          <div key={index} className="flex items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-12 w-12 flex-shrink-0 border border-[#E1E3E0] rounded-full">
              <AvatarImage src={product.imageUrl} alt={product.name} />
            </Avatar>

            {/* Product Details */}
            <div className="flex justify-between items-center flex-1 border-b border-[#E1E3E0] py-3">
              <div className="min-w-0">
                <p className="font-medium text-l text-[#157148] mb-0.5">
                  {productName}
                </p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-lg text-[#158f20]">
                  GH₵ {product.price}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FarmerProduct;
