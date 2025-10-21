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
import { NavLinksClient } from "./NavLinksClient";
import getCategories from "@/Data/getCategory";
import { ShoppingCart } from "lucide-react"; // Bỏ ShoppingCartIcon nếu không dùng
// Bỏ import getProducts và ProductProps nếu không dùng ở đây nữa

// Hàm lấy dữ liệu user Kinde VÀ thông tin từ DB (bao gồm inCart)
const getUserDataWithCart = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return null;

  const dbUserWithCart = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      role: true,
      inCart: {
        select: { id: true },
      },
      firstName: true,
      lastName: true,
    },
  });

  if (!dbUserWithCart) return null;

  return {
    ...user, // id, email, given_name, family_name, picture từ Kinde
    role: dbUserWithCart.role,
    inCart: dbUserWithCart.inCart, // Mảng sản phẩm trong giỏ hàng (chỉ có id)
  };
};

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const [userDataWithCart, categories] = await Promise.all([
    getUserDataWithCart(),
    getCategories(),
  ]);

  // Logic upsert user vào DB khi họ đăng nhập (giữ nguyên nếu có)
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email ?? "", // Cung cấp giá trị mặc định nếu email là null
        firstName: user.given_name,
        lastName: user.family_name,
        // Role mặc định là USER khi tạo mới
      },
    });
  }
  // --- Kết thúc logic upsert ---

  const cartItemCount = userDataWithCart?.inCart?.length ?? 0; // Lấy số lượng từ dữ liệu đã fetch

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo (giữ nguyên) */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TechGear<span className="text-blue-600">Alden</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 flex justify-center">
          <NavLinksClient categories={categories} user={userDataWithCart} />
        </div>

        {/* User Profile / Login */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {!(await isAuthenticated()) || !userDataWithCart ? (
            <>
              <LoginLink>
                <Button variant="ghost">Log In</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign Up</Button>
              </RegisterLink>
            </>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Link href="/cart" passHref legacyBehavior>
                <a className="text-3xl relative cursor-pointer hover:opacity-70 transition-opacity hover:text-blue-600 hover:scale-105 duration-300">
                  <ShoppingCart />
                  {cartItemCount > 0 && ( // Chỉ hiển thị số lượng nếu > 0
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none">
                      {cartItemCount}
                    </span>
                  )}
                </a>
              </Link>
              {/* User Profile */}
              {/* Truyền user data đầy đủ (Kinde + DB) vào UserProfile */}
              <UserProfile user={userDataWithCart} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
