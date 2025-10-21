// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const checkRoleUrl = new URL("/api/auth/check-role", req.url);
  const cookieHeader = req.headers.get("cookie");

  const accessDeniedURL = new URL("/access-denied", req.url);

  try {
    const response = await fetch(checkRoleUrl.toString(), {
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 401) {
        const loginUrl = new URL("/api/auth/login", req.url);
        loginUrl.searchParams.set(
          "post_login_redirect_url",
          req.nextUrl.pathname
        );
        return NextResponse.redirect(loginUrl);
      }
      const homeURL = new URL("/", req.url);
      return NextResponse.redirect(homeURL);
    }

    const { isAdmin } = await response.json();

    if (!isAdmin) {
      return NextResponse.redirect(accessDeniedURL);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(accessDeniedURL);
  } finally {
    console.log(
      `[Middleware] === Request End === Path: ${req.nextUrl.pathname}`
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
