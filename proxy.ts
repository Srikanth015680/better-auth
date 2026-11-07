
import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;

  // 1. Get session cookie
  const sessionCookie = getSessionCookie(req);

  // 2. Check authentication routes
  const isAuthPage =
    nextUrl.pathname.startsWith("/auth/login") ||
    nextUrl.pathname.startsWith("/auth/register");

  // 3. Check protected routes
  const isProfileRoute = nextUrl.pathname.startsWith("/profile");

  const isAdminRoute = nextUrl.pathname.startsWith("/admin/dashboard");

  // 4. Redirect unauthenticated users
  if ((isProfileRoute || isAdminRoute) && !sessionCookie) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  // 5. Redirect users with a session cookie
  if (isAuthPage && sessionCookie) {
    return NextResponse.redirect(
      new URL("/profile", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/dashboard/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
