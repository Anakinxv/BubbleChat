"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/lib/prisma";

// Helper function to validate credentials
async function validateCredentials(email: string, password: string) {
  if (!email || !password) {
    return {
      valid: false,
      error: "Correo electrónico y contraseña son obligatorios",
    };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { valid: false, error: "Usuario no encontrado" };
  }

  if (!user.password) {
    return {
      valid: false,
      error: "Este usuario no tiene contraseña configurada",
    };
  }

  const bcrypt = require("bcryptjs");
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return { valid: false, error: "Contraseña incorrecta" };
  }

  return { valid: true };
}

// Login with credentials
export async function loginWithCredentials(email: string, password: string) {
  try {
    // Validar credenciales primero
    const validation = await validateCredentials(email, password);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, data: result };
  } catch (error) {
    if (error instanceof AuthError) {
      // Mapear errores específicos de NextAuth
      if (error.type === "CredentialsSignin") {
        return { success: false, error: "Credenciales inválidas" };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: "Error de autenticación" };
  }
}

// Logout function
export async function logout() {
  try {
    await signOut({ redirectTo: "/auth/login" });
  } catch (error) {
    throw new Error("Error al cerrar sesión");
  }
}
