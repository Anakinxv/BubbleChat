"use client";
import React from "react";
import NavbarOthers from "@/components/CommonComponents/Layouts/NavbarOthers";
import ClassicSideBar from "@/components/CommonComponents/Layouts/ClassicSideBar";
import Protruding from "@/components/CommonComponents/Layouts/Protruding";
import Dock from "@/components/CommonComponents/Layouts/Dock";
import actualAppearance from "../../lib/ActualApperene";

export default function Layout({ children }: { children: React.ReactNode }) {
  const appearance = actualAppearance();

  return (
    <div>
      {appearance === "Navbar Superior" && <NavbarOthers />}
      {appearance === "Sidebar Clásico" && (
        <NavbarOthers pages={children}>
          <ClassicSideBar />
        </NavbarOthers>
      )}
      {appearance === "Sidebar Destacado" && (
        <NavbarOthers pages={children}>
          <Protruding />
        </NavbarOthers>
      )}
      {appearance === "Dock Inferior" && <NavbarOthers dock={<Dock />} />}
      {/* Si no es sidebar, muestra children normalmente */}
      {(appearance === "Navbar Superior" || appearance === "Dock Inferior") &&
        children}
    </div>
  );
}
