import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
export default async function HomePage() {
  const products = await getProducts();
  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-100">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product : any) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <div className="border p-4 rounded-lg overflow-hidden gr-gray-50/50 hover:shadow-lg transition-shadow duration-300">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Add to Cart
                </Button>
              </div>
              
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
