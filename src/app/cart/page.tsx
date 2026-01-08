// src/app/cart/page.tsx
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription, // Import CardDescription
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react"; // Bỏ Trash2 vì đã dùng trong component client
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { RemoveFromCartButton } from "./RemoveCartButton";
// Định dạng tiền tệ USD (giữ nguyên)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default async function CartPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // 1. Xử lý người dùng chưa đăng nhập (giữ nguyên)
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-4">
          Your Cart is Empty (or you're not logged in!)
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Please log in to view and manage items in your shopping cart.
        </p>
        <LoginLink>
          <Button size="lg">Log In to View Cart</Button>
        </LoginLink>
      </div>
    );
  }

  // 2. Lấy danh sách sản phẩm (giữ nguyên)
  const userWithCart = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      inCart: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          description: true,
        },
        orderBy: {
          // Sắp xếp theo tên cho nhất quán (tùy chọn)
          name: "asc",
        },
      },
    },
  });

  const cartItems = userWithCart?.inCart ?? [];

  // 3. Tính tổng tiền (giữ nguyên)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // 4. Hiển thị giỏ hàng trống (giữ nguyên, cải thiện UI chút)
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-4">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our
          products!
        </p>
        <Link href="/">
          <Button size="lg" variant="outline">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  // 5. Hiển thị danh sách sản phẩm và tổng tiền (Cập nhật layout)
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold">Your Shopping Cart</h1>
        <Badge variant="secondary" className="mt-2 md:mt-0 text-base px-3 py-1">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link
                href={`/products/${item.id}`}
                className="block flex-shrink-0 w-full sm:w-28 sm:h-28 mb-4 sm:mb-0 sm:mr-6 rounded-md overflow-hidden bg-gray-100 relative aspect-square sm:aspect-auto"
              >
                <Image
                  src={item.imageUrl || "/placeholder.jpg"}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
              </Link>
              <div className="flex-grow mb-4 sm:mb-0">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {item.description || "No description available."}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(item.price)}
                </p>
              </div>
              <div className="ml-auto flex-shrink-0 self-center sm:self-auto">
                <RemoveFromCartButton productId={item.id} />
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg border border-gray-200">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-xl">Order Summary</CardTitle>{" "}
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center text-gray-600">
                <span>
                  Subtotal ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </span>{" "}
                <span className="font-medium">
                  {formatCurrency(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-medium text-green-600">Free</span>{" "}
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Estimated Tax</span>
                <span className="font-medium">
                  {formatCurrency(totalPrice * 0.08)}
                </span>
                Ví dụ 8%
              </div>
              <Separator className="my-4" /> {/* Tăng margin */}
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Order Total</span>
                <span>{formatCurrency(totalPrice)}</span>{" "}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 pt-6 border-t">
              <Button size="lg" className="w-full text-lg py-6">
                Proceed to Checkout
              </Button>
              <Link href="/" className="w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full text-lg py-6"
                >
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
