"use client";
import React from "react";
import FormFormat from "@/components/AuthComponents/FormFormat";
import { Button } from "@/components/ui/button";
import AuthBubbles from "@/components/AuthComponents/AuthBubbles";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AuthRegisterbubble from "@/components/AuthComponents/AuthRegisterbubble";

function Register() {
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

    [
      "#email",
      "#password",
      "#login-button",
      "#auth-bubbles", // Cambiar .auth-bubble por #auth-bubbles
      "#divider",
      "#create-account", // Agregar el botón de crear cuenta
      "#auth-link",
    ].forEach((selector) => {
      masterTimeline.from(selector, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: "power2.out",
      });
    });
  });

  return (
    <FormFormat title="Únete Hoy a" accent="BubbleChat">
      <div id="auth-bubbles" className="flex flex-col gap-4">
        <AuthRegisterbubble />
      </div>

      <div
        id="divider"
        className="flex items-center gap-4 mt-6 text-[var(--color-text)]"
      >
        <hr className="flex-1 rounded-full theme-border" />
        <p className="px-3 font-semibold text-[var(--color-secondary)]">O</p>
        <hr className="flex-1 rounded-full theme-border" />
      </div>

      <div id="create-account" className="mt-6">
        <Button className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
          Crear una cuenta
        </Button>
      </div>

      <div
        id="auth-link"
        className="flex justify-center items-center mt-6 text-[var(--color-text)] text-m"
      >
        <p className="mr-1">¿Tienes una cuenta?</p>
        <Link href="/auth/login">
          <Button
            className="theme-text-purple p-0 h-auto text-sm"
            variant="link"
          >
            Iniciar Sesión
          </Button>
        </Link>
      </div>
    </FormFormat>
  );
}

export default Register;
