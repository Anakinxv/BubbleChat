import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export type UserInfoConfigState = {
  profileURL: string;
  nombreCompleto: string;
  username: string;
  email: string;
  bio: string;
};

export type UserChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

async function editUserInfoAction({
  nombreCompleto,
  username,
  email,
  bio,
  profileURL,
}: UserInfoConfigState) {
  const session = await auth();

  try {
    if (!session) {
      throw new Error("Usuario no autenticado");
    }

    const userRecord = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!userRecord) {
      throw new Error("Usuario no encontrado");
    }

    await prisma.user.update({
      where: { id: userRecord.id },
      data: {
        name: nombreCompleto,
        email,
        image: profileURL,
      },
    });

    await prisma.profile.updateMany({
      where: { userId: userRecord.id },
      data: {
        username,
        bio,
        avatarUrl: profileURL,
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error al actualizar información"
    );
  }
}

export default editUserInfoAction;

export async function editUserPasswordAction({
  currentPassword,
  newPassword,
}: UserChangePassword) {
  const session = await auth();

  if (!session) {
    throw new Error("Usuario no autenticado");
  }

  const userRecord = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!userRecord) {
    throw new Error("Usuario no encontrado");
  }

  if (!userRecord.password) {
    throw new Error("El usuario no tiene una contraseña establecida");
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    userRecord.password
  );

  if (!isPasswordValid) {
    throw new Error("Contraseña actual incorrecta");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}
