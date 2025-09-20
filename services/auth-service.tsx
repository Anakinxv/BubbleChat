import axios from "axios";
import { z } from "zod";
import {
  registerStepOneSchema,
  registerPasswordSchema,
} from "@/schemas/Auth.schema";

const API_URL = "http://localhost:3000/api/register";

// Unir ambos schemas en uno solo para el registro completo
export const registerSchema = registerStepOneSchema.merge(
  registerPasswordSchema
);

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const registerService = async (data: RegisterSchemaType) => {
  const safeParse = registerSchema.safeParse(data);
  if (!safeParse.success) {
    throw new Error(safeParse.error.message);
  }

  try {
    const { name, lastName, email, password } = safeParse.data;
    console.log("Sending to API:", { name, lastName, email, password: "***" });

    const response = await axios.post(API_URL, {
      name,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error registering user:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    throw error;
  }
};
