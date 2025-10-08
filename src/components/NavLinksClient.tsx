"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CategoryProps } from "@/types/CategoryType";

import {
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { UserProps } from "@/types/UserType";

// Định nghĩa các link thông thường
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/admin" },
  { name: "Promote", href: "/admin/decentralization" },
];

// Component cho mỗi mục trong dropdown content
const ListItem = ({
  name,
  href,
  className,
  ...props
}: {
  name: string;
  href: string;
  className?: string;
}) => (
  <li>
    <Link
      href={href}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{name}</div>
    </Link>
  </li>
);

export function NavLinksClient({
  categories,
  user,
}: {
  categories: CategoryProps[];
  user: UserProps;
}) {
  const pathname = usePathname();

  return (
    <NavigationMenuList className="flex items-center gap-x-8">
      {/* 1. Các Link thông thường */}
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <NavigationMenuItem key={link.name}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className={cn(
                  "text-md font-medium transform hover:scale-105 duration-300 cursor-pointer",
                  isActive
                    ? "text-blue-600"
                    : "text-neutral-500 hover:text-blue-500"
                )}
              >
                {link.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        );
      })}

      {/* 2. Category Dropdown (Hover Menu) */}
      <NavigationMenuItem>
        <NavigationMenuTrigger className="text-md font-medium text-neutral-500 hover:text-blue-500 transition hover:scale-105 duration-300">
          {user?.role === "ADMIN" ? (
            <Link href="/admin/category">Categories</Link>
          ) : (
            "Categories"
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] grid-cols-3 grid-rows-2 d:grid-cols-2 lg:w-[600px]">
            {categories.map((category) => (
              <ListItem
                key={category.id}
                name={category.name}
                href={`/categories/${category.id}`}
              />
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
