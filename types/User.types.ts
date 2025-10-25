import { userSchema } from "@/schemas/User.schema";
import { z } from "zod";

export type User = z.infer<typeof userSchema>;
