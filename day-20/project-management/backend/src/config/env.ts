import dotenv from "dotenv";
import z from "zod";

dotenv.config();

export const envSchema = z.object({
  NODE_ENV: z.enum(["development"]),
  PORT: z.coerce.number().int().positive().default(3000),
  JWT_SECERT: z.string().min(1),
  JWT_EXPIRES_IN: z.string().regex(/^(\d+(s|h|m|d))$/),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid enviroment variable: ${parsed.error.message}`);
}

export const env = parsed.data;
