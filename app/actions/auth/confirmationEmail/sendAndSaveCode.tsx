"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function sendAndSaveCode({
  email,
  type,
}: {
  email: string;
  type: "verification" | "reset";
}) {
  // Verifica si el usuario existe antes de continuar
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: "No existe un usuario con ese email." };
  }

  // Genera un código aleatorio de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Decide qué campo actualizar según el tipo
  const data =
    type === "verification"
      ? {
          verificationToken: code,
          verificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
        }
      : {
          resetPasswordToken: code,
          resetPasswordExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
        };

  // Guarda el código en el usuario
  await prisma.user.update({
    where: { email },
    data,
  });

  // Envía el email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject:
      type === "verification"
        ? "Your Email Verification Code"
        : "Your Password Reset Code",
    html: `<h1>Your code is: ${code}</h1>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, code };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
