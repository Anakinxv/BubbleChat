"use client";

import { valideEmail } from "@/app/actions/auth/confirmationEmail/valideEmail";
import { useMutation } from "@tanstack/react-query";

export function useValidEmail(email: string) {
  return useMutation({
    mutationFn: async (email: string) => {
      return await valideEmail(email);
    },
  });
}
