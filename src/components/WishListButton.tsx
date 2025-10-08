// src/components/WishlistButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/toast";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function WishlistButton({
  productId,
  initialIsInWishlist,
}: {
  productId: string;
  initialIsInWishlist: boolean;
}) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const method = isInWishlist ? "DELETE" : "POST";
    try {
      const res = await fetch(`/api/wishlist/${productId}`, { method });
      if (res.ok) {
        setIsInWishlist(!isInWishlist);
        router.refresh(); // Cập nhật lại server component để lấy dữ liệu mới nếu cần
      } else {
        throw new Error("Failed to update wishlist");
      }
    } catch (error) {
      console.error(error);
      showToast("Please log in to manage your wishlist.", "error");
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
      <Heart
        className={`w-5 h-5 transition-all ${
          isInWishlist ? "fill-red-500 text-red-500" : ""
        }`}
      />
      {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
}
