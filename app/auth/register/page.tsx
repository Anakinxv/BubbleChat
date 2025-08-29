"use client";
import React from "react";
import FormFormat from "@/components/AuthComponents/FormFormat";
import AuthBubbles from "@/components/AuthComponents/AuthBubbles";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AuthRegisterbubble from "@/components/AuthComponents/AuthRegisterbubble";
import Primarybutton from "@/components/CommonComponents/Primarybutton";

function Register() {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.out" },
    });

    // Establecer estado inicial para todos los elementos que se van a animar
    gsap.set(
      [
        "#logo",
        "#title",
        "#email",
        "#password",
        "#login-button",
        "#auth-bubble-1",
        "#auth-bubble-2",
        "#auth-bubble-3",
        "#divider",
        "#create-account",
        "#auth-link",
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Animar logo
    masterTimeline.to("#logo", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animar título
    masterTimeline.to(
      "#title",
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Animar burbujas de autenticación con stagger
    masterTimeline.to(
      ["#auth-bubble-1", "#auth-bubble-2", "#auth-bubble-3"],
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // Animar resto de elementos
    masterTimeline.to(
      ["#divider", "#create-account", "#auth-link"],
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, []);

  return (
    <FormFormat title="Únete Hoy a" accent="BubbleChat!">
      <div className="flex flex-col gap-4">
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
        <Link href={"/auth/new-account"}>
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            Crear una cuenta
          </Primarybutton>
        </Link>
      </div>

      <div
        id="auth-link"
        className="flex justify-center items-center mt-6 text-[var(--color-text)] text-m"
      >
        <p className="mr-1">¿Tienes una cuenta?</p>
        <Link href="/auth/login">
          <Primarybutton
            className="theme-text-purple p-0 h-auto text-sm"
            variant="link"
          >
            Iniciar Sesión
          </Primarybutton>
        </Link>
      </div>
    </FormFormat>
  );
}

export default Register;
