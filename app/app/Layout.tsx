"use client";
import React from "react";
import Navbar from "@/components/CommonComponents/Navbar";
import ClassicSideBar from "@/components/CommonComponents/Layouts/ClassicSideBar";
import NavbarOthers from "@/components/CommonComponents/Layouts/NavbarOthers";
import Protruding from "@/components/CommonComponents/Layouts/Protruding";
import Dock from "@/components/CommonComponents/Layouts/Dock";
import actualAppearance from "../../lib/ActualApperene";

export default function Layout({ children }: { children: React.ReactNode }) {
  const appearance = actualAppearance();

  let sidebar = null;
  let dock = null;

  if (appearance === "Sidebar Clásico") sidebar = <ClassicSideBar />;
  if (appearance === "Sidebar Destacado") sidebar = <Protruding />;
  if (appearance === "Dock Inferior") dock = <Dock />;

  return (
    <div>
      {appearance === "Navbar Superior" && <Navbar />}
      {(appearance === "Sidebar Clásico" ||
        appearance === "Sidebar Destacado" ||
        appearance === "Dock Inferior") && (
        <NavbarOthers children={sidebar} dock={dock} pages={children} />
      )}
      {appearance === "Navbar Superior" && children}
    </div>
  );
}
