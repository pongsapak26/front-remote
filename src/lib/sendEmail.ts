import nodemailer from 'nodemailer'

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const transporter = nodemailer.createTransport({
    host: 'mail.afkprofitlab.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // แนะนำเฉพาะกรณี cert ไม่ตรง เช่น HostAtom
    },
  })

  await transporter.sendMail({
    from: `"AFK System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}