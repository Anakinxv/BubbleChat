import { loginSchema, registerSchema } from "@/schemas/Auth.schema";
import { z } from "zod";
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
