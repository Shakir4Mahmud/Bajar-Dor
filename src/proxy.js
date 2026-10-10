import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("reason", "login-required");
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};