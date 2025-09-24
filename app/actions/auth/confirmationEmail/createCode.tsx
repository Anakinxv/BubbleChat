"use server";

import prisma from "@/lib/prisma";

export async function createVerificationCode(
  email: string,
  type: "verification" | "reset"
) {
  // Genera un código aleatorio de 6 dígitos
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Decide qué campo actualizar según el tipo
  if (type === "verification") {
    await prisma.user.update({
      where: { email },
      data: {
        verificationToken: code,
        verificationTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      },
    });
  } else if (type === "reset") {
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: code,
        resetPasswordExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      },
    });
  }

  return code;
}
