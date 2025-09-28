import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/app/actions/auth/register";
import type { RegisterInterface } from "@/app/actions/auth/register";

export async function register(data: RegisterInterface) {
  try {
    const response = await registerService(data);
    if (response.success) {
      return { success: true };
    } else {
      return { error: response.error || "Error desconocido" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error en el registro:", error.message);
      return { error: error.message };
    } else {
      console.error("Error en el registro:", error);
      return { error: "Ocurrió un error desconocido" };
    }
  }
}

// Cambia useQuery por useMutation
export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}
