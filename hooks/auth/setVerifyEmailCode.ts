import { useMutation } from "@tanstack/react-query";
import { verifyEmailCode } from "@/app/actions/auth/confirmationEmail/CodeVerification";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { verify } from "crypto";

export function useVerifyEmailCode() {
  const router = useRouter();
  const verifyEmailData = useAppStore((state) => state.verifyEmailData);
  const setverifyEmailData = useAppStore((state) => state.setverifyEmailData);
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
    if (!verifyEmailData.email) {
      // Aquí podrías usar tu sistema global de errores

      console.log(verifyEmailData);

      console.error("Email is missing");
      return;
    }

    if (!data.otp) {
      console.error("Code is missing");
      return;
    }
    try {
      await verifyCode({
        email: verifyEmailData.email,
        code: data.otp, // Usar data.otp en lugar de verifyEmailData.code
        type: "verification",
      });
      router.push("/auth/login");
      setverifyEmailData({ email: "", code: "" });
    } catch (error) {
      console.error("Error verifying email code:", error);
    }
  };

  return { handleVerifyCode, isLoading, currentError, resetVerifyCode };
}
