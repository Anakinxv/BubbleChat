import Image from "next/image";
import ThemeSelector from "@/components/CommonComponents/ThemeSelector";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  return (
    <div className=" grid grid-cols-2  w-full h-screen">
      <div className="relative h-full w-full">
        <Image
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175143/WallpaperBubble_ahq5vf.png"
          alt="background"
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>
      <div className=" container h-full w-full bg-[var(--theme-background)]">
        <ThemeSelector />
        <div className="w-full h-full flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
