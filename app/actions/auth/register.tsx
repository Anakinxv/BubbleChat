"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateUniqueUsername from "@/lib/generateUniqueUsername";
import { redirect } from "next/navigation";
import {
  registerPasswordSchema,
  registerStepOneSchema,
} from "@/schemas/Auth.schema";

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function registerService(data: RegisterData) {
  const { name, lastName, email, password } = data;

  try {
    const stepOneParsed = registerStepOneSchema.safeParse({
      name,
      lastName,
      email,
    });
    if (!stepOneParsed.success) {
      const firstError = stepOneParsed.error.issues[0].message;
      throw new Error(firstError);
    }

    const passwordParsed = registerPasswordSchema.safeParse({
      password,
      confirmPassword: data.confirmPassword,
    });
    if (!passwordParsed.success) {
      const firstError = passwordParsed.error.issues[0].message;
      throw new Error(firstError);
    }

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

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name: mergeName,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    // Crear el perfil asociado

    await prisma.profile.create({
      data: {
        userId: newUser.id,
        username,
        displayName: mergeName,
      },
    });
    // ligar cuenta en tabla accounts para next-auth
    await prisma.account.create({
      data: {
        user: { connect: { id: newUser.id } },
        type: "credentials",
        provider: "credentials",
        providerAccountId: email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Ocurrió un error desconocido" };
  }
}
