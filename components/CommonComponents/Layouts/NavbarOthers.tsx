import React, { useEffect, useState } from "react";
import Image from "next/image";
import UsersActions from "../NavbarComponents.tsx/UsersActions";

function NavbarOthers({
  children, // aquí recibes el sidebar
  dock, // dock inferior
  pages, // contenido principal
}: {
  children?: React.ReactNode;
  dock?: React.ReactNode;
  pages?: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // o un loader

  return (
    <>
      {/* Navbar Superior */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-12 py-4 sm:py-6 bg-transparent">
        <div className="flex justify-start items-center ">
          <Image
            id="logo"
            src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175063/LogoBubble_aa2hml.png"
            alt="Logo"
            className="pointer-events-none select-none"
            priority
            height={120}
            width={120}
          />
        </div>
        <div className="flex justify-end items-center ">
          <UsersActions />
        </div>
      </nav>

      {/* Layout con Sidebar + Pages */}
      <div className="flex flex-col sm:flex-row w-full mt-0 min-h-[calc(100vh-120px)]">
        {/* Sidebar si existe */}
        {children && (
          <aside className="px-2 sm:px-6 sticky top-[120px] h-[calc(100vh-120px)]">
            {children}
          </aside>
        )}

        {/* Pages */}
        <main className="flex-1">{pages}</main>
      </div>

      {/* Dock si existe */}
      {dock && <div>{dock}</div>}
    </>
  );
}

export default NavbarOthers;
