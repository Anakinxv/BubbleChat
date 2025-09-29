import { useMutation } from "@tanstack/react-query";
import { sendAndSaveCode } from "@/app/actions/auth/confirmationEmail/sendAndSaveCode";

interface SendAndSaveCodeParams {
  email: string;
  type: "verification" | "reset";
}

export function useReSendCode() {
  const {
    mutateAsync: resendCode,
    isPending: isResendLoading,
    error: resendError,
    reset: resetResendCode,
  } = useMutation({
    mutationFn: async (data: SendAndSaveCodeParams) => {
      const response = await sendAndSaveCode(data);
      if (!response.success) {
        throw new Error(
          response.error || "Error desconocido durante el reenvío del código"
        );
      }
      return response;
    },
  });

  const isLoading = isResendLoading;
  const currentError = resendError;

  const handleReSendCode = async (data: SendAndSaveCodeParams) => {
    try {
      if (!data.email) {
        throw new Error("El correo electrónico es obligatorio");
      }
      resetResendCode();
      const result = await resendCode(data);
      return result;
    } catch (error) {
      console.error("Error en handleReSendCode:", error);
      throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
  };

  return { handleReSendCode, isLoading, currentError, resetResendCode };
}
