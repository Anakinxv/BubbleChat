"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getUserInfo(userId: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        profile: {
          select: {
            username: true,
            displayName: true,
            bio: true,
            avatarUrl: true,
          },
        },
      },
    });

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
