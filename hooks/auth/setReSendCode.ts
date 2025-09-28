import { useMutation } from "@tanstack/react-query";
import { sendAndSaveCode } from "@/app/actions/auth/confirmationEmail/sendAndSaveCode";

interface SendAndSaveCodeParams {
  email: string;
  type: "verification" | "reset";
}

export async function resendCode(data: SendAndSaveCodeParams) {
  try {
    const response = await sendAndSaveCode(data);
    if (response.success) {
      return { success: true, code: response.code };
    } else {
      return { error: response.error || "Error desconocido" };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al reenviar código:", error.message);
      return { error: error.message };
    } else {
      console.error("Error al reenviar código:", error);
      return { error: "Ocurrió un error desconocido" };
    }
  }
}

export function useReSendCode() {
  return useMutation({
    mutationFn: resendCode,
  });
}
