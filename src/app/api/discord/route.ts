import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import axios from "axios";
import prisma from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

// แทนที่ด้วย Webhook URL จริงของคุณ
const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD || "";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const { isAuthenticated, response, decoded } = await authenticateRequest(req);
  if (!isAuthenticated) return response;
  if (!decoded || !decoded.id) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }

  try {
    // แปลง File เป็น Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const product = formData.get("product") as string;
    const price = Number(formData.get("price") as string);
    const username = formData.get("username");
    const userId = formData.get("userId");
    const typeproduct = formData.get("description") as string;
    const couponId = formData.get("couponId");
    // สร้าง FormData สำหรับส่งเข้า Discord

    if (couponId !== "0") {
      await prisma.couponUse.create({
        data: {
          userId: Number(userId),
          couponId: Number(couponId),
        },
      });
      await prisma.coupon.update({
        where: {
          id: Number(couponId),
        },
        data: {
          count: {
            decrement: 1, // ลดค่าของ count ลง 1
          },
        },
      });
    }

    const discordForm = new FormData();
    const description = `ลูกค้า User ${username} \nจ่ายเงิน เรียบร้อยแล้ว! ${price} บาท \nแพ็คเกจ ${product}`;

    discordForm.append(
      "payload_json",
      JSON.stringify({
        content: description,
      })
    );
    discordForm.append("file", buffer, file.name); // หรือ 'image.jpg'
    // ส่งไปยัง Discord Webhook
    await axios.post(DISCORD_WEBHOOK_URL, discordForm, {
      headers: {
        ...discordForm.getHeaders(),
      },
    });
    // บันทึก transaction ใน Prisma
    const transaction = await prisma.transaction.create({
      data: {
        product,
        price,
        description: typeproduct,
        status: "pending", // ปรับตาม logic
        user: {
          connect: { id: decoded.id as number },
        },
      },
    });
    console.log(transaction);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending image to Discord:", error);
    return NextResponse.json(
      { error: "Failed to send image" },
      { status: 500 }
    );
  }
}
