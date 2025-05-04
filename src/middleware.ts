/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin, verifyUser } from './lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/' || pathname.startsWith('/login')) {
    return NextResponse.next();
  }
  if (pathname === '/register' || pathname.startsWith('/login') || pathname === '/api/forex') {
    return NextResponse.next();
  }
  const token = req.cookies.get("token")?.value || '';
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const role:any = await verifyAdmin(token)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')){
    if(role == 'admin'){
      return NextResponse.next();
    }else{
      return NextResponse.redirect(new URL('/', req.url));

    }
  }

  const verify = verifyUser(token)
  if (!verify) {
    return NextResponse.redirect(new URL('/login', req.url));
  }else {
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
    '/((?!_next/static|_next/image|favicon.ico|images|fonts|api).*)',
  ],
}
