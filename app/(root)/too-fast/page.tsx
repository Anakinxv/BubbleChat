"use client";
import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Primarybutton from "@/components/CommonComponents/Primarybutton";

export default function TooFastPage() {
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.from(imgRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.from(titleRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div ref={imgRef}>
        <Image
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1758346625/too-fast_no9qe3.png"
          alt="Demasiado rápido"
          width={480}
          height={480}
          className="max-w-[98vw] h-auto mb-12"
          priority
        />
      </div>
      <h1
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold text-red-600 mb-6"
      >
        ¡OIGA, TRANQUILÍCESE AHÍ, ANSIOSO! 🚨
      </h1>
      <div className="text-xl md:text-2xl mb-8 opacity-90 space-y-4">
        <p>Parece que has estado un poquito demasiado entusiasmado.</p>
        <p>Te hemos puesto una pausa temporal a tu emoción descontrolada. ®</p>
        <p>
          Relájate un ratito, respira hondo, y vuelve a intentarlo dentro de un
          momento.
        </p>
        <p>¿Qué tal si mientras tanto te preparas un cafecito? ☕</p>
      </div>
      <Link href="/" passHref>
        <Primarybutton>Volver al inicio</Primarybutton>
      </Link>
    </main>
  );
}
