// src/middleware.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/db";

export default async function middleware(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // 1. Nếu chưa đăng nhập, chuyển hướng đến trang login của Kinde
  if (!user) {
    // Dùng NextResponse để tự tạo URL đăng nhập
    const loginUrl = new URL("/api/auth/login", req.url);
    loginUrl.searchParams.set("post_login_redirect_url", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Nếu đã đăng nhập, kiểm tra vai trò trong database
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    // 3. Nếu không phải ADMIN, chuyển hướng về trang chủ
    if (dbUser?.role !== "ADMIN") {
      const homeURL = new URL("/", req.url);
      return NextResponse.redirect(homeURL);
    }
  } catch (error) {
    console.error("Middleware database error:", error);
    const homeURL = new URL("/", req.url);
    return NextResponse.redirect(homeURL);
  }
  
  // 4. Nếu là ADMIN, cho phép request đi tiếp
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export const runtime = "nodejs";