"use client";

import React from "react";
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

  const setPasswordData = useAppStore((state) => state.setregisterPasswordData);
  const registerStepOneData = useAppStore((state) => state.registerStepOneData);
  const setregister = useAppStore((state) => state.setregister);
  const error = useAppStore((state) => state.error);
  const isLoading = useAppStore((state) => state.isloading);
  const Router = useRouter();

  const handleSecondStepSubmit = async (data: RegisterPasswordSchemaType) => {
    try {
      setPasswordData(data);

      if (registerStepOneData) {
        const { name, lastName, email } = registerStepOneData;
        const { password, confirmPassword } = data;

        const mergeData = {
          name,
          lastName,
          email,
          password,
          confirmPassword,
        };

        await setregister(mergeData);
        console.log(mergeData);

        // Si no hay error, redirige
        if (!useAppStore.getState().error) {
          Router.push("/auth/verify-email");
        }
      }
    } catch (error) {
      console.error(error);
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
        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
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
              {isLoading ? "Registrando..." : "Siguiente"}
            </Primarybutton>
          </div>
        </div>
      </FormWrapper>
    </FormFormat>
  );
}

export default CrearContraseña;
