"use client";

import React, { useState } from "react";

import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";

// Importar los componentes de cada fase
import InformaciónBasica from "./CreateCommunity/InformaciónBasica";
import Configuración from "./CreateCommunity/Configuración";
import Personalizacion from "./CreateCommunity/Personalizacion";
import InvitarMiembros from "./CreateCommunity/InvitarMiembros";
import Resumen from "./CreateCommunity/Resumen";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

// Componente Progress personalizado
const Progress = ({ value }: { value: number }) => {
  return (
    <div className="w-full theme-progress rounded-full h-2.5">
      <div
        className="h-2 theme-bg-primary rounded-full transition-all duration-300 ease-out"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const STEPS = [
  { id: 1, name: "Información Básica", component: InformaciónBasica },
  { id: 2, name: "Personalización", component: Personalizacion },
  { id: 3, name: "Configuración", component: Configuración },
  { id: 4, name: "Invitar Miembros", component: InvitarMiembros },
  { id: 5, name: "Resumen", component: Resumen },
];

type CreateCommunityProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateCommunity({ isOpen, onClose }: CreateCommunityProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const getCurrentComponent = () => {
    const step = STEPS.find((step) => step.id === currentStep);
    const Component = step?.component;
    return Component ? <Component /> : null;
  };

  const getProgressValue = () => {
    return (currentStep / STEPS.length) * 100;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1); // Resetear al primer paso cuando se cierre
    onClose();
  };

  const handleFinalSubmit = () => {
    // Aquí va la lógica para crear la comunidad
    console.log("Comunidad creada!");
    handleClose();
  };

  return (
    <BaseModal title={`Crear Comunidad`} isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-6">
        {/* Indicador de progreso */}
        <div className="w-full">
          <Progress value={getProgressValue()} />
        </div>

        {/* Contenido de la fase actual */}
        <div className="min-h-[300px]">{getCurrentComponent()}</div>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="theme-bg-background theme-text-primary rounded-4xl hover:opacity-50 transition duration-300 ease-in-out flex items-center gap-2"
          >
            <ArrowLeft />
            Anterior
          </Button>

          <Button
            onClick={
              currentStep === STEPS.length ? handleFinalSubmit : handleNext
            }
            disabled={false}
            className="bg-[var(--theme-primary)] text-white rounded-4xl hover:opacity-50 transition duration-300 ease-in-out flex items-center gap-2"
          >
            {currentStep === STEPS.length ? "Crear Comunidad" : "Siguiente"}
            {currentStep === STEPS.length ? <Plus /> : <ArrowRight />}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}

export default CreateCommunity;
