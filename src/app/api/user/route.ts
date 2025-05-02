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
    console.log("Decoded ID:", decoded.id); // Debugging linedecoded
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id as number },
      select: {
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching eakeys", error: error.message },
      { status: 400 }
    );
  }
}
