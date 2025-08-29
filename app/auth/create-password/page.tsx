"use client";

import React from "react";

import FormFormat from "@/components/AuthComponents/FormFormat";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

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

  return (
    <FormFormat
      title="Crear Contraseña"
      description="  La contraseña debe tener al menos "
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
        label="Repetir contraseña"
        placeholder="Repite tu nueva contraseña"
        type="password"
        required
      />
      <div>
        <div id="next-button" className="mt-6">
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            <Link href={"/app/home"}>Siguiente</Link>
          </Primarybutton>
        </div>
      </div>
    </FormFormat>
  );
}

export default CrearContraseña;
