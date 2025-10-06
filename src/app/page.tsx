// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRole } from "@/lib/admin-auth";

// --- Hàm lấy dữ liệu (giữ nguyên) ---
async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// --- Component chính ---
export default async function HomePage() {
  const [products, userRole] = await Promise.all([
    getProducts(),
    getUserRole(),
  ]);

  return (
    <main className=" h-[90vh]">
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Products
          </h1>
          <p className="mt-4 text-lg text-neutral-500">
            Discover the latest in technology and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            // Bọc toàn bộ card trong Link để dễ click
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden w-auto h-auto">
                {/* Phần hình ảnh */}
                <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
                  <img
                    src={product.imageUrl || "https://placehold.co/600x400"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Phần nội dung text */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-neutral-800 mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-2xl font-bold text-neutral-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link href={`products/${product.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
