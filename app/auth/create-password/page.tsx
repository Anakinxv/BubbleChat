"use client";

import React, { useEffect } from "react";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { registerPasswordSchema } from "@/schemas/Auth.schema";
import { RegisterPasswordSchemaType } from "@/types/Auth.types";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/auth/setRegister";
import { useReSendCode } from "@/hooks/auth/setReSendCode";

function CrearContraseña() {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 0.15, ease: "power2.out" },
    });

    masterTimeline.from("#title", { opacity: 0, y: -20 });
    masterTimeline.from("#description", { opacity: 0, y: -20 });
    masterTimeline.from("#password", { opacity: 0, y: -20 });
    masterTimeline.from("#repeat-password", { opacity: 0, y: -20 });
    masterTimeline.from("#next-button", { opacity: 0, y: -20 });
  }, []);

  // Estados del store
  const registerStepOneData = useAppStore((state) => state.registerStepOneData);
  const setregisterStepOneData = useAppStore(
    (state) => state.setregisterStepOneData
  );
  const setregisterPasswordData = useAppStore(
    (state) => state.setregisterPasswordData
  );
  const setverifyEmailData = useAppStore((state) => state.setverifyEmailData);

  // Estados globales para el spinner del layout
  const setLoading = useAppStore((state) => state.setLoading);
  const setError = useAppStore((state) => state.setError);

  const Router = useRouter();

  // Estados de React Query
  const {
    mutateAsync: register,
    isPending: isRegisterLoading,
    error: registerError,
  } = useRegister();

  const {
    mutateAsync: resendCode,
    isPending: isResendLoading,
    error: resendError,
  } = useReSendCode();

  // Sincronizar el loading global con los estados de React Query
  useEffect(() => {
    setLoading(isRegisterLoading || isResendLoading);
  }, [isRegisterLoading, isResendLoading, setLoading]);

  // Sincronizar errores globales
  useEffect(() => {
    const currentError = registerError || resendError;
    if (currentError) {
      const errorMessage =
        currentError instanceof Error
          ? currentError.message
          : typeof currentError === "string"
          ? currentError
          : "Ocurrió un error durante el proceso";

      setError(errorMessage);

      // Limpiar error después de 5 segundos
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setError(null);
    }
  }, [registerError, resendError, setError]);

  // Estados locales para el componente
  const isLoading = isRegisterLoading || isResendLoading;
  const currentError = registerError || resendError;

  const handleSecondStepSubmit = async (data: RegisterPasswordSchemaType) => {
    try {
      const mergedData = {
        ...registerStepOneData,
        ...data,
      };

      const responseRegister = await register(mergedData);

      if (responseRegister?.success) {
        try {
          const responseResend = await resendCode({
            email: registerStepOneData.email,
            type: "verification",
          });

          if (responseResend?.success) {
            // Limpiar datos después del éxito
            setregisterStepOneData({ name: "", lastName: "", email: "" });
            setregisterPasswordData({ password: "", confirmPassword: "" });
            setverifyEmailData({ email: registerStepOneData.email, code: "" });

            Router.push("/auth/verify-email");
          }
        } catch (error) {
          console.error("Error al reenviar código:", error);
        }
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <FormFormat
      title="Crear Contraseña"
      description="La contraseña debe tener al menos "
    >
      <FormWrapper
        schema={registerPasswordSchema}
        defaultValues={{ password: "", confirmPassword: "" }}
        onSubmit={handleSecondStepSubmit}
      >
        {currentError && (
          <div className="mb-4 p-3 text-red-600 bg-red-50 border border-red-200 rounded">
            {currentError instanceof Error
              ? currentError.message
              : typeof currentError === "string"
              ? currentError
              : "Ocurrió un error durante el proceso"}
          </div>
        )}

        <FormInputs
          id="password"
          name="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          required
        />
        <FormInputs
          id="repeat-password"
          label="Repetir contraseña"
          placeholder="Repite tu nueva contraseña"
          type="password"
          required
          name="confirmPassword"
        />
        <div>
          <div id="next-button" className="mt-6">
            <Primarybutton disabled={isLoading}>
              {isRegisterLoading
                ? "Registrando..."
                : isResendLoading
                ? "Enviando código..."
                : "Siguiente"}
            </Primarybutton>
          </div>
        </div>
      </FormWrapper>
    </FormFormat>
  );
}

export default CrearContraseña;
