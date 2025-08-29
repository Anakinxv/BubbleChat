"use client";

import React from "react";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import { Button } from "@/components/ui/button";
import AuthBubbles from "@/components/AuthComponents/AuthBubbles";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Page() {
  useGSAP(() => {
    // Timeline principal que controla TODAS las animaciones
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

    [
      "#email",
      "#password",
      "#login-button",
      "#divider",
      "#auth-bubbles",
      "#auth-link",
    ].forEach((selector) => {
      masterTimeline.from(selector, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <>
      <FormFormat title="Inicia sesión en" accent="BubbleChat">
        <FormInputs
          id="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(value) => console.log(value.target.value)}
        />

        <div id="password" className="mt-4">
          <FormInputs
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(value) => console.log(value.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button className="theme-text-purple" variant={"link"}>
              Olvidaste tu contraseña?
            </Button>
          </div>
        </div>

        <div id="login-button" className="mt-6">
          <Button className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            Iniciar sesión
          </Button>
        </div>

        <div
          id="divider"
          className="flex items-center gap-4 mt-6 text-[var(--color-text)]"
        >
          <hr className="flex-1  rounded-full theme-border" />
          <p className="px-3 font-semibold text-[var(--color-secondary)]">O</p>
          <hr className="flex-1 rounded-full theme-border" />
        </div>

        <div id="auth-bubbles" className="flex flex-col items-center ">
          <div className="grid grid-cols-3 gap-4 mt-6 w-3/4  ">
            <AuthBubbles className="auth-methods" />
          </div>
        </div>

        <div
          id="auth-link"
          className="flex justify-center items-center mt-6 text-[var(--color-text)] text-m"
        >
          <p className="mr-1">¿No tienes una cuenta?</p>
          <Link href="/auth/register">
            <Button
              className="theme-text-purple p-0 h-auto text-sm"
              variant="link"
            >
              Regístrate
            </Button>
          </Link>
        </div>
      </FormFormat>
    </>
  );
}

export default Page;
