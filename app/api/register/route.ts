import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { registerStepOneSchema } from "@/schemas/Auth.schema";
import { z } from "zod";
import generateUniqueUsername from "@/lib/generateUniqueUsername";

// Crear un schema específico para el backend que no incluya confirmPassword
const backendRegisterSchema = registerStepOneSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar input con el schema del backend (sin confirmPassword)
    const parseResult = backendRegisterSchema.safeParse(data);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, lastName, email, password } = parseResult.data;
    const fullName = `${name} ${lastName}`.trim();
    const usernameBase = `${name}${lastName}`.replace(/\s+/g, "").toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name: fullName,
        emailVerified: null,
        id: uuidv4(),
      },
    });

    const uniqueUsername = await generateUniqueUsername(usernameBase);

    const newProfile = await prisma.profile.create({
      data: {
        username: uniqueUsername,
        displayName: fullName,
        userId: newUser.id,
      },
    });

    await prisma.account.create({
      data: {
        userId: newUser.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: newUser.id,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
        profile: {
          id: newProfile.id,
          username: newProfile.username,
          displayName: newProfile.displayName,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error en el endpoint /api/register:", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
