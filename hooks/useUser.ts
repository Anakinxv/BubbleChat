import { useSession, signIn, signOut } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return { session, isAuthenticated, signIn, signOut };
};
