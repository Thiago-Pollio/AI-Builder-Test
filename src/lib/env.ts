import { z } from "zod";

function emptyToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function resolvePublicAppUrl(): string | undefined {
  const configured = emptyToUndefined(process.env.NEXT_PUBLIC_APP_URL);
  if (configured) {
    return configured;
  }

  const vercelUrl = emptyToUndefined(process.env.VERCEL_URL);
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return undefined;
}

const clientSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("AI Builder"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
});

const serverSchema = clientSchema.extend({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(16).optional(),
});

export type ClientEnv = z.infer<typeof clientSchema>;
export type ServerEnv = z.infer<typeof serverSchema>;

function readRawEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_NAME: emptyToUndefined(process.env.NEXT_PUBLIC_APP_NAME),
    NEXT_PUBLIC_APP_URL: resolvePublicAppUrl(),
    DATABASE_URL: emptyToUndefined(process.env.DATABASE_URL),
    AUTH_SECRET: emptyToUndefined(process.env.AUTH_SECRET),
  };
}

function formatZodError(error: z.ZodError) {
  return error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
}

const parsed = serverSchema.safeParse(readRawEnv());

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${formatZodError(parsed.error)}`,
  );
}

export const env = parsed.data;
