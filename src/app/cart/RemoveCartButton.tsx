// src/app/cart/RemoveFromCartButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/toast";
import { Trash2, Loader2 } from "lucide-react"; // Import Loader2
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"; // Import useTransition

export function RemoveFromCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Hook để quản lý loading state và UI update

  const handleRemove = async () => {
    // Không cần useState loading nữa, dùng isPending từ useTransition
    // setLoading(true);

    try {
      const res = await fetch(`/api/cart/${productId}`, { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to remove item from cart");
      }

      // Dùng startTransition để cập nhật UI mượt hơn
      startTransition(() => {
        router.refresh(); // Tải lại Server Component (CartPage)
        showToast("Item removed from cart", "success");
      });
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "An error occurred.", "error");
    }
    // Không cần setLoading(false) nữa
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleRemove}
      disabled={isPending} // Disable khi đang xử lý
      className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 disabled:opacity-50"
      aria-label="Remove item"
    >
      {isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" /> // Hiển thị icon loading
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </Button>
  );
}
