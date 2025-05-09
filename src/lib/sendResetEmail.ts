import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    host: "mail.afkprofitlab.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // กรณีใช้ HostAtom
    },
  });

  const html = `
  <div style="max-width: 600px; margin: auto; padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="text-align: center; color: #2563eb; font-size: 24px; margin-bottom: 16px;">🔐 รีเซ็ตรหัสผ่านของคุณ</h2>

    <p style="font-size: 16px; color: #111827; line-height: 1.6;">
      เราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ หากคุณไม่ได้ส่งคำขอนี้ กรุณาเพิกเฉยต่ออีเมลนี้
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetLink}" style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500;">
        🔁 รีเซ็ตรหัสผ่านตอนนี้
      </a>
    </div>

    <p style="font-size: 15px; color: #4b5563;">
      หากคุณมีปัญหาในการคลิกลิงก์ กรุณาคัดลอก URL ด้านล่างไปวางในเบราว์เซอร์ของคุณ:
    </p>

    <div style="background-color: #f3f4f6; padding: 12px; border-radius: 4px; word-break: break-all; font-size: 14px; color: #1f2937;">
      ${resetLink}
    </div>

    <p style="font-size: 12px; color: #9ca3af; margin-top: 32px; text-align: center;">
      © 2025 AFK Profit Lab — ระบบรีเซ็ตรหัสผ่านอัตโนมัติ
    </p>
  </div>
  `;

  await transporter.sendMail({
    from: `"AFK Profit Lab" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🔐 รีเซ็ตรหัสผ่านของคุณ",
    html,
  });
}