import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { sendResetEmail } from "@/lib/sendResetEmail";
import { logAction } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { status: false, message: "ไม่พบบัญชีนี้ในระบบ" },
      { status: 404 }
    );
  }

  // สร้าง token และบันทึกลง db หรือส่งแบบ one-time
  const token = uuidv4();
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${token}&id=${user.id}`;

  // (ตัวอย่างนี้เก็บ token ชั่วคราวไว้ใน DB หรือ memory store ถ้ามี)
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 นาที
    },
  });
  await logAction({
    user: user.id.toString(),
    action: "FORGET_PASSWORD",
    detail: `FORGET_PASSWORD USERNAME: ${user.username} MAIL: ${user.email}`,
  });
  await sendResetEmail(user.email, resetLink);

  return NextResponse.json({
    status: true,
    message: "ระบบได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว",
  });
}
