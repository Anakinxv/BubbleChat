"use client";

import React from "react";
import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";

function page() {
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

    masterTimeline.from("#emailOrUsername", {
      opacity: 0,
      y: 20,
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
      title="Encuentra tu cuenta de"
      accent="BubbleChat!"
      description="Introduce el correo electrónico o el nombre de usuario asociados a tu cuenta para cambiar tu contraseña."
    >
      <FormInputs
        id="emailOrUsername"
        label="Email o usuario"
        placeholder="Introduce tu email o usuario"
        type="text"
        onChange={(value) => console.log(value.target.value)}
      />
      <div>
        <div id="next-button" className="mt-6">
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            <Link href={"/auth/verify-email"}>Buscar</Link>
          </Primarybutton>
        </div>
      </div>
    </FormFormat>
  );
}

export default page;
