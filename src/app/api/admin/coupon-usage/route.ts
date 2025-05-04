// app/api/coupon-usage/route.ts
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await prisma.couponUsage.findMany({
    include: {
      user: { select: { email: true } },
      coupon: { select: { code: true } },
    },
    orderBy: { usedAt: 'desc' },
  })
  return NextResponse.json(data)
}
