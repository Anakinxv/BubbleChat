// hooks/useRegisterFlow.ts
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { useReSendCode } from "@/hooks/auth/setReSendCode";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/app/actions/auth/register";
import type { RegisterInterface } from "@/app/actions/auth/register";

export function useRegisterFlow() {
  const router = useRouter();

  const {
    registerStepOneData,
    setregisterStepOneData,
    setregisterPasswordData,
    setverifyEmailData,
    setError,
    setLoading,
  } = useAppStore();

  const {
    mutateAsync: register,
    isPending: isRegisterLoading,
    error: registerError,
    reset: resetRegister,
  } = useMutation({
    mutationFn: async (data: RegisterInterface) => {
      const response = await registerService(data);
      if (!response.success) {
        throw new Error(
          response.error || "Error desconocido durante el registro"
        );
      }
      return response;
    },
  });

  const {
    handleReSendCode,
    isLoading: isResendLoading,
    currentError: resendError,
    resetResendCode,
  } = useReSendCode();

  const isLoading = isRegisterLoading || isResendLoading;
  const currentError = registerError || resendError;

  const handleSecondStepSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      // Limpieza de errores previos
      resetRegister();
      resetResendCode();
      setError(null);
      setLoading(true);

      // Paso 1: Unir datos y registrar usuario
      const mergedData = { ...registerStepOneData, ...data };
      await register(mergedData);

      // Paso 2: Enviar código de verificación
      await handleReSendCode({
        email: registerStepOneData.email,
        type: "verification",
      });

      // Paso 3: Limpieza y redirección
      setverifyEmailData({ email: registerStepOneData.email, code: "" });
      setregisterStepOneData({ name: "", lastName: "", email: "" });
      setregisterPasswordData({ password: "", confirmPassword: "" });

      setLoading(false);
      router.push("/auth/verify-email");
    } catch (err: any) {
      // Usa el error global siempre
      setError(err?.message || "Error durante el registro");
      setLoading(false);
    }
  };

  return {
    isLoading,
    currentError,
    handleSecondStepSubmit,
    isRegisterLoading,
    isResendLoading,
  };
}
