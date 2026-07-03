import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USERNAME || process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
});

const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_FROM;
const fromName = process.env.SMTP_FROM_NAME || 'Saqib Masood';

export async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<void> {
    await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        to,
        subject,
        html,
        ...(replyTo && { replyTo }),
    });
}
