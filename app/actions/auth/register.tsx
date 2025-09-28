"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateUniqueUsername from "@/lib/generateUniqueUsername";

export interface RegisterInterface {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function registerService(data: RegisterInterface) {
  const { name, lastName, email, password } = data;

  try {
    const usedCreatedCredentials = await prisma.account.findFirst({
      where: { provider: "credentials", providerAccountId: email },
    });

    if (usedCreatedCredentials) {
      throw new Error("El correo ya está en uso");
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const mergeName = `${name} ${lastName}`.trim();

    // Generar un nombre de usuario único
    const username = await generateUniqueUsername(mergeName);

    let user;
    const userexist = await prisma.user.findUnique({
      where: { email },
    });

    if (userexist) {
      user = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          emailVerified: null,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: mergeName,
          email,
          password: hashedPassword,
          emailVerified: null,
        },
      });
    }

    // Crear el perfil asociado solo si no existe
    const profileExist = await prisma.profile.findUnique({
      where: { userId: user.id },
    });
    if (!profileExist) {
      await prisma.profile.create({
        data: {
          userId: user.id,
          username,
          displayName: mergeName,
        },
      });
    }

    const accountExist = await prisma.account.findFirst({
      where: { provider: "credentials", providerAccountId: email },
    });
    if (!accountExist) {
      await prisma.account.create({
        data: {
          user: { connect: { id: user.id } },
          type: "credentials",
          provider: "credentials",
          providerAccountId: email,
        },
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Ocurrió un error desconocido" };
  }
}
