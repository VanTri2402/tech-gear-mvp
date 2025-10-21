// src/components/Header.tsx
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Button } from "./ui/button";
import prisma from "@/lib/db";
import { UserProfile } from "./UserProfile";
import { NavLinksClient } from "./NavLinksClient"; // Đảm bảo tên import đúng
import getCategories from "@/Data/getCategory";
import { ShoppingCart, ShoppingCartIcon } from "lucide-react";
import getProducts from "@/Data/getProdcut";
import { ProductProps } from "@/types/ProductType";

const getCombinedUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  return { ...user, role: dbUser?.role };
};

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const userData = await getCombinedUserData();
  const categories = await getCategories();

  // Logic upsert...
  // ...

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TechGear<span className="text-blue-600">Alden</span>
          </Link>
        </div>

        {/* Navigation Menu - Giao phó toàn bộ cho NavLinksClient */}
        <div className="flex-1 flex justify-center">
          <NavLinksClient categories={categories} user={userData} />
        </div>

        {/* User Profile / Login */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {!(await isAuthenticated()) || !userData ? (
            <>
              <LoginLink>
                <Button variant="ghost">Log In</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign Up</Button>
              </RegisterLink>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-3xl relative mr-2 cursor-pointer hover:opacity-70 transition-opacity hover:text-blue-600 hover:scale-105 duration-300">
                <ShoppingCart />

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                  {(await getProducts()).length}
                </span>
              </div>
              <UserProfile user={userData} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
