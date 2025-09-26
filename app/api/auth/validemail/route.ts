import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import rateLimit from "@/lib/rateLimit";
import { redirect } from "next/navigation";

export async function POST(req: Request): Promise<Response> {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("host") ||
      "127.0.0.1";

    const { success } = await rateLimit.limit(ip);

    if (!success) {
      redirect("/too-fast");
    }

    const { email } = await req.json();

    console.log("Verifying email:", email);

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { valid: false, message: "Email inválido." },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (user) {
      return NextResponse.json(
        { valid: false, message: "Este correo ya está registrado." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { valid: true, message: "Correo disponible." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
