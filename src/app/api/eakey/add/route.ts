/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { generateRandomText } from "@/lib/genkey";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eaName, type } = body;
    const { isAuthenticated, response, decoded } = await authenticateRequest(req);
    if (!isAuthenticated) return response;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const checkMainkey = await prisma.eakey.findFirst({
      where: {
        userId: Number(decoded.id),
        mainkey:"main"
      }
    })

    if(checkMainkey != null){
      return NextResponse.json(
        { message: "มี EA แล้ว" },
        { status: 201 }
      );
    }
    const eaapiKey = generateRandomText(10);

    const data = await prisma.eakey.create({
      data: {
        eaName,
        userId: Number(decoded.id),
        eaapiKey,
        buyStart: 0,
        buyEnd: 0,
        sellStart: 0,
        sellEnd: 0,
        type,
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
