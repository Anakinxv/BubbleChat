"use client";

import React from "react";

import FormFormat from "@/components/AuthComponents/FormFormat";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import FormInputs from "@/components/AuthComponents/FormInputs";

function page() {
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
