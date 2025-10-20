import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WishlistButton } from "@/components/WishListButton";
import prisma from "@/lib/db";
import { ShoppingCart, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";

const ProductDetail = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Image Section */}
          <div className="sticky top-8">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden">
              <img
                src={product.imageUrl || "/placeholder.jpg"}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-8">
            {/* Category Badge */}
            {product.category && (
              <div className="inline-flex items-center text-sm font-medium text-orange-600">
                New
              </div>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              {product.category && (
                <p className="mt-2 text-lg text-gray-500">
                  {product.category.name}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                or $99.99/mo. for 12 mo.*
              </span>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Description
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl text-base"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Bag
              </Button>

              <div className="flex gap-4">
                {product.id && (
                  <WishlistButton
                    productId={product.id}
                    initialIsInWishlist={false}
                  />
                )}
              </div>
            </div>

            <Separator />

            {/* Product Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-sm">
                <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-gray-500">
                    Order now and receive by Dec 25
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <RotateCcw className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    Free and easy returns
                  </p>
                  <p className="text-gray-500">
                    Complete your return online or at an Apple Store
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm">
                <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Two-year warranty</p>
                  <p className="text-gray-500">
                    Every product includes a standard warranty
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications - Optional */}
            <div className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">
                    {product.category?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Product ID</p>
                  <p className="font-medium text-gray-900">
                    {product.id.slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-24 space-y-12">
          <Separator />

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Get your order delivered to your doorstep at the earliest from
                our store.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">
                Pay with the world's most popular and secure payment methods.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <RotateCcw className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">
                Got a question? Look no further. Browse our FAQs or submit your
                query here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
