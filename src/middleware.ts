// src/middleware.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/db";

export default async function middleware(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    // ... logic đăng nhập
    const loginUrl = new URL("/api/auth/login", req.url);
    loginUrl.searchParams.set("post_login_redirect_url", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    // --- THÊM DÒNG DEBUG Ở ĐÂY ---
    console.log(
      `[MIDDLEWARE DEBUG] User ID: ${user.id}, Role in DB: ${dbUser?.role}`
    );
    // ----------------------------

    if (dbUser?.role !== "ADMIN") {
      console.log(
        "[MIDDLEWARE ACTION] Redirecting to home page because role is not ADMIN."
      );
      const homeURL = new URL("/", req.url);
      return NextResponse.redirect(homeURL);
    }
  } catch (error) {
    // ...
  }

  console.log("[MIDDLEWARE ACTION] Allowing access to /admin.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

export const runtime = "nodejs";
