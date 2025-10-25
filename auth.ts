// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import generateUniqueUsername from "@/lib/generateUniqueUsername";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Google,
    Facebook,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Correo electrónico y contraseña son obligatorios");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Correo o contraseña inválidos");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) {
          throw new Error("Correo o contraseña inválidos");
        }

        // Devuelve el usuario sin la contraseña
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige siempre al dashboard después de login
      return `${baseUrl}/app/home`;
    },

    async jwt({ token, user, account, profile }) {
      // Solo la primera vez que el usuario inicia sesión
      if (user) {
        token.id = user.id;

        // Si es OAuth, crea el perfil DESPUÉS de que NextAuth haya creado el usuario
        const oauthProviders = ["google", "facebook", "github"];
        if (account && oauthProviders.includes(account.provider)) {
          await createOrUpdateProfile(user, profile);
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },

    async signIn({ user, account, profile }) {
      const oauthProviders = ["google", "facebook", "github"];
      if (user && account && oauthProviders.includes(account.provider)) {
        // Solo maneja la lógica de cuentas existentes aquí
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Verifica si ya tiene esta cuenta vinculada
          const existingAccount = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!existingAccount) {
            // Vincula la cuenta OAuth al usuario existente
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state
                  ? String(account.session_state)
                  : undefined,
              },
            });
          }

          // Actualiza o crea el perfil para usuarios existentes
          await createOrUpdateProfile(existingUser, profile);
        }
      }

      return true;
    },
  },
});

// Función auxiliar para crear o actualizar el perfil
async function createOrUpdateProfile(user: any, profile: any) {
  try {
    let existingProfile = await prisma.profile.findFirst({
      where: { userId: user.id },
    });

    const avatarUrl =
      user.image || profile?.picture || profile?.avatar_url || "";
    const displayName = user.name || "";

    if (!existingProfile) {
      // Crea el perfil si no existe
      const username = await generateUniqueUsername(
        displayName || user.email!.split("@")[0]
      );

      await prisma.profile.create({
        data: {
          userId: user.id,
          username,
          displayName,
          avatarUrl,
        },
      });
    } else {
      // Actualiza el perfil si existe pero le faltan datos
      const updateData: any = {};

      if (!existingProfile.displayName && displayName) {
        updateData.displayName = displayName;
      }

      if (
        (!existingProfile.avatarUrl || existingProfile.avatarUrl === "") &&
        avatarUrl
      ) {
        updateData.avatarUrl = avatarUrl;
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.profile.update({
          where: { userId: user.id },
          data: updateData,
        });
      }
    }
  } catch (error) {
    console.error("Error creating/updating profile:", error);
  }
}
