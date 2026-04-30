import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAMES } from "./lib/constants";

export function proxy(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAMES.USER_ID)?.value;
  const { pathname } = req.nextUrl;

  const requestHeaders = new Headers(req.headers);

  if (session) {
    requestHeaders.set("x-user-session", session);
  }

  /* Auth pages */
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  // if (isAuthPage && session) {
  //   return NextResponse.redirect(new URL("/my-account", req.url));
  // }

  const logoutParam = req.nextUrl.searchParams.get("logout");

  if (isAuthPage && session && logoutParam !== "1") {
    return NextResponse.redirect(new URL("/my-account", req.url));
  }

  /* Protected routes */
  const protectedRoutes = [
    "/my-account",
    "/profile-update",
    "/application-status",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  /* Redirect if not logged in */
  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
