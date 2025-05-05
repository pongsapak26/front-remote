import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.eaProduct.findMany({ where: { deleted: false } })
  return NextResponse.json(products)
}