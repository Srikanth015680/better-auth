
"use server";

import transporter from "@/lib/node-mailer";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmailAction({
  to,
  subject,
  html,
}: SendEmailProps) {
  try {
    const info = await transporter.sendMail({
      from: `"Better Auth" <${process.env.NODEMAILER_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Email error:", error);

    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
