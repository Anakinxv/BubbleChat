import React from "react";
import { CheckCheck } from "lucide-react";
import CurrentStep from "./CurrentStep";

function Resumen() {
  return (
    <div>
      <CurrentStep
        icon={<CheckCheck size={48} className="stroke-1 theme-text-purple" />}
        title="Listo para crear"
        description="Revisa los detalles de tu comunidad"
      />

      <div className="mt-6 p-6 rounded-2xl theme-bg-background  theme-category-border shadow-lg max-w-xl mx-auto">
        <h2 className="font-bold text-xl theme-text-primary mb-4">
          Resumen de la comunidad
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="theme-text-secondary font-medium">
              Nombre de la comunidad:
            </span>
            <span className="theme-text-primary font-semibold">
              Creative UI
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="theme-text-secondary font-medium">Categoría:</span>
            <span className="theme-text-primary font-semibold">Design</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="theme-text-secondary font-medium">URL:</span>
            <span className="theme-text-primary font-semibold">
              bubblechat.com/sdsd
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="theme-text-secondary font-medium">Tipo:</span>
            <span className="theme-text-primary font-semibold">Privada</span>
          </div>
          <div className="flex  justify-between">
            <span className="theme-text-secondary font-medium mb-1">
              Invitaciones:
            </span>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/40?img=1"
                alt="John Doe"
                className="w-8 h-8 rounded-full theme-border"
                style={{ borderWidth: 1.5, borderStyle: "solid" }}
              />
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="Jane Doe"
                className="w-8 h-8 rounded-full theme-border"
                style={{ borderWidth: 1.5, borderStyle: "solid" }}
              />
              {/* Agrega más avatares si tienes más invitados */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resumen;
