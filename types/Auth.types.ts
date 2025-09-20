import {
  loginSchema,
  registerStepOneSchema,
  registerPasswordSchema,
} from "@/schemas/Auth.schema";
import { z } from "zod";
export type RegisterStepOneSchemaType = z.infer<typeof registerStepOneSchema>;
export type RegisterPasswordSchemaType = z.infer<typeof registerPasswordSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
