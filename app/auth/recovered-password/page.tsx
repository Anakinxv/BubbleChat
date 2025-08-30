"use client";

import React from "react";

import FormFormat from "@/components/AuthComponents/FormFormat";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

function RecoverPassword() {
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
    masterTimeline.from("#description", {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.out",
    });

    ["#password", "#repeat-password", "#next-button"].forEach((id, index) => {
      masterTimeline.from(id, {
        opacity: 0,
        y: 20,
        duration: 0.15,
        ease: "power2.out",
      });
    });
  });

  return (
    <FormFormat
      title="Restablecer contraseña"
      description="Crea una nueva contraseña segura para acceder a tu cuenta. Debe tener al menos 8 caracteres, incluyendo letras y números."
    >
      <FormInputs
        id="password"
        label="Nueva contraseña"
        placeholder="Ingresa tu nueva contraseña"
        type="password"
        required
      />
      <FormInputs
        id="repeat-password"
        label="Confirmar contraseña"
        placeholder="Repite tu nueva contraseña"
        type="password"
        required
      />
      <div>
        <div id="next-button" className="mt-6">
          <Link href={"/successful/page"}>
            <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
              Guardar contraseña
            </Primarybutton>
          </Link>
        </div>
      </div>
    </FormFormat>
  );
}

export default RecoverPassword;
