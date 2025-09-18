import { z } from "zod";

// Login

export const loginSchema = z.object({
  email: z.string().email("Correo Invalido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});
