"use client";
import React, { useState } from "react";
import BaseModal from "./BaseModal";

type SugerenciasProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Sugerencias({ isOpen, onClose }: SugerenciasProps) {
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la sugerencia
    alert("¡Gracias por tu sugerencia o reporte!");
    setMensaje("");
    onClose();
  };

  return (
    <BaseModal
      title="Enviar sugerencia o reportar error"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="theme-text-secondary text-base">
          Si ha encontrado algún error o tiene sugerencias para mejorar la
          aplicación, le agradecemos que nos lo comunique.
        </p>
        <textarea
          className="theme-bg-surface border-2 theme-border rounded-xl p-3 min-h-[80px] resize-none"
          placeholder="Escribe aquí tu sugerencia o reporte de error"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[var(--theme-primary)] text-white rounded-2xl py-2 px-6 font-semibold hover:opacity-80 transition"
        >
          Enviar
        </button>
      </form>
    </BaseModal>
  );
}

export default Sugerencias;
