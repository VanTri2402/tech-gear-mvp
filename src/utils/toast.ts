"use client";

import { toast } from "sonner";

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "info",
  duration: number = 3000
) {
  switch (type) {
    case "success":
      toast.success(message, { duration });
      break;
    case "error":
      toast.error(message, { duration });
      break;
    case "info":
    default:
      // Sonner không có toast.info, ta dùng toast() mặc định
      toast(message, { duration, className: "bg-blue-500 text-white" });
      break;
  }
}
