/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // ดึง token จาก cookie
    const id = req.url.split("/").pop(); // ดึง id จาก URL
    if (!id) {
      return NextResponse.json(
        { message: "Invalid request: No ID provided" },
        { status: 400 }
      );
    }

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

    const eakeys = await prisma.eakey.findFirst({
      where: { id: Number(id) },
    });

    return NextResponse.json({ eakeys });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching eakeys", error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: any) {
    
  try {
    const { id } = params; // Extracting `id` from `params`
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();

    const { isAuthenticated, response, decoded } = await authenticateRequest(
      req
    );
    if (!isAuthenticated) return response;

    if (!decoded?.id) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }
    
    const eakey = await prisma.eakey.update({
      where: { id: numericId, userId: decoded.id as number },
      data: {
        eaName: body.eaName,
        type: body.type,
        buyStart: Number(body.buyStart),
        buyEnd: Number(body.buyEnd),
        sellStart: Number(body.sellStart),
        sellEnd: Number(body.sellEnd),
        breakevenrang: Number(body.breakevenrang),
        breakeventrigger: Number(body.breakeventrigger),
        trailingfibo: Number(body.trailingfibo),
        trailingrang: Number(body.trailingrang),
        buylot: Number(body.buylot),
        selllot: Number(body.selllot),
        selllotlimit: Number(body.selllotlimit),
        buylotlimit: Number(body.buylotlimit),
        statusBuy: body.statusBuy,
        statusSell: body.statusSell,
        account: body.account,
        updatedAt: new Date(), // Timestamp update
      },
    });

    return NextResponse.json({
      message: "✅ EA updated successfully",
      data: eakey,
    });
  } catch (error: any) {
    console.error("❌ Error updating EA:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
