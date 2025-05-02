/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { isAuthenticated, response, decoded } = await authenticateRequest(req);
    if (!isAuthenticated) return response;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const eakeys = await prisma.eakey.findMany({
      where: { userId: decoded.id as number },
    });
    return NextResponse.json({ eakeys });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching eakeys", error: error.message },
      { status: 400 }
    );
  }
}
