import {
  loginSchema,
  registerStepOneSchema,
  registerPasswordSchema,
  otpSchema,
} from "@/schemas/Auth.schema";
import { z } from "zod";
export type RegisterStepOneSchemaType = z.infer<typeof registerStepOneSchema>;
export type RegisterPasswordSchemaType = z.infer<typeof registerPasswordSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type OtpSchemaType = z.infer<typeof otpSchema>;
