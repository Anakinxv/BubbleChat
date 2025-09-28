"use client";

import React from "react";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { registerPasswordSchema } from "@/schemas/Auth.schema";
import { useRegisterFlow } from "@/hooks/auth/useRegisterFlow";
import { useGlobalError } from "@/hooks/ui/useGlobalError";
import { useGlobalLoading } from "@/hooks/ui/useGlobalLoading";
import { useAppStore } from "@/store/useAppStore";

function CrearContraseña() {
  const { registerPasswordData } = useAppStore();
  const setRegisterPasswordData = useAppStore(
    (state) => state.setregisterPasswordData
  );
  const {
    isLoading,
    currentError,
    handleSecondStepSubmit,
    isRegisterLoading,
    isResendLoading,
  } = useRegisterFlow();

  useGlobalLoading(isLoading);
  useGlobalError([currentError], []);

  return (
    <FormFormat
      title="Crear Contraseña"
      description="La contraseña debe tener al menos 8 caracteres"
    >
      <FormWrapper
        schema={registerPasswordSchema}
        defaultValues={{
          password: registerPasswordData.password,
          confirmPassword: registerPasswordData.confirmPassword,
        }}
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
          onChange={(e) =>
            setRegisterPasswordData({
              ...registerPasswordData,
              password: e.target.value,
            })
          }
        />
        <FormInputs
          id="repeat-password"
          label="Repetir contraseña"
          placeholder="Repite tu nueva contraseña"
          type="password"
          required
          name="confirmPassword"
          onChange={(e) =>
            setRegisterPasswordData({
              ...registerPasswordData,
              confirmPassword: e.target.value,
            })
          }
        />
        <div className="mt-6">
          <Primarybutton disabled={isLoading}>
            {isRegisterLoading
              ? "Registrando..."
              : isResendLoading
              ? "Enviando código..."
              : "Siguiente"}
          </Primarybutton>
        </div>
      </FormWrapper>
    </FormFormat>
  );
}

export default CrearContraseña;
