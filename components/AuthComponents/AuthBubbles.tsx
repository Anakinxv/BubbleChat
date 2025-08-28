// SVG imports
import AppleLight from "../../public/Apple_light.svg";
import AppleDark from "../../public/Apple_dark.svg";
import GitHubDark from "../../public/GitHub_dark.svg";
import GitHubLight from "../../public/GitHub_light.svg";
import Google from "../../public/google.svg";

import { useTheme } from "../CommonComponents/ThemeProvider";

type AuthBubbleType = {
  id: number;
  src: string;
  alt: string;
};

function AuthBubbles() {
  const { currentTheme } = useTheme();

  const authBubbles: AuthBubbleType[] = [
    {
      id: 1,
      src: !currentTheme ? AppleLight.src : AppleDark.src,
      alt: "Auth bubble 1",
    },
    { id: 2, src: Google.src, alt: "Auth bubble 3" },
    {
      id: 3,
      src: !currentTheme ? GitHubLight.src : GitHubDark.src,
      alt: "Auth bubble 2",
    },
  ];

  return (
    <>
      {" "}
      {/* Contenedor para alinear las burbujas */}
      {authBubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bg-[var(--theme-color-surface)] border border-[var(--theme-border)] 
                     h-[50px]  rounded-full flex items-center justify-center hover:opacity-50 transition-opacity duration-300 ease-in-out"
        >
          <img
            src={bubble.src}
            alt={bubble.alt}
            className="h-6 w-6 pointer-events-none"
          />
        </div>
      ))}
    </>
  );
}

export default AuthBubbles;
