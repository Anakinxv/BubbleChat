"use client";

import React, { useState } from "react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAppStore } from "@/store/useAppStore";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { registerStepOneSchema } from "@/schemas/Auth.schema";
import { RegisterStepOneSchemaType } from "@/types/Auth.types";
import { useRouter } from "next/navigation";

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
  const error = useAppStore((state) => state.error);
  const Router = useRouter();
  const handleFirstStepSubmit = (data: RegisterStepOneSchemaType) => {
    setFirstStepData(data);
    console.log(data);

    if (!error) {
      Router.push("/auth/create-password");
    }
  };

  return (
    <FormFormat title="Crea una cuenta en" accent="BubbleChat!">
      <FormWrapper
        schema={registerStepOneSchema}
        defaultValues={{ name: "", lastName: "", email: "" }}
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
        />
        <div id="create-account" className="mt-6">
          <Primarybutton>Siguiente</Primarybutton>
        </div>{" "}
      </FormWrapper>
    </FormFormat>
  );
}

export default NewAccountPage;
