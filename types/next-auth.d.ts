import NextAuth, { DefaultSession } from "next-auth";

// ✅ Extiende la interfaz de Session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

// ✅ Extiende la interfaz de JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
