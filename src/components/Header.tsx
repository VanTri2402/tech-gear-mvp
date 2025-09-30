import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import prisma from "@/lib/db";
const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (user && user.email) {
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        firstName: user.given_name,
        lastName: user.family_name,
      },
      create: {
        id: user.id,
        email: user.email,
        firstName: user.given_name,
        lastName: user.family_name,
      },
    });
  }
  return (
    <div>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href={"/"} className="text-xl font-bold ">
            TechGear<span className="text-blue-500">Alden</span>
          </Link>
          <div className="flex items-center gap-4">
            {!(await isAuthenticated()) ? (
              <>
                <LoginLink>
                  <Button variant="secondary">Login</Button>
                </LoginLink>
                <RegisterLink>
                  <Button>Register</Button>
                </RegisterLink>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <p>Hello, {user?.given_name}</p>
                <LogoutLink>
                  <Button variant="secondary">Logout</Button>
                </LogoutLink>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
