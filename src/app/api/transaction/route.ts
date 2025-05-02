/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateRequest } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
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
    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(decoded.id) },
    });
    
    
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, product, price, description } = await req.json();

    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        product,
        price: parseFloat(price),
        description,
      },
    });

    return NextResponse.json(newTransaction);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
