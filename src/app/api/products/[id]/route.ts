import { authenticateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = req.url.split("/").pop(); // ดึง id จาก URL
  if (!id) {
    return NextResponse.json(
      { message: "Invalid request: No ID provided" },
      { status: 400 }
    );
  }

  const { isAuthenticated, response, decoded } = await authenticateRequest(req);
  if (!isAuthenticated) return response;
  if (!decoded || !decoded.id) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
  const products = await prisma.eaProduct.findFirst({
    where: { sku:id ,deleted: false },
  });
  return NextResponse.json(products);
}
