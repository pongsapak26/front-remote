// app/api/coupons/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.coupon.findMany({ where: { deleted: false } });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.coupon.create({
    data: {
      ...body,
      count: Number(body.count),
      discount: Number(body.discount),
      exp: new Date(body.exp),
    },
  });
  return NextResponse.json(created);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...update } = body;
  const updated = await prisma.coupon.update({
    where: { id },
    data: {
      ...update,
      count: Number(update.count),
      discount: Number(update.discount),
      exp: new Date(update.exp),
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.coupon.update({
    where: { id },
    data: { deleted: true, deletedAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
