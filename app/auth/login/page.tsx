"use client";

import React from "react";
import FormInputs from "@/components/AuthComponents/FormInputs";
import FormFormat from "@/components/AuthComponents/FormFormat";
import { Button } from "@/components/ui/button";
import AuthBubbles from "@/components/AuthComponents/AuthBubbles";
function Page() {
  return (
    <>
      <FormFormat title="Inicia sesión en" accent="BubbleChat">
        <FormInputs
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(value) => console.log(value.target.value)}
        />

        <div className="mt-4">
          <FormInputs
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(value) => console.log(value.target.value)}
          />{" "}
          <div className="flex justify-end mt-2">
            {" "}
            <Button className="theme-text-purple" variant={"link"}>
              Olvidaste tu contraseña?
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Button className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
            Iniciar sesión
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-6 text-[var(--color-text)]">
          <hr className="flex-1  rounded-full theme-border" />
          <p className="px-3 font-semibold text-[var(--color-secondary)]">O</p>
          <hr className="flex-1 rounded-full theme-border" />
        </div>

        <div className="flex flex-col items-center ">
          <div className="grid grid-cols-3 gap-4 mt-6 w-3/4  ">
            <AuthBubbles />
          </div>
        </div>

        <div className="flex justify-center items-center mt-6 text-[var(--color-text)] text-m">
          <p className="mr-1">¿No tienes una cuenta?</p>
          <Button
            className="theme-text-purple p-0 h-auto text-sm"
            variant="link"
          >
            Regístrate
          </Button>
        </div>
      </FormFormat>
    </>
  );
}

export default Page;
