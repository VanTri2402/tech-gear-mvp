// middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req);
}

export const config = {
  matcher: ["/admin/:path*"], // Áp dụng middleware cho tất cả các route con của /admin
};
