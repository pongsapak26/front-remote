/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { convertThaiToUTC } from "@/lib/genkey";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: any 
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const eakey = await prisma.eakey.findUnique({
      where: { eaapiKey: id },
    });

    if (!eakey) {
      return NextResponse.json({ message: "Eakey not found" }, { status: 404 });
    }
    // เวลาไทยตอนนี้ (ใน UTC format)
    const datenow = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    });

    // แปลงกลับเป็น Date object
    const thaiTime = convertThaiToUTC(datenow);

    const updatetime = await prisma.eakey.update({
      where: { eaapiKey: id },
      data: {
        updatedAt: thaiTime,
      },
    });
    console.log(updatetime);
    let responseText = "";

    if (type === "rsi") {
      responseText = [
        eakey.statusBuy,
        eakey.statusSell,
        eakey.sellStart,
        eakey.sellEnd,
        eakey.buyStart,
        eakey.buyEnd,
        eakey.selllot,
        eakey.selllotlimit,
        eakey.buylot,
        eakey.buylotlimit,
        eakey.account,
      ]
        .map((item) => item?.toString() ?? "")
        .join(",");
    } else if (type === "sl") {
      responseText = [
        eakey.trailingfibo,
        eakey.trailingrang,
        eakey.breakeventrigger,
        eakey.breakevenrang,
        eakey.account,
      ]
        .map((item) => item?.toString() ?? "")
        .join(",");
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    return new NextResponse(responseText, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
