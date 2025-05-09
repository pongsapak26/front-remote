/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, verifyUser } from "./lib/auth";
import Cookies from "js-cookie";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/" || pathname.startsWith("/login")) {
    return NextResponse.next();
  }
  if (
    pathname === "/register" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/order") ||
    pathname.startsWith("/resetpassword") ||
    pathname === "/api/forex" ||
    pathname === "/forgetpassword" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy-policy"
  ) {
    return NextResponse.next();
  }
  
  const token = req.cookies.get("token")?.value || "";
  if (!token) {
    Cookies.remove("token"); // Remove token from cookies
    Cookies.remove("username"); // Remove token from cookies
    Cookies.remove("userId"); // Remove token from cookies
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role: any = await verifyAdmin(token);
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (role == "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const verify = verifyUser(token);
  if (!verify) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /**
     * ใช้ Regex นี้เพื่อ:
     * - ใช้ middleware ทุกหน้าจริงๆ
     * - แต่ยกเว้น:
     *   - /_next/ (ไฟล์ JS, CSS จาก Next.js)
     *   - /favicon.ico
     *   - /images/, /fonts/, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|api).*)",
  ],
};
