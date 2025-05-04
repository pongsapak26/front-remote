import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.eaProduct.findMany({ where: { deleted: false } })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const data = await req.json()
  const product = await prisma.eaProduct.create({ data })
  return NextResponse.json(product)
}

export async function PUT(req: Request) {
  const data = await req.json()
  const { id, ...update } = data
  const product = await prisma.eaProduct.update({ where: { id }, data: update })
  return NextResponse.json(product)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  await prisma.eaProduct.update({ where: { id }, data: { deleted: true, deletedAt: new Date() } })
  return NextResponse.json({ success: true })
}
