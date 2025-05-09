import { prisma } from '@/lib/prisma'
import { sendMail } from './sendEmail'

export async function approveTransactionAndNotifyUser(transactionId: number) {
  const transaction = await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: 'approve' },
    include: { user: true }, // ต้อง include เพื่อดึง email
  })
  console.log(transaction.user.email);
  
//   const userEmail = transaction.user.email
  const userEmail = "final25284@gmail.com"
  const html = `
  <div style="max-width: 600px; margin: auto; padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="text-align: center; color: #16a34a; font-size: 24px; margin-bottom: 16px;">✅ คำสั่งซื้อของคุณได้รับการอนุมัติแล้ว</h2>

    <p style="font-size: 16px; color: #111827; line-height: 1.6;">
      สวัสดีครับ 👋<br>
      คำสั่งซื้อของคุณสำหรับรายการต่อไปนี้ ได้รับการอนุมัติเรียบร้อยแล้ว:
    </p>

    <div style="margin: 20px 0; padding: 16px; background-color: #e0fce4; border-radius: 6px; border-left: 4px solid #16a34a;">
      <p style="margin: 0; font-size: 16px; color: #065f46;">
        <strong>สินค้า:</strong> ${transaction.product}<br />
        <strong>จำนวนเงิน:</strong> ${transaction.price.toLocaleString()} บาท<br />
        <strong>สถานะ:</strong> อนุมัติแล้ว ✅
      </p>
    </div>

    <p style="font-size: 15px; color: #4b5563;">
      หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อทีมงานของเราได้ทุกเมื่อ
    </p>

    <div style="text-align: center; margin-top: 32px;">
      <a href="https://afkprofitlab.com" style="background-color: #16a34a; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500;">กลับไปที่เว็บไซต์</a>
    </div>

    <p style="font-size: 12px; color: #9ca3af; margin-top: 24px; text-align: center;">
      © 2025 AFK Profit Lab — ระบบจัดการคำสั่งซื้อออนไลน์
    </p>
  </div>
  `;

  await sendMail({
    to: userEmail,
    subject: 'คำสั่งซื้อของคุณได้รับการอนุมัติ',
    html,
  })

  return transaction
}
