// src/app/products/[productId]/page.tsx
import { Button } from "@/components/ui/button";
import { WishlistButton } from "@/components/WishListButton";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProductDetails(productId: string) {
  // Dùng biến môi trường, an toàn hơn
  const res = await fetch(
    `${process.env.KINDE_SITE_URL}/api/products/${productId}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function getUserWishlist() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return [];

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: { wishlist: { select: { id: true } } },
  });
  return userData?.wishlist.map((p) => p.id) || [];
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const [product, wishlist] = await Promise.all([
    getProductDetails(productId),
    getUserWishlist(),
  ]);

  if (!product) {
    notFound(); // Hiển thị trang 404 nếu không tìm thấy sản phẩm
  }

  const initialIsInWishlist = wishlist.includes(product.id);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Phần hình ảnh */}
          <div className="bg-neutral-100 rounded-2xl flex items-center justify-center p-8 aspect-square">
            <div className="relative w-full h-full">
              <Image
                src={product.imageUrl || "https://placehold.co/600"}
                alt={product.name}
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-xl"
              />
            </div>
          </div>

          {/* Phần thông tin */}
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase">
              {product.category.name}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mt-2">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl text-neutral-900">
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <div className="mt-6 prose prose-neutral">
              <p>{product.description}</p>
            </div>

            {/* Phần nút hành động */}
            <div className="mt-8 flex flex-col gap-4">
              <Button size="lg" className="w-full">
                Add to Cart
              </Button>
              <WishlistButton
                productId={product.id}
                initialIsInWishlist={initialIsInWishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
