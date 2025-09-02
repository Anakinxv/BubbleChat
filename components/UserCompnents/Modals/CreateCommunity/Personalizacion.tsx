"use client";
import React, { useState, useRef } from "react";
import CurrentStep from "./CurrentStep";
import { ImageUp, FolderUp, X } from "lucide-react";
import BubbleSelects from "@/components/CommonComponents/BubbleSelects";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Personalizacion() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Por favor selecciona una imagen JPG o PNG");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <CurrentStep
        icon={<ImageUp size={48} className="stroke-1 theme-text-purple" />}
        title="Personalización"
        description="Personaliza tu comunidad con una imagen y categoría."
      />

      <div className="mt-6">
        <div
          className={`mb-4 h-44 w-full rounded-4xl bg-[var(--theme-surface)] border-2 ${
            error
              ? "border-red-500"
              : imagePreview
              ? "border-[var(--theme-primary)]"
              : "border-dashed border-[var(--theme-border)]"
          } min-h-[60px] text-[var(--theme-text)] p-4 flex items-center justify-center relative cursor-pointer transition-all hover:opacity-90`}
          onClick={!imagePreview ? triggerFileInput : undefined}
        >
          {!imagePreview ? (
            <div className="flex flex-col items-center gap-2 text-[var(--theme-textSecondary)]">
              <div className="p-3 rounded-full bg-[var(--theme-background)]">
                <FolderUp size={32} className={error ? "text-red-500" : ""} />
              </div>
              <div className="text-center">
                <p className="font-medium">Sube una imagen</p>
                <p className="text-xs opacity-70">
                  Haz clic o arrastra un archivo aquí
                </p>
                <p className="text-xs opacity-70">Formato: JPG, PNG</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-contain rounded-3xl"
              />
              <Button
                className="absolute top-2 right-2 p-1 h-8 w-8 rounded-full bg-black/70 hover:bg-black/90"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X size={16} className="text-white" />
              </Button>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
  );
}

export default Personalizacion;
