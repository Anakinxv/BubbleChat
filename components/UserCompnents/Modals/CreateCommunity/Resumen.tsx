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
    </div>
  );
}

export default Resumen;
