"use server";
import prisma from "@/lib/prisma";
import rateLimit from "@/lib/rateLimit";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserInfo(userId: string) {
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

    // Cache
    const cacheKey = `user:${userId}:profile`;

    // Inicia y termina el timer SOLO si retorna datos de cache
    console.time("CACHE_LOOKUP");
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.timeEnd("CACHE_LOOKUP");
      console.log("✅ User info served from CACHE for user:", userId);
      return cachedData;
    }
    // Si no retorna datos, termina el timer aquí
    console.timeEnd("CACHE_LOOKUP");

    // Inicia y termina el timer SOLO si retorna datos de DB
    console.time("DB_LOOKUP");
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (userData) {
      await redis.set(cacheKey, JSON.stringify(userData), { ex: 300 });
      console.timeEnd("DB_LOOKUP");
      console.log("✅ User info served from DATABASE for user:", userId);
      return userData;
    }
    // Si no retorna datos, termina el timer aquí
    console.timeEnd("DB_LOOKUP");

    return null;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw new Error("Error al obtener información del usuario");
  }
}
