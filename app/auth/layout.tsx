"use client";
import Image from "next/image";
import ThemeSelector from "@/components/CommonComponents/ThemeSelector";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  // Control de pantalla - solo muestra imagen en pantallas grandes (1024px+)
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useGSAP(() => {
    if (isDesktop) {
      const timeline = gsap.timeline();
      timeline.from("#background", {
        opacity: 0,
        y: -200,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isDesktop]);

  return (
    <div
      className={`grid w-full min-h-screen ${
        isDesktop ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {/* Background Image - Solo se renderiza en desktop */}
      {isDesktop && (
        <div id="background" className="relative h-full w-full">
          <Image
            src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175143/WallpaperBubble_ahq5vf.png"
            alt="background"
            fill
            className="object-cover pointer-events-none select-none"
            priority
          />
        </div>
      )}

      {/* Content Section */}
      <div className="w-full bg-[var(--theme-background)]  min-h-screen flex flex-col">
        {/* Theme Selector */}
        <div id="theme-selector" className="mb-4 lg:mb-6">
          <ThemeSelector />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
