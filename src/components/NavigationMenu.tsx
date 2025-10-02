// src/components/NavigationMenu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/admin" },
  { name: "Categories", href: "/admin/category" },
  { name: "Promote", href: "/admin/decentralization" },
];

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-md font-medium hover:text-blue-500 transform hover:scale-105 duration-300",
              isActive
                ? "text-neutral-900" // Màu chữ cho link active
                : "text-neutral-500 hover:text-blue-500" // Màu chữ cho link thường
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}