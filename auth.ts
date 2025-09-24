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
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid email or password");
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

    async signIn({ user, account, profile }) {
      const oauthProviders = ["google", "facebook", "github"];
      if (user && account && oauthProviders.includes(account.provider)) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Solo actualiza la imagen si el perfil no tiene avatar
          const profileDb = await prisma.profile.findFirst({
            where: { userId: existingUser.id },
          });

          if (
            (profile?.picture || profile?.avatar_url) &&
            (!profileDb?.avatarUrl || profileDb.avatarUrl === "")
          ) {
            const imageUrl = profile.picture || profile.avatar_url;
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { image: imageUrl },
            });
            await prisma.profile.updateMany({
              where: { userId: existingUser.id },
              data: { avatarUrl: imageUrl },
            });
          }
          // Si el usuario existe, verifica si ya tiene esta cuenta vinculada
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
          return true;
        } else {
          // Si no existe el usuario, permite que NextAuth lo cree automáticamente
          return true;
        }
      }

      // Para credenciales y otros casos
      return true;
    },
  },
});
