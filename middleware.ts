import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";
const ADMIN_SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN || "mahyar-admin-session-v1";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // فقط مسیرهای ادمین (به جز صفحه ورود و API لاگین/لاگ‌اوت)
  const isAdminPage =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login");

  const isAdminProtectedApi =
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login") &&
    !pathname.startsWith("/api/admin/logout");

  if (!isAdminPage && !isAdminProtectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = token === ADMIN_SESSION_TOKEN;

  if (!isAuthenticated) {
    if (isAdminProtectedApi) {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی غیرمجاز. لطفاً وارد شوید.",
        },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
