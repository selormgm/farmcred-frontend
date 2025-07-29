import Footer from "@/components/marketplace/Footer";
import { MarketplaceNavbar } from "@/components/marketplace/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

const dummyProducts = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    image: "/images/freshtomatoes.jpg",
    price: 25.0,
    description: "Juicy and organic tomatoes.",
    quantity: "1kg",
    farmer: "Kwame Okoro",
    delivery: "24-48 hours",
  },
  {
    id: "2",
    name: "Organic Mangoes",
    image: "/images/freshmangoes.jpg",
    price: 30.0,
    description: "Sweet, ripe mangoes.",
    quantity: "5pcs",
    farmer: "Ama Farms",
    delivery: "1-2 days",
  },
];

export default function BuyPage({ params }: { params: { id: string } }) {
  const product = dummyProducts.find((p) => p.id === params.id);

  if (!product) return notFound();

  const metadata = {
    title: "Buy - " + product.name,
  };

  return (
    <>
      <MarketplaceNavbar />
      <main className="max-w-6xl mx-auto px-4 py-10 pt-24 space-y-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="w-full rounded-xl object-cover h-[400px]"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <p className="text-green-600 text-xl font-semibold">
              GH₵ {product.price}
            </p>
            <p className="text-sm">Quantity: {product.quantity}</p>
            <p className="text-sm">Farmer: {product.farmer}</p>
            <p className="text-sm">Delivery: {product.delivery}</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-2">
          <h2 className="text-xl font-semibold">Payment Methods</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>Mobile Money (MTN, Vodafone, AirtelTigo)</li>
            <li>Bank Transfer</li>
            <li>Cash on Delivery (select areas)</li>
          </ul>

          <h3 className="text-lg font-semibold pt-4">How to Pay</h3>
          <p className="text-sm text-gray-600">
            After checkout, you will receive payment instructions based on your
            selected method. Once confirmed, your order will be processed.
          </p>
        </div>
        <div className="pt-6">
          <Link href={`/marketplace/checkout/${product.id}`}>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#128f20] to-[#72BF01] text-white hover:opacity-90 shadow-lg"
            >
              Buy Now / Proceed to Payment
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
