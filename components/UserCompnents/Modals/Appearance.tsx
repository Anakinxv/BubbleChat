"use client";

import React from "react";
import BaseModal from "./BaseModal";
import { useState } from "react";

type AppearanceProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

function Appearance({ title, isOpen, onClose }: AppearanceProps) {
  const [selectedAppearance, setSelectedAppearance] = useState<number | null>(
    null
  );

  const differentAppearance = [
    {
      id: 1,
      name: "Clásica",
      description: "Navegación tradicional con menú horizontal",
    },
    {
      id: 2,
      name: "Moderna",
      description: "Diseño limpio y contemporáneo",
    },
    {
      id: 3,
      name: "Glass Inferior",
      description: "Barra de navegación inferior con efecto glass",
    },
    {
      id: 4,
      name: "Detallada",
      description: "Navegación con iconos y texto descriptivo",
    },
    {
      id: 5,
      name: "Interesante",
      description: "Estilo único y llamativo",
    },
    {
      id: 6,
      name: "Dock",
      description: "Estilo dock como macOS",
    },
    {
      id: 7,
      name: "Bonita",
      description: "Diseño elegante y atractivo",
    },
    {
      id: 8,
      name: "Minimalista",
      description: "Simple y funcional",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {differentAppearance.map((appearance) => (
            <div
              key={appearance.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 theme-border border ${
                selectedAppearance === appearance.id
                  ? "hover-cards theme-category"
                  : "theme-bg-surface hover:theme-category"
              }`}
              onClick={() => setSelectedAppearance(appearance.id)}
            >
              <h4 className="font-semibold text-sm mb-1 theme-text-primary">
                {appearance.name}
              </h4>
              <p className="text-xs theme-text-secondary leading-relaxed">
                {appearance.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}

export default Appearance;
