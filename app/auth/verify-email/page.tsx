"use client";

import React from "react";

import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import InputVerification from "@/components/AuthComponents/InputVerification";
import { useAppStore } from "@/store/useAppStore";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { otpSchema } from "@/schemas/Auth.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  const Router = useRouter();
  const emailforverification = useAppStore(
    (state) => state.registerStepOneData.email
  );
  const setReSendCode = useAppStore((state) => state.setReSendCode);

  const setVerifyEmailCode = useAppStore((state) => state.setVerifyEmailCode);

  const verifyEmailData = useAppStore((state) => state.verifyEmailData);
  const error = useAppStore((state) => state.error);
  const handleSubmit = async (data: { otp: string }) => {
    try {
      const dataEmail = {
        email: emailforverification,
        code: data.otp,
      };
      await setVerifyEmailCode(dataEmail);
      Router.push("/auth/login");
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  const handleReSendCode = async (data: {
    email: string;
    type: "verification" | "reset";
  }) => {
    try {
      await setReSendCode(data);
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  return (
    <FormFormat
      title="Verificar Email"
      description="Introdúcelo abajo para verificar"
      email={emailforverification}
    >
      <FormWrapper
        schema={otpSchema}
        defaultValues={{ otp: verifyEmailData.code }}
        onSubmit={handleSubmit}
      >
        <InputVerification id="otp" />{" "}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="w-full flex justify-center mt-4 mb-4">
          <Button
            className="theme-text-purple"
            variant={"link"}
            onClick={() => {
              handleReSendCode({
                email: emailforverification,
                type: "verification",
              });
            }}
          >
            ¿No recibiste el correo electrónico?
          </Button>
        </div>
        {/* Mostrar error si existe */}
        <div id="login-button" className="mt-6">
          <Primarybutton type="submit" id="next-button">
            Siguiente
          </Primarybutton>
        </div>
      </FormWrapper>
    </FormFormat>
  );
}

export default VerificarEmail;
