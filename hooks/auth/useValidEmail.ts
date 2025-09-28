"use client";

import { valideEmail } from "@/app/actions/auth/confirmationEmail/valideEmail";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
export function useValidEmail(email: string) {
  const debouncedEmail = useDebounce(email, 300);

  const {
    mutate: validateEmail,
    data: validationResult,
    isPending: isValidateEmailLoading,
    error: validateEmailError,
    reset: resetValidateEmail,
  } = useMutation({
    mutationFn: async (email: string) => {
      return await valideEmail(email);
    },
  });

  // Efecto para validar automáticamente cuando el email debounced cambie
  React.useEffect(() => {
    if (debouncedEmail) {
      validateEmail(debouncedEmail);
    }
  }, [debouncedEmail, validateEmail]);

  return {
    validationResult,
    isValidateEmailLoading,
    validateEmailError,
    resetValidateEmail,
  };
}
