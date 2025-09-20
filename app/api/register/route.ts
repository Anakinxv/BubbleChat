import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { registerSchema } from "@/schemas/Auth.schema";
import generateUniqueUsername from "@/lib/generateUniqueUsername";
import { headers } from "next/headers";
import rateLimit from "@/lib/rateLimit";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { email, username, password } = data;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return redirect("/too-fast");
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }
  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  // Validate input with schema
  const parseResult = registerSchema.safeParse(data);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      emailVerified: null,
      id: uuidv4(),
      // Prisma maneja createdAt y updatedAt automáticamente
    },
  });

  const uniqueUsername = await generateUniqueUsername(username);

  // Create profile after user is created
  const newProfile = await prisma.profile.create({
    data: {
      username: uniqueUsername,
      userId: newUser.id,
    },
  });

  const Account = await prisma.account.create({
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
      },
      profile: {
        id: newProfile.id,
        username: newProfile.username,
      },
    },
    { status: 201 }
  );
}
