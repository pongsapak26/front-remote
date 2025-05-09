// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { logAction } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const { password, token, userId } = await req.json();

  if (!token || !userId) {
    return NextResponse.json(
      { status: false, message: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" },
      { status: 400 }
    );
  }

  const resetRecord = await prisma.passwordReset.findFirst({
    where: {
      userId: Number(userId),
      token,
      expiresAt: { gte: new Date() },
    },
  });

  if (!resetRecord) {
    return NextResponse.json(
      { status: false, message: "ลิงก์ไม่ถูกต้องหรือหมดอายุ" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { password: hashedPassword },
  });

  // ลบ token นี้ออก (ใช้ได้ครั้งเดียว)
  await prisma.passwordReset.delete({
    where: { id: resetRecord.id },
  });

  await logAction({
    user: userId.toString(),
    action: "RESET_PASSWORD",
    detail: `RESET_PASSWORD USER_ID: ${userId}`,
  });

  return NextResponse.json({
    status: true,
    message: "เปลี่ยนรหัสผ่านสำเร็จ",
  });
}
