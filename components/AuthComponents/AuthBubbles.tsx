// SVG imports
import AppleLight from "../../public/Apple_light.svg";
import AppleDark from "../../public/Apple_dark.svg";
import GitHubDark from "../../public/GitHub_dark.svg";
import GitHubLight from "../../public/GitHub_light.svg";
import Google from "../../public/google.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type AuthBubbleType = {
  id: number;
  src: string;
  alt: string;
};

function AuthBubbles({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme(); // 'theme' = 'light' | 'dark'`

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Evita el renderizado hasta que el componente esté montado
  }

  // Fix: Check if theme is 'dark' instead of truthy value
  const isDarkTheme = theme === "dark";

  const authBubbles: AuthBubbleType[] = [
    {
      id: 1,
      src: isDarkTheme ? AppleDark.src : AppleLight.src,
      alt: "Auth bubble 1",
    },
    {
      id: 2,
      src: Google.src,
      alt: "Auth bubble 3",
    },
    {
      id: 3,
      src: isDarkTheme ? GitHubDark.src : GitHubLight.src,
      alt: "Auth bubble 2",
    },
  ];

  return (
    <>
      {/* Contenedor para alinear las burbujas */}
      {authBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bg-[var(--theme-color-surface)] border border-[var(--theme-border)] 
                     h-[50px] rounded-full flex items-center justify-center hover:opacity-50 
                     transition-opacity duration-300 ease-in-out"
        >
          <Image
            src={bubble.src}
            alt={bubble.alt}
            className=" pointer-events-none"
            width={24}
            height={24}
          />
        </div>
      ))}
    </>
  );
}

export default AuthBubbles;
