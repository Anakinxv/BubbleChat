"use server";

import prisma from "@/lib/prisma";

async function generateUniqueUsername(baseName: string): Promise<string> {
  let username = baseName.replace(/\s+/g, "").toLowerCase(); // quitar espacios y minúsculas
  let exists = await prisma.profile.findUnique({ where: { username } });

  if (!exists) return username;

  // Si ya existe, añadimos números
  let suffix = 1;
  while (true) {
    const newUsername = `${username}${suffix}`;
    const taken = await prisma.profile.findUnique({
      where: { username: newUsername },
    });
    if (!taken) return newUsername;
    suffix++;
  }
}

export default generateUniqueUsername;
