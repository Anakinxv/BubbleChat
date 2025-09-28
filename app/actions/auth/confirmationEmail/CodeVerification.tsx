"use server";

import prisma from "@/lib/prisma";

export async function verifyEmailCode({
  email,
  code,
  type,
}: {
  email: string;
  code: string;
  type: "verification" | "reset";
}) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("Usuario no encontrado para el email:", email);

    return { success: false, error: "User not found." };
  }

  console.log(email, code, type);

  if (type === "verification") {
    console.log("Token recibido:", code);
    console.log("Token en BD:", user.verificationToken);
    console.log("Expira en:", user.verificationTokenExpiresAt);
    console.log("Fecha actual:", new Date());

    if (
      user.verificationToken !== code ||
      !user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      return { success: false, error: "Invalid or expired code." };
    }

    // Marca el usuario como verificado y elimina el token
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    console.log("Email verificado con éxito para:", email);

    return { success: true };
  }

  if (type === "reset") {
    if (
      user.resetPasswordToken !== code ||
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date()
    ) {
      return { success: false, error: "Invalid or expired code." };
    }

    // Elimina el token de reset (puedes agregar lógica para permitir cambio de contraseña aquí)
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    return { success: true };
  }

  return { success: false, error: "Invalid verification type." };
}
