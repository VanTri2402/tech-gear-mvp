// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRole } from "@/lib/admin-auth";
import Image from "next/image";
import { ProductProps } from "@/types/ProductType";
import { ChevronRight } from "lucide-react";

// --- Hàm lấy dữ liệu (giữ nguyên) ---
async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Hàm tạo màu gradient theo category
function getCategoryGradient(category: string | { id: number; name: string }) {
  const categoryName =
    typeof category === "string" ? category : category?.name || "";
  const gradients: { [key: string]: string } = {
    // Đã chỉnh các gradient dựa trên mẫu ảnh
    iPhone: "from-[#FAD0C4] to-[#FFD59A]",
    iPad: "from-[#B6CCF8] to-[#99B6F0]",
    Mac: "from-[#E6CFFC] to-[#D5C0FA]",
    Watch: "from-[#A5B4FC] to-[#8C9DFB]",
    AirPods: "from-gray-200 to-gray-100",
  };
  // Dùng màu mặc định nếu không khớp
  return gradients[categoryName] || "from-gray-200 to-gray-100";
}

// --- Component chính ---
export default async function HomePage() {
  const [products, userRole] = await Promise.all([
    getProducts(),
    getUserRole(),
  ]);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <h1 className="text-4xl sm:text-5xl font-semibold  tracking-tight">
            Khám phá dòng sản phẩm.
          </h1>
          {userRole === "ADMIN" ? (
            <Link href={"/admin"}>
              <Button variant={"outline"}>Go to Management Products</Button>
            </Link>
          ) : (
            ""
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: ProductProps) => (
            <div key={product.id} className="group block">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* Image Container with Gradient Background */}
                <div
                  className={`relative h-[360px] bg-gradient-to-br ${getCategoryGradient(
                    product.category
                  )} flex items-center justify-center`}
                >
                  <Image
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    // FIX BUG HOVER: Đảm bảo ảnh có z-index thấp hơn text info (z-10 < z-20)
                    className="object-cover object-center transform scale-[1.25] group-hover:scale-[1.35] transition-transform duration-700 z-10"
                    quality={80}
                    priority={false}
                  />
                </div>

                {/* Product Info - FIX BUG HOVER: Thêm z-index cao hơn ảnh (z-20) */}
                <div className="p-8 text-center relative z-20 mt-8">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="text-orange-500 text-xs font-semibold uppercase tracking-wide">
                      {product.category && typeof product.category === "object"
                        ? product.category?.name
                        : product.category}
                    </span>
                  </div>

                  {/* Product Name & Description */}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {product.name}
                  </h3>

                  {product.description && (
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed line-clamp-3 h-[60px] overflow-hidden">
                      Thiết kế sáng tạo cho hiệu năng và thời lượng pin vượt
                      trội.
                    </p>
                  )}

                  {/* Pricing - Đã sửa định dạng giá */}
                  <div className="mb-8">
                    <p className="text-sm text-gray-900">
                      Từ
                      <span className="font-semibold text-lg">
                        {product.price.toLocaleString("vi-VN")} $
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      hoặc
                      {(product.price / 24).toFixed(0).toLocaleString("vi-VN")}
                      ₫/th. trong 24 tháng!
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center items-center gap-6">
                    <Link href={`/products/${product.id}`} passHref>
                      <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-sm">
                        Tìm hiểu thêm
                      </Button>
                    </Link>

                    <Link
                      href={`/checkout/${product.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center whitespace-nowrap"
                      passHref
                    >
                      Mua
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
