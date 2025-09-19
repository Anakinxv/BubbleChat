import React from "react";
import NavbarTabs from "./NavbarComponents.tsx/NavbarTabs";
import Image from "next/image";
import UsersActions from "./NavbarComponents.tsx/UsersActions";

function Navbar() {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-3 items-center px-4 sm:px-12 py-4 sm:py-6 gap-4">
      <div
        id="background"
        className="flex justify-center sm:justify-start items-center mb-2 sm:mb-0"
      >
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
      <div className="flex justify-center mb-2 sm:mb-0">
        <NavbarTabs />
      </div>
      <div className="flex justify-center sm:justify-end items-center">
        <UsersActions />
      </div>
    </nav>
  );
}

export default Navbar;
