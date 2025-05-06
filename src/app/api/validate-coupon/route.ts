// app/api/validate-coupon/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, userId } = await req.json();

    if (!code || !userId) {
      return NextResponse.json({ message: "ข้อมูลไม่ครบ" }, { status: 400 });
    }    
    const coupon = await prisma.coupon.findUnique({
      where: { code },
      include: { usages: true },
    });

    if (!coupon || coupon.deleted) {
      return NextResponse.json({ message: "ไม่พบคูปองนี้" }, { status: 404 });
    }

    if (new Date(coupon.exp) < new Date()) {
      return NextResponse.json({ message: "คูปองหมดอายุแล้ว" }, { status: 400 });
    }

    if (coupon.count > 0 && coupon.usages.length >= coupon.count) {
      return NextResponse.json({ message: "คูปองถูกใช้ครบจำนวนแล้ว" }, { status: 400 });
    }

    if (coupon.onlyOnce) {
      const alreadyUsed = await prisma.couponUsage.findUnique({
        where: {
          userId_couponId: {
            userId: Number(userId),
            couponId: coupon.id,
          },
        },
      });

      if (alreadyUsed) {
        return NextResponse.json({ message: "คุณเคยใช้คูปองนี้แล้ว" }, { status: 400 });
      }
    }

    // ✅ บันทึกการใช้คูปอง
    // await prisma.couponUsage.create({
    //   data: {
    //     userId:Number(userId),
    //     couponId: coupon.id,
    //   },
    // });

    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      type: coupon.type,
      id: coupon.id,
      message: "ใช้คูปองสำเร็จ",
    });
  } catch (error) {
    console.error("validate-coupon error:", error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
