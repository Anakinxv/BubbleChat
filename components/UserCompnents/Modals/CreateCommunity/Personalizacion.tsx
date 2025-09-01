import React from "react";
import CurrentStep from "./CurrentStep";
import { ImageUp } from "lucide-react";
import BubbleSelects from "@/components/CommonComponents/BubbleSelects";
import FileUpload from "@/components/kokonutui/file-upload"; // Importa el componente

function Personalizacion() {
  return (
    <div>
      <CurrentStep
        icon={<ImageUp size={48} className="stroke-1 theme-text-purple  " />}
        title="Personalización"
        description="Personaliza tu comunidad con una imagen y categoría."
      />

      <div className="mt-6">
        <div>
          {/* Componente de subida de archivos */}
          <FileUpload />
        </div>

        <div>
          <BubbleSelects
            options={[
              { label: "Anime", value: "anime" },
              { label: "Programación", value: "programacion" },
              { label: "Series", value: "series" },
              { label: "Videojuegos", value: "videojuegos" },
              { label: "Ciencia de Datos / IA", value: "data-science" },
            ]}
            label="Categoría"
          />
        </div>
      </div>
    </div>
  );
}

export default Personalizacion;
