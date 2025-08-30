import React from "react";
import NavbarTabs from "./NavbarComponents.tsx/NavbarTabs";
import Image from "next/image";
import UsersActions from "./NavbarComponents.tsx/UsersActions";

function Navbar() {
  return (
    <nav className="grid ">
      <div id="background" className="flex-shrink-0">
        <Image
          id="logo"
          src="https://res.cloudinary.com/dy2wtanhl/image/upload/v1756175063/LogoBubble_aa2hml.png"
          alt="Logo"
          className="pointer-events-none select-none"
          priority
          height={100}
          width={100}
        />
      </div>
      <NavbarTabs />

      <div>
        <UsersActions />
      </div>
    </nav>
  );
}

export default Navbar;
