import React from "react";
import NavbarTabs from "./NavbarComponents.tsx/NavbarTabs";
import Image from "next/image";
import UsersActions from "./NavbarComponents.tsx/UsersActions";

function Navbar() {
  return (
    <nav className="grid grid-cols-3 items-center px-12 py-6 ">
      <div id="background" className="flex justify-start items-center">
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
      <div className="flex justify-center">
        <NavbarTabs />
      </div>
      <div className="flex justify-end items-center">
        <UsersActions />
      </div>
    </nav>
  );
}

export default Navbar;
