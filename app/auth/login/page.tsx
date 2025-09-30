"use client";

import React, { useCallback, useState } from "react";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import AuthBubbles from "@/components/AuthComponents/AuthBubbles";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/schemas/Auth.schema";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import type { LoginSchemaType } from "@/types/Auth.types";
import { useAppStore } from "@/store/useAppStore";
import { useGlobalError } from "@/hooks/ui/useGlobalError";
import { loginWithCredentials } from "@/app/actions/auth/auth-actions";

function Page() {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 0.15, ease: "power2.out" },
    });

    masterTimeline.from("#logo", { opacity: 0, y: -40, duration: 0.2 });
    masterTimeline.from("#title", { opacity: 0, y: -20, duration: 0.15 });

    [
      "#email",
      "#password",
      "#login-button",
      "#divider",
      "#auth-bubbles",
      "#auth-link",
    ].forEach((selector) => {
      masterTimeline.from(selector, { opacity: 0, y: -20, duration: 0.15 });
    });
  }, []);

  const error = useAppStore((state) => state.error);
  const setLoading = useAppStore((state) => state.setLoading);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useGlobalError([submitError], [() => setSubmitError(null)]);

  const handleLoginSubmit = useCallback(
    async (values: LoginSchemaType) => {
      setLoading(true);
      try {
        const result = await loginWithCredentials(
          values.email,
          values.password
        );

        if (!result.success) {
          setLoading(false);
          setSubmitError(result.error || "Error de autenticación");
        } else {
          setLoading(false);
          window.location.href = "/app/home";
        }
      } catch (error) {
        setLoading(false);
        setSubmitError(
          error instanceof Error ? error.message : "Error desconocido"
        );
      }
    },
    [setLoading]
  );

  return (
    <FormFormat title="Inicia sesión en" accent="BubbleChat!">
      <FormWrapper
        schema={loginSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={handleLoginSubmit}
      >
        {error && (
          <div className="mb-4 p-3 text-red-600 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}
        <FormInputs
          id="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          type="email"
        />

        <div id="password" className="mt-4">
          <FormInputs
            id="password"
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
          />
          <div className="flex justify-end mt-2">
            <Link href={"/auth/recover-password"}>
              <Button
                type="button"
                className="theme-text-purple"
                variant={"link"}
              >
                Olvidaste tu contraseña?
              </Button>
            </Link>
          </div>
        </div>

        <div id="login-button" className="mt-6">
          <Primarybutton type="submit">Iniciar sesión</Primarybutton>
        </div>

        <div
          id="divider"
          className="flex items-center gap-4 mt-6 text-[var(--color-text)]"
        >
          <hr className="flex-1 rounded-full theme-border" />
          <p className="px-3 font-semibold text-[var(--color-secondary)]">O</p>
          <hr className="flex-1 rounded-full theme-border" />
        </div>

        <div id="auth-bubbles" className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-4 mt-6 w-3/4">
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
      </FormWrapper>
    </FormFormat>
  );
}

export default Page;
