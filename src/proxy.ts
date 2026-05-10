import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // get supabase token
  const token =
    request.cookies.get("sb-access-token") ||
    request.cookies.get("sb-access-token.0");

  const pathname = request.nextUrl.pathname;

  // protected routes
  const protectedRoutes = [
    "/dashboard",
    "/recruiter",
    "/admindashboard",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // if not logged in
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/recruiter/:path*",
    "/admindashboard/:path*",
  ],
};