/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticateRequest } from "@/lib/auth";

const prisma = new PrismaClient();

// GET /api/transaction/:id (find all by userId)
export async function GET(
  req: NextRequest,
  { params }: any
) {
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

    const transactions = await prisma.transaction.findFirst({
      where: { userId: decoded.id, id: Number(params.id) },
    });
    return NextResponse.json(transactions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PUT /api/transaction/:id (update status)
export async function PUT(
  req: NextRequest,
  { params }: any
) {
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
    const { status } = await req.json();
    const updated = await prisma.transaction.update({
      where: { id: Number(params.id), userId: decoded.id },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE /api/transaction/:id
export async function DELETE(
  req: NextRequest,
  { params }: any
) {
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
    await prisma.transaction.delete({
      where: { id: Number(params.id), userId: decoded.id },
    });
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
