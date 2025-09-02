import React, { useState, useRef } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AppInputs from "@/components/CommonComponents/AppInputs";
import Primarybutton from "@/components/CommonComponents/Primarybutton";

function Informacion() {
  // Simula la imagen guardada, reemplaza esto por la prop real si la tienes
  const imagenGuardada =
    "https://i.pinimg.com/736x/a6/41/a1/a641a16d95dc82cc702cc9e8f8bfd958.jpg";
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    email: "",
    bio: "",
    foto: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setChanged(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, foto: file }));
    setChanged(true);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-40 h-40">
          <AvatarImage
            src={
              preview
                ? preview
                : imagenGuardada ||
                  "https://i.pinimg.com/736x/a6/41/a1/a641a16d95dc82cc702cc9e8f8bfd958.jpg"
            }
            alt="Avatar"
          />
        </Avatar>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="theme-bg-primary rounded-2xl  text-white px-4 py-2 rounded font-medium hover:opacity-90"
            onClick={() => fileInputRef.current?.click()}
          >
            Cambiar foto
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <p className="text-xs text-theme-textSecondary">
            JPG, PNG o GIF. Máximo 5MB.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <AppInputs
          label="Nombre y apellido"
          placeholder="Nombre y apellido"
          value={form.nombre}
          onChange={(e) => handleInputChange("nombre", e.target.value)}
        />
        <AppInputs
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          value={form.usuario}
          onChange={(e) => handleInputChange("usuario", e.target.value)}
        />
        <AppInputs
          label="Email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <div>
          <label className="font-medium text-theme-text mb-1 block">
            Biografía
          </label>
          <textarea
            className="w-full rounded-3xl border theme-border p-2 resize-none"
            rows={3}
            placeholder="Escribe tu biografía..."
            value={form.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
          />
        </div>
        {changed && (
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[52px] sm:h-[60px] rounded-4xl font-semibold cursor-pointer">
            Guardar
          </Primarybutton>
        )}
      </div>
    </div>
  );
}

export default Informacion;
