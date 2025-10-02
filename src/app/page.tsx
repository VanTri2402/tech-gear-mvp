// src/app/page.tsx
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

// --- Tách hàm lấy dữ liệu ra riêng ---
async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getUserRole() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null; // Trả về null nếu người dùng chưa đăng nhập
  }
  
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  return dbUser?.role; // Sẽ là 'ADMIN', 'USER', hoặc undefined
}


// --- Component chính ---
export default async function HomePage() {
  // Gọi các hàm lấy dữ liệu song song để tối ưu tốc độ tải trang
  const [products, userRole] = await Promise.all([
    getProducts(),
    getUserRole(),
  ]);

  // Bây giờ bạn đã có biến `userRole` để sử dụng
  console.log("Current User Role:", userRole);

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Our Products</h1>
      
      {/* Ví dụ về cách sử dụng userRole: Chỉ Admin mới thấy nút này */}
      {userRole === 'ADMIN' && (
        <div className="text-center mb-8">
            <Link href="/admin">
                <Button>Go to Admin Dashboard</Button>
            </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-lg overflow-hidden gr-gray-50/50 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <Link href={`/products/${product.id}`} className="group flex-grow">
              <Image
                src={product.imageUrl || 'https://placehold.co/400x300'}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover mb-4 group-hover:scale-105 transition-transform duration-300 rounded-md"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                {/* Có thể ẩn mô tả trên card để giao diện gọn hơn */}
                {/* <p className="text-gray-600 mb-4">{product.description}</p> */}
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
            <div className="mt-auto p-4 pt-0">
                {/* Ở đây bạn có thể thêm nút Wishlist và kiểm tra userRole */}
                <Button variant="outline" className="w-full">
                    Add to Cart
                </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}