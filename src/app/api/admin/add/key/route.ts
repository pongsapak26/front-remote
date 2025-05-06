
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";
import { generateRandomText } from "@/lib/genkey";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eaName, type, id } = body;
    const { isAuthenticated, response, decoded } = await authenticateRequest(req);
    if (!isAuthenticated) return response;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
    });
    
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.keylimit <= 0) {
      return NextResponse.json(
        { message: "Key limit reached" },
        { status: 201 }
      );
    }

    const eaapiKey = generateRandomText(10);

    const checkMainkey = await prisma.eakey.findFirst({
      where: {
        mainkey:"main"
      }
    })
    const date = checkMainkey == null ? new Date() :  checkMainkey.exp
    const data = await prisma.eakey.create({
      data: {
        eaName,
        userId: Number(id),
        eaapiKey,
        buyStart: 0,
        buyEnd: 0,
        sellStart: 0,
        sellEnd: 0,
        type,
        mainkey: `${checkMainkey==null?'main':'sub'}`,
        exp: date
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

