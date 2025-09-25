import { z } from "zod";

// Login

export const loginSchema = z.object({
  email: z.string().email("Correo Invalido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const registerStepOneSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Correo Invalido"),
});

export const registerPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "La csx ontraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
      ),
    confirmPassword: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d+$/, "El código debe contener solo números"),
});
