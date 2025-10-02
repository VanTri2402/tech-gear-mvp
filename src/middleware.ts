// src/middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./lib/db"; // Đảm bảo đường dẫn này đúng

export default async function middleware(req: NextRequest) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

 
  if (!user) {
    return withAuth(req);
  }

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true }, 
    });

    if (dbUser?.role !== "ADMIN") {
      const homeURL = new URL("/", req.url);
      return NextResponse.redirect(homeURL);
    }
  } catch (error) {
    console.error("Middleware database error:", error);
    const homeURL = new URL("/", req.url);
    return NextResponse.redirect(homeURL);
  }

  return withAuth(req);
}

export const config = {
  matcher: ["/admin/:path*"],
};

export const runtime = "nodejs";