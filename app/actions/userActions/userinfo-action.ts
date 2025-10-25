"use server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserInfo(userId: string) {
  try {
    console.time("DB_LOOKUP");
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    console.timeEnd("DB_LOOKUP");

    if (userData) {
      console.log("✅ User info served from DATABASE for user:", userId);
      return userData;
    }

    return null;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw new Error("Error al obtener información del usuario");
  }
}
