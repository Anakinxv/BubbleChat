"use client";

import React, { useState } from "react";
import CommunityConfig from "@/components/CommonComponents/CommunityConfig";
import CurrentStep from "./CurrentStep";
import { Globe, GlobeLock } from "lucide-react";

function Configuración() {
  const [selected, setSelected] = useState("public");

  return (
    <div>
      <CurrentStep
        icon={<Globe size={48} className="stroke-1 theme-text-purple  " />}
        title="Información Básica"
        description="Proporcione información básica sobre la comunidad."
      />
      <div className="flex flex-col gap-6 mt-6">
        <CommunityConfig
          options={[
            {
              value: "public",
              icon: <Globe size={24} className="stroke-1 theme-text-purple" />,
              title: "Público",
              description: "Cualquiera puede unirse a esta comunidad.",
            },
            {
              value: "private",
              icon: (
                <GlobeLock size={24} className="stroke-1 theme-text-purple" />
              ),
              title: "Privado",
              description: "Solo los invitados pueden unirse a esta comunidad.",
            },
          ]}
          selected={selected}
          onChange={(value) => setSelected(value)}
        />
      </div>
    </div>
  );
}

export default Configuración;
