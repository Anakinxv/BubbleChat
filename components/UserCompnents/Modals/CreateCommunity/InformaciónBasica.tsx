import React from "react";
import CurrentStep from "./CurrentStep";
import { Users } from "lucide-react";
import AppInputs from "@/components/CommonComponents/AppInputs";
function InformaciónBasica() {
  return (
    <div>
      <CurrentStep
        icon={<Users size={48} className="stroke-1 theme-text-purple  " />}
        title="Información Básica"
        description="Proporcione información básica sobre la comunidad."
      />

      <div className="mt-6">
        <AppInputs
          label="Nombre de la comunidad"
          placeholder="Ingrese el nombre"
          className="h-[45px]"
          type="text"
        />
        <AppInputs
          label="Descripción"
          placeholder="Ingrese una descripción"
          type="textarea"
          className="min-h-[120px] resize-none align-top"
        />
      </div>
    </div>
  );
}

export default InformaciónBasica;
