import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      eakeys: {
        where: { deleted: false }, // ถ้ามี soft-delete
        select: {
          id: true,
          mainkey: true,
          exp: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(users)
}
