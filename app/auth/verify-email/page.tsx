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

import { useVerifyEmailCode } from "@/hooks/auth/setVerifyEmailCode";
import { useReSendCode } from "@/hooks/auth/setReSendCode";
import { useGlobalError } from "@/hooks/ui/useGlobalError";
import { useGlobalLoading } from "@/hooks/ui/useGlobalLoading";
import { da } from "zod/v4/locales";

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

  const emailforverification = useAppStore(
    (state) => state.verifyEmailData.email
  );
  const verifyEmailData = useAppStore((state) => state.verifyEmailData);

  const errorGlobal = useAppStore((state) => state.error);

  const { handleVerifyCode, isLoading, currentError, resetVerifyCode } =
    useVerifyEmailCode();

  const {
    handleReSendCode,
    isLoading: isResendLoading,
    currentError: resendError,
    resetResendCode,
  } = useReSendCode();

  useGlobalLoading(isLoading || isResendLoading);
  useGlobalError([currentError, resendError], []);

  return (
    <FormFormat
      title="Verificar Email"
      description="Introdúcelo abajo para verificar"
      email={emailforverification}
    >
      <FormWrapper
        schema={otpSchema}
        defaultValues={{ otp: verifyEmailData.code }}
        onSubmit={(data) => {
          handleVerifyCode(data);
        }}
      >
        <InputVerification id="otp" />{" "}
        {errorGlobal && (
          <p className="text-red-500 text-sm mt-2">{errorGlobal}</p>
        )}
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
