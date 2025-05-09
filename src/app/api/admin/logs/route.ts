import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const logs = await prisma.log.findMany()
  return NextResponse.json(logs)
}
