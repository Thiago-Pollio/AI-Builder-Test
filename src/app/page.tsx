import { headers } from "next/headers";
import { CheckCircle2 } from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";

export default async function HomePage() {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-4 py-16">
        <p className="text-foreground/60 text-sm">Host: {host}</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <p className="text-foreground/70 max-w-xl">
          Stack listo para producción: Next.js 15 (App Router), TypeScript
          estricto, Tailwind CSS v4, ESLint + Prettier, y validación de entorno
          con Zod.
        </p>
        <ul className="grid gap-3 text-sm">
          {[
            "Server Components por defecto (sin use client en esta página)",
            "headers() asíncrono de Next.js 15",
            "Utilidad cn() con clsx + tailwind-merge",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div>
          <Button>Listo para desplegar</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
