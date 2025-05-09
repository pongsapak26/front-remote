/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateRequest } from "@/lib/auth";
import { approveTransactionAndNotifyUser } from "@/lib/transaction";

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
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { id } = await req.json()
  try {
    const updated = await approveTransactionAndNotifyUser(id)
    return NextResponse.json({ status: true, transaction: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: false, message: 'Approve failed' }, { status: 500 })
  }
}