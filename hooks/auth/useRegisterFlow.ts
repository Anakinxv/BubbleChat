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
    mutateAsync: resendCode,
    isPending: isResendLoading,
    error: resendError,
    reset: resetResendCode,
  } = useReSendCode();

  const isLoading = isRegisterLoading || isResendLoading;
  const currentError = registerError || resendError;

  const handleSecondStepSubmit = async (data: any) => {
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
      await resendCode({
        email: registerStepOneData.email,
        type: "verification",
      });

      // Paso 3: Limpieza y redirección
      setregisterStepOneData({ name: "", lastName: "", email: "" });
      setregisterPasswordData({ password: "", confirmPassword: "" });
      setverifyEmailData({ email: registerStepOneData.email, code: "" });

      setLoading(false);
      router.push("/auth/verify-email");
    } catch (err: any) {
      console.error("Error en el flujo de registro:", err);
      setError(err.message || "Error durante el registro");
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
