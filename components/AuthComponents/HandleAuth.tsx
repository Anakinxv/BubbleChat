"use server";

import { signIn, auth } from "@/auth";

export async function handleSignIn(provider: string) {
  await signIn(provider);
}

export async function getSession() {
  return await auth();
}
