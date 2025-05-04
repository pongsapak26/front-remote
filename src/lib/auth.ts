// lib/auth.ts
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function verifyUser(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    
    return payload; // คืน payload กลับมา เช่น { id, email }
  } catch (err) {
    console.error('JWT verification failed', err);
    return null;
  }
}
export async function verifyAdmin(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    console.log(payload.role);
    
    return payload.role
  } catch (err) {
    console.error('JWT verification failed', err);
    return null;
  }
}

export async function verifyTokenUser(token: string) {
    try {
        console.log(token);
        
      const { payload } = await jwtVerify(token, secret);
      console.log('Payload:', payload); // แสดง payload ใน console
      return payload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
}

export async function authenticateRequest(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return {
      isAuthenticated: false,
      response: NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      ),
    };
  }

  const decoded = await verifyTokenUser(token);

  if (!decoded || !decoded.id) {
    return {
      isAuthenticated: false,
      response: NextResponse.json(
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      ),
    };
  }

  return { isAuthenticated: true, decoded };
}