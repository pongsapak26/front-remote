import { prisma } from '@/lib/prisma';

export async function logAction({
  user,
  action,
  detail,
}: {
  user: string;         // ชื่อ, อีเมล หรือชื่อระบบ (เช่น 'system')
  action: string;
  detail?: string;
}) {
  try {
    await prisma.log.create({
      data: {
        user,
        action,
        detail,
      },
    });
  } catch (error) {
    console.error('Logging failed:', error);
  }
}