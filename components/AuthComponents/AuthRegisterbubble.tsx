import AppleLight from "../../public/Apple_light.svg";
import AppleDark from "../../public/Apple_dark.svg";
import GitHubDark from "../../public/GitHub_dark.svg";
import GitHubLight from "../../public/GitHub_light.svg";
import Google from "../../public/google.svg";
import Image from "next/image";
import { useTheme } from "../CommonComponents/ThemeProvider";

type AuthBubbleType = {
  id: number;
  src: string;
  alt: string;
  text: string;
};

function AuthRegisterbubble() {
  const { currentTheme } = useTheme();

  // Fix: Check if theme is 'dark' instead of truthy value
  const isDarkTheme = currentTheme.id === "dark";

  const authBubbles: AuthBubbleType[] = [
    {
      id: 1,
      src: isDarkTheme ? AppleDark.src : AppleLight.src,
      alt: "Auth bubble 1",
      text: "Registrarse con Apple",
    },
    {
      id: 2,
      src: Google.src,
      alt: "Auth bubble 3",
      text: "Registrarse con Google",
    },
    {
      id: 3,
      src: isDarkTheme ? GitHubDark.src : GitHubLight.src,
      alt: "Auth bubble 2",
      text: "Registrarse con GitHub",
    },
  ];

  return (
    <>
      {/* Contenedor para alinear las burbujas */}
      {authBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="auth-bubble bg-[var(--theme-color-surface)] border border-[var(--theme-border)] 
                     h-[50px] rounded-full flex items-center justify-center hover:opacity-50 
                     transition-opacity duration-300 ease-in-out gap-2"
        >
          <Image
            src={bubble.src}
            alt={bubble.alt}
            className=" pointer-events-none"
            width={20}
            height={20}
          />

          <span className="ml-2 text-[var(--theme-text)] text-lg font-medium">
            {bubble.text}
          </span>
        </div>
      ))}
    </>
  );
}

export default AuthRegisterbubble;
