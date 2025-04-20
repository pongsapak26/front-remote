import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // ยกเว้นเส้นทางที่ไม่ต้องตรวจ token
  const publicPaths = [
    '/',
    '/login',
    '/register'
  ]

  const isPublic = publicPaths.some(path => pathname.startsWith(path)) || pathname.startsWith('/api')

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
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