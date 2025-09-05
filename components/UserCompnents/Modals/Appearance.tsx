"use client";

import React from "react";
import BaseModal from "./BaseModal";
import { useState, useEffect } from "react";
import actualAppearance from "../../../lib/ActualApperene";
type AppearanceProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

function Appearance({ title, isOpen, onClose }: AppearanceProps) {
  const [selectedAppearance, setSelectedAppearance] = useState(
    actualAppearance()
  );

  useEffect(() => {
    // Solo ejecuta en cliente
    const stored = localStorage.getItem("appearance");
    if (stored) setSelectedAppearance(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("appearance", selectedAppearance!);
  }, [selectedAppearance]);

  // Solo las 4 opciones que mencionaste
  const differentAppearance = [
    {
      id: 1,
      name: "Navbar Superior",
      description: "Navegación horizontal en la parte superior, sin sidebar.",
    },
    {
      id: 2,
      name: "Sidebar Clásico",
      description:
        "Barra lateral con íconos dentro de burbujas y el nombre debajo.",
    },
    {
      id: 3,
      name: "Sidebar Destacado",
      description:
        "Barra lateral donde el ítem seleccionado aparece resaltado dentro de una burbuja con ícono y texto.",
    },
    {
      id: 4,
      name: "Dock Inferior",
      description: "Navegación tipo dock, flotante en la parte inferior.",
    },
  ];

  return (
    <BaseModal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 p-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold theme-text-primary">
            Navegación
          </h3>
          <p className="theme-text-secondary text-sm">
            Elige el estilo de navegación que más te guste
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
          {differentAppearance.map((appearance) => (
            <div
              key={appearance.id}
              className={`flex flex-row sm:flex-col items-center sm:items-start p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 theme-border border min-h-[64px] sm:min-h-[100px] w-full aspect-[2/1] sm:aspect-auto
                ${
                  selectedAppearance === appearance.name
                    ? "hover-cards theme-category"
                    : "theme-bg-surface hover:theme-category"
                }`}
              onClick={() => setSelectedAppearance(appearance.name)}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1 theme-text-primary">
                  {appearance.name}
                </h4>
                <p className="text-xs theme-text-secondary leading-relaxed">
                  {appearance.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}

export default Appearance;
