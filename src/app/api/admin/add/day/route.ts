/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id }: { type: string; id: number } = body;
    const { isAuthenticated, response, decoded } = await authenticateRequest(
      req
    );
    if (!isAuthenticated) return response;
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const exp = new Date();
    exp.setDate(exp.getDate() + 30); // วันนี้ + 30 วัน
    console.log(exp);
    
    const data = await prisma.eakey.updateMany({
      where: {
        type: type,
        userId: id,
        mainkey: 'main',
      },
      data: {
        exp,
      },
    });
    console.log(data);

    return NextResponse.json(
      { message: "EA Add successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
