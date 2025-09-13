"use client";

import React from "react";

import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import InputVerification from "@/components/AuthComponents/InputVerification";

function VerificarEmail() {
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

    masterTimeline.from("#otp", {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.out",
      stagger: 0.1,
    });

    masterTimeline.from("#login-button", {
      opacity: 0,
      y: -20,
      duration: 0.15,
      ease: "power2.out",
    });
  });

  return (
    <FormFormat
      title="Verificar Email"
      description="Introdúcelo abajo para verificar"
      email="allmyhomieshatelinkedin@gmail.com"
    >
      <InputVerification id="otp" />
      <div>
        <div id="login-button" className="mt-6">
          <Link href={"/auth/recovered-password"}>
            <Primarybutton id="next-button">Siguiente</Primarybutton>{" "}
          </Link>
        </div>
      </div>
    </FormFormat>
  );
}

export default VerificarEmail;
