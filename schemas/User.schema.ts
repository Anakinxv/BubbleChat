import { z } from "zod";

// User Schema
export const userSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  usuario: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Correo inválido"),
  bio: z
    .string()
    .max(160, "La biografía no puede exceder los 160 caracteres")
    .optional(),
  fotoPerfil: z.string().url("URL de foto de perfil inválida").optional(),
});
