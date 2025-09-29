"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import rateLimit from "@/lib/rateLimit";
import { headers } from "next/headers";

export async function valideEmail(email: string) {
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("host") ||
      "127.0.0.1";

    const { success } = await rateLimit.limit(ip);

    if (!success) {
      redirect("/too-fast");
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (user) {
      return {
        valid: false,
        message: "Este correo ya está registrado.",
      };
    }

    return {
      valid: true,
      message: "Correo disponible.",
    };
  } catch (error) {
    console.error("Error validating email:", error);
    return {
      valid: false,
      message: "Error interno del servidor.",
    };
  }
}
