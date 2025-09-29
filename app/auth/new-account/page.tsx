"use client";

import React, { use, useState, useEffect } from "react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppStore } from "@/store/useAppStore";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { registerStepOneSchema } from "@/schemas/Auth.schema";
import { RegisterStepOneSchemaType } from "@/types/Auth.types";
import { useRouter } from "next/navigation";
import { useValidEmail } from "@/hooks/auth/useValidEmail";
import { useGlobalError } from "@/hooks/ui/useGlobalError";
import { useGlobalLoading } from "@/hooks/ui/useGlobalLoading";
import { useDebounce } from "@uidotdev/usehooks";

function NewAccountPage() {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 0.15, ease: "power2.out" },
    });

    masterTimeline.from("#logo", {
      opacity: 0,
      y: -40,
      duration: 0.2,
      ease: "power2.out",
    });
    masterTimeline.from("#title", {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.out",
    });

    ["#firstName", "#lastName", "#email", "#create-account"].forEach(
      (id, index) => {
        masterTimeline.from(id, {
          opacity: 0,
          y: 20,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    );
  });

  const setFirstStepData = useAppStore((state) => state.setregisterStepOneData);
  const registerStepOneData = useAppStore((state) => state.registerStepOneData);
  const email = useAppStore((state) => state.registerStepOneData.email);

  // Debounce the email to avoid too many requests
  const debouncedEmail = useDebounce(email, 500);

  const emailValidationMutation = useValidEmail(debouncedEmail);

  const Router = useRouter();

  // Trigger email validation when debounced email changes
  useEffect(() => {
    if (debouncedEmail && debouncedEmail.includes("@")) {
      emailValidationMutation.mutate(debouncedEmail);
    }
  }, [debouncedEmail]);

  const handleFirstStepSubmit = (data: RegisterStepOneSchemaType) => {
    setFirstStepData(data);

    if (emailValidationMutation.data?.valid === true) {
      Router.push("/auth/create-password");
    }
  };

  const handleStatus = () => {
    if (emailValidationMutation.isPending) {
      return "pending"; // Loading
    }
    if (emailValidationMutation.data?.valid === false) {
      return "invalid"; // Email exists
    }
    if (emailValidationMutation.data?.valid === true) {
      return "valid"; // Email does not exist
    }
    return undefined;
  };

  const getStatusMessage = () => {
    if (emailValidationMutation.isPending) {
      return "Verificando...";
    }
    if (emailValidationMutation.data?.message) {
      return emailValidationMutation.data.message;
    }
    if (emailValidationMutation.error) {
      return "Error al verificar el email";
    }
    return "";
  };

  return (
    <FormFormat title="Crea una cuenta en" accent="BubbleChat!">
      <FormWrapper
        schema={registerStepOneSchema}
        defaultValues={{
          name: registerStepOneData.name,
          lastName: registerStepOneData.lastName,
          email: registerStepOneData.email,
        }}
        onSubmit={handleFirstStepSubmit}
      >
        <FormInputs
          id="name"
          name="name"
          label="Primer Nombre"
          placeholder="Ingresa tu primer nombre"
          type="text"
        />
        {/* Segundo Apellido */}
        <FormInputs
          id="lastName"
          name="lastName"
          label="Apellido"
          placeholder="Ingresa tu apellido"
          type="text"
        />
        {/* Email */}
        <FormInputs
          id="email"
          name="email"
          label="Email"
          placeholder="Ingresa tu email"
          type="email"
          onChange={(e) => {
            setFirstStepData({
              ...registerStepOneData,
              email: e.target.value,
            });
          }}
          {...(debouncedEmail && debouncedEmail.includes("@")
            ? {
                status: handleStatus(),
                statusMessage: getStatusMessage(),
              }
            : {})}
        />
        <div id="create-account" className="mt-6">
          <Primarybutton>Siguiente</Primarybutton>
        </div>
      </FormWrapper>
    </FormFormat>
  );
}

export default NewAccountPage;
