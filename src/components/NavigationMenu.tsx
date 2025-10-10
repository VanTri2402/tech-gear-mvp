// KHÔNG có "use client"
import { NavigationMenu as ShadcnNavigationMenu } from "@/components/ui/navigation-menu";
import getCategories from "@/Data/getCategory";
import { CategoryProps } from "@/types/CategoryType";
import { NavLinksClient } from "./NavLinksClient";
import getUserData from "@/Data/getUser";

export async function NavigationMenu() {
  const categories: CategoryProps[] = await getCategories();
  // Giả định getUserData trả về object có thuộc tính 'role' và các thuộc tính khác của UserProps
  const user = await getUserData();

  return (
    <ShadcnNavigationMenu className="z-50">
      <NavLinksClient categories={categories} user={user} />
    </ShadcnNavigationMenu>
  );
}
