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
import { NavigationMenu } from "./NavigationMenu";
import { ModeToggle } from "./ui/modeToggle";

// Hàm helper để lấy dữ liệu người dùng tổng hợp
const getCombinedUserData = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  // Kết hợp dữ liệu từ Kinde và từ DB
  return {
    ...user, // id, email, given_name, family_name, picture từ Kinde
    role: dbUser?.role, // role từ DB
  };
};

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const userData = await getCombinedUserData();

  // Logic upsert có thể giữ nguyên nếu bạn muốn
  // ...

  return (
    <header className="backdrop-blur-md sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TechGear<span className="text-blue-600">Alden</span>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          {userData?.role === "ADMIN" && <NavigationMenu />}
        </div>
        <div className="flex-1 flex justify-end">
          <div className="my-auto">
            <ModeToggle />
          </div>
          <div className="flex items-center gap-4">
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
              <UserProfile user={userData} />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
