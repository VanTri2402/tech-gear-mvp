// ... các import giữ nguyên ...

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WishlistButton } from "@/components/WishListButton";
import Link from "next/link";
import prisma from "@/lib/db";
import Image from "next/image";
import { CarTaxiFrontIcon, ShoppingCartIcon } from "lucide-react";
const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  return (
    <Card className="w-[1080px] h-[120%] py-4 px-2 m-auto mt-[120px]">
      <CardContent className="flex justify-start gap-8 h-full">
        <div className="w-[55%] flex-shrink-0">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl group cursor-pointer">
            <img
              src={product?.imageUrl || "https://placehold.co/600x600"}
              alt={product?.name || "Product Image"}
              // Đảm bảo ảnh lấp đầy khung và giữ tỷ lệ
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        <div className="w-[50%] flex flex-col h-full">
          <div className="flex-grow space-y-4 pt-4">
            <CardHeader className="p-0 space-y-2">
              <CardTitle className="text-3xl font-bold hover:scale-[1.01] duration-200">
                {product?.name}
              </CardTitle>
            </CardHeader>
            <div className="flex items-center justify-between mt-8 ">
              <div className="text-lg text-center text-gray-500 pb-4">
                {product?.price} USD
              </div>
              <div className="w-auto text-left">
                {product?.id && (
                  <WishlistButton
                    productId={product.id}
                    initialIsInWishlist={false}
                  />
                )}
              </div>
            </div>
            <Separator />
            <CardDescription className="pt-4">
              <div className="text-base">{product?.description}</div>
            </CardDescription>
          </div>
          <CardFooter className="p-0 mt-8">
            <Button size="lg" className="w-[50%]">
              Buy Product
              <ShoppingCartIcon />
            </Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
