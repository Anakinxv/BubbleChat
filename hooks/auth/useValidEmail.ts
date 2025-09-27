"use client";

import api from "../axiosconfig";
import { useQuery } from "@tanstack/react-query";

async function isEmailValid(email: string): Promise<boolean> {
  try {
    const response = await api.post("/auth/validemail", { email });

    return response.data.valid;
  } catch (error) {
    return false;
  }
}

function useValidEmail(email: string) {
  return useQuery({
    queryKey: ["validEmail", email],
    queryFn: () => isEmailValid(email),
    enabled: !!email,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Retry once on failure
    retryDelay: 2000, // Wait 2 seconds before retrying
    refetchOnMount: false,
    refetchOnWindowFocus: true,
  });
}

export { useValidEmail };
