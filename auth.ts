// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub, // detecta AUTH_GITHUB_ID y AUTH_GITHUB_SECRET
    Google, // detecta AUTH_GOOGLE_ID y AUTH_GOOGLE_SECRET
    Facebook, // detecta AUTH_FACEBOOK_ID y AUTH_FACEBOOK_SECRET
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige siempre al dashboard después de login
      return `${baseUrl}/app/home`;
    },
  },
});
