"use client";

import React, { useState } from "react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

  return (
    <FormFormat title="Crea una cuenta en" accent="BubbleChat!">
      {/* Primer Nombre */}
      <FormInputs
        id="firstName"
        label="Primer Nombre"
        placeholder="Ingresa tu primer nombre"
        type="text"
      />

      {/* Segundo Apellido */}
      <FormInputs
        id="lastName"
        label="Apellido"
        placeholder="Ingresa tu apellido"
        type="text"
      />

      {/* Email */}
      <FormInputs
        id="email"
        label="Email"
        placeholder="Ingresa tu email"
        type="email"
      />

      <div id="create-account" className="mt-6">
        <Link href={"/auth/verify-email"}>
          <Primarybutton>Siguiente</Primarybutton>
        </Link>
      </div>
    </FormFormat>
  );
}

export default NewAccountPage;
