import React from "react";
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
  return (
    <>
      {/* Navbar Superior */}
      <nav className="sticky top-0 z-50 grid grid-cols-2 items-center justify-center px-6 mb-6 transparent ">
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
      <div className="flex w-full mt-0 min-h-[calc(100vh-120px)]">
        {/* Sidebar si existe */}
        {children && (
          <aside className="px-6 sticky top-[120px] h-[calc(100vh-120px)]">
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
