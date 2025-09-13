import React, { useState } from "react";
import AppInputs from "@/components/CommonComponents/AppInputs";
import Primarybutton from "@/components/CommonComponents/Primarybutton";

function Privacidad() {
  const [form, setForm] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí va la lógica para guardar cambios
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Seguridad</h3>
        <p className="text-theme-textSecondary mb-4">
          Actualiza tu contraseña y configura opciones de seguridad
        </p>
      </div>
      <AppInputs
        label="Contraseña actual"
        type="password"
        placeholder="Contraseña actual"
        value={form.actual}
        onChange={(e) => handleChange("actual", e.target.value)}
      />
      <AppInputs
        label="Nueva contraseña"
        type="password"
        placeholder="Nueva contraseña"
        value={form.nueva}
        onChange={(e) => handleChange("nueva", e.target.value)}
      />
      <AppInputs
        label="Confirmar contraseña"
        type="password"
        placeholder="Confirmar contraseña"
        value={form.confirmar}
        onChange={(e) => handleChange("confirmar", e.target.value)}
      />
      <Primarybutton>Guardar Cambios</Primarybutton>
    </form>
  );
}

export default Privacidad;
