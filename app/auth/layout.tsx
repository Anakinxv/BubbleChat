import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-theme="special"
      className="grid grid-cols-2 h-screen w-full bg-primary text-primary"
    >
      <div className="relative h-full w-full">
        <Image
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175143/WallpaperBubble_ahq5vf.png"
          alt="background"
          fill
          className="object-cover pointer-events-none select-none"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full bg-primary text-primary ">
        <div>{children}</div>
      </div>
    </div>
  );
}
