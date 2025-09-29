import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode } from "@/app/actions/auth/confirmationEmail/CodeVerification";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { useGlobalError } from "../ui/useGlobalError";

export function useVerifyEmailCode() {
  const router = useRouter();
  const verifyEmailData = useAppStore((state) => state.verifyEmailData);
  const setverifyEmailData = useAppStore((state) => state.setverifyEmailData);
  const setGlobalError = useAppStore((state) => state.setError); // <-- agrega esto

  const {
    mutateAsync: verifyCode,
    isPending: isVerifyCodeLoading,
    error: verifyCodeError,
    reset: resetVerifyCode,
  } = useMutation({
    mutationFn: async (data: {
      email: string;
      code: string;
      type: "verification" | "reset";
    }) => {
      const response = await verifyEmailCode(data);
      if (!response.success) {
        throw new Error(
          response.error || "Error desconocido durante la verificación"
        );
      }
      return response;
    },
  });

  const isLoading = isVerifyCodeLoading;
  const currentError = verifyCodeError;

  const handleVerifyCode = async (data: { otp: string }) => {
    setGlobalError(""); // Limpia el error global antes de intentar

    if (!verifyEmailData.email) {
      setGlobalError("El email es obligatorio.");
      return;
    }

    if (!data.otp) {
      setGlobalError("El código es obligatorio.");
      return;
    }
    try {
      await verifyCode({
        email: verifyEmailData.email,
        code: data.otp,
        type: "verification",
      });
      router.push("/auth/login");
      setverifyEmailData({ email: "", code: "" });
    } catch (error: any) {
      setGlobalError(error.message || "Error verificando el código.");
      console.error("Error verifying email code:", error);
    }
  };

  return { handleVerifyCode, isLoading, currentError, resetVerifyCode };
}
