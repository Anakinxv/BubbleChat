import { loginSchema } from "@/schemas/Auth.schema";
import { z } from "zod";

export type LoginSchemaType = z.infer<typeof loginSchema>;
