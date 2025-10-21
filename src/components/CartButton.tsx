// src/components/CartButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/toast";
import { ShoppingCart } from "lucide-react"; // Đổi icon
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartButton({
  // Đổi tên component
  productId,
  initialIsInCart, // Đổi tên prop
}: {
  productId: string;
  initialIsInCart: boolean;
}) {
  const [isInCart, setIsInCart] = useState(initialIsInCart); // Đổi tên state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const method = isInCart ? "DELETE" : "POST"; // Logic giữ nguyên
    try {
      const res = await fetch(`/api/cart/${productId}`, { method });
      if (res.ok) {
        setIsInCart(!isInCart);
        router.refresh();
        showToast(
          isInCart ? "Removed from cart" : "Added to cart", // Thông báo thành công
          "success"
        );
      } else {
        // Ném lỗi cụ thể hơn nếu có thể từ response
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to update cart" }));
        throw new Error(errorData.message || "Failed to update cart");
      }
    } catch (error: any) {
      console.error(error);
      if (
        error.message.includes("Unauthorized") ||
        error.response?.status === 401
      ) {
        showToast("Please log in to manage your cart.", "error");
      } else {
        showToast(error.message || "An error occurred.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleClick}
      disabled={loading}
      className="w-full flex items-center gap-2"
    >
      <ShoppingCart // Đổi icon
        className={`w-5 h-5 transition-colors ${
          isInCart ? "fill-blue-500 text-blue-500" : "" // Thay đổi màu fill
        }`}
      />
      {/* Đổi text */}
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
}
