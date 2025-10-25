"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import { headers } from "next/headers";

export async function valideEmail(email: string) {
  try {
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
