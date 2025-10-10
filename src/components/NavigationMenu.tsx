"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CategoryProps } from "@/types/CategoryType";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { UserProps } from "@/types/UserType";

// Component cho mỗi mục trong dropdown (giữ nguyên)
const ListItem = ({ name, href }: { name: string; href: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="text-sm font-medium leading-none">{name}</div>
      </Link>
    </NavigationMenuLink>
  </li>
);

export function NavLinksClient({
  categories,
  user,
}: {
  categories: CategoryProps[];
  user: UserProps | null; // Cho phép user có thể là null
}) {
  const pathname = usePathname();
  const isAdmin = user?.role === "ADMIN";

  // --- GIAO DIỆN DÀNH CHO ADMIN ---
  if (isAdmin) {
    const adminLinks = [
      { name: "Home", href: "/" },
      { name: "Products", href: "/admin" },
      { name: "Promote", href: "/admin/decentralization" },
    ];

    return (
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-x-8">
          {/* Link Admin thông thường */}
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NavigationMenuItem key={link.name}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-blue-600",
                      isActive ? "text-blue-600" : "text-neutral-600"
                    )}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}

          {/* Dropdown Category cho Admin */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium bg-transparent text-neutral-600 hover:text-blue-600">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 lg:w-[500px]">
                {categories.map((category) => (
                  <ListItem
                    key={category.id}
                    name={category.name}
                    href={`/categories/${category.id}`}
                  />
                ))}
                <ListItem
                  key="manage-categories"
                  name="Manage All Categories"
                  href="/admin/category"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // --- GIAO DIỆN DÀNH CHO USER VÀ GUEST ---
  return (
    <div className="flex items-center gap-x-8">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-blue-600",
          pathname === "/" ? "text-blue-600" : "text-neutral-600"
        )}
      >
        Home
      </Link>
      {categories.map((category) => {
        const isActive = pathname === `/categories/${category.id}`;
        return (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={cn(
              "text-sm font-medium transition-colors hover:text-blue-600",
              isActive ? "text-blue-600" : "text-neutral-600"
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
