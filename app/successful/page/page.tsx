"use client";

import React from "react";
import Link from "next/link";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function layout() {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 0.15, ease: "power2.out" },
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
    masterTimeline.from("#next-button", {
      opacity: 0,
      y: 20,
      duration: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
    <FormFormat
      title="¡Contraseña actualizada!"
      description="Tu contraseña ha sido restablecida con éxito."
    >
      <div id="next-button" className="mt-6">
        <Link href={"/auth/login"}>
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            Volver al inicio de sesión
          </Primarybutton>
        </Link>
      </div>
    </FormFormat>
  );
}

export default layout;
