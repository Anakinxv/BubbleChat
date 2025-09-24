"use server";

import nodemailer from "nodemailer";

export async function sendConfirmationEmail({
  to,
  code,
}: {
  to: string;
  code: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // bubblechatteam@gmail.com
      pass: process.env.GMAIL_PASS, // contraseña de aplicación de Gmail
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: "Your Confirmation Code",
    html: `<h1>Your code is: ${code}</h1>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
