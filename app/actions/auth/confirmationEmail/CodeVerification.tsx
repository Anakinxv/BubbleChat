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
    return { success: false, error: "User not found." };
  }

  if (type === "verification") {
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

function CodeVerification() {
  return <div>CodeVerification</div>;
}

export default CodeVerification;
