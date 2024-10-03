import { z } from "zod";
export const userSchema = z.object({
    username:z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  })