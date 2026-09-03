import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { env } from "@/lib/env";
import { routes } from "@/constants/routes";

export function Navbar() {
  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href={routes.home}
          className="text-sm font-semibold tracking-tight"
        >
          {env.NEXT_PUBLIC_APP_NAME}
        </Link>
        <a
          href="https://vercel.com/docs"
          className="text-foreground/70 hover:text-foreground inline-flex items-center gap-1 text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Docs
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </nav>
    </header>
  );
}
