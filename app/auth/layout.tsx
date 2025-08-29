"use client";
import Image from "next/image";
import ThemeSelector from "@/components/CommonComponents/ThemeSelector";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline.from("#background", {
      opacity: 0,
      y: -200,
      duration: 0.5, // Reduced from 1s to 0.5s
      ease: "power2.out",
    });
  });

  return (
    <div className=" grid grid-cols-2  w-full h-screen">
      <div id="background" className="relative h-full w-full">
        <Image
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175143/WallpaperBubble_ahq5vf.png"
          alt="background"
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>
      <div className=" container h-full w-full bg-[var(--theme-background)]">
        <div id="theme-selector">
          <ThemeSelector />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
