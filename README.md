# AI Builder Test

Starter de producción: **Next.js 15** (App Router), **TypeScript** estricto, **Tailwind CSS v4**, ESLint + Prettier, Lucide, `cn()` y validación de entorno con Zod.

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Scripts:

| Comando             | Qué hace                           |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Servidor de desarrollo (Turbopack) |
| `npm run build`     | Build de producción                |
| `npm run start`     | Sirve el build                     |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | TypeScript (`strict`)              |
| `npm run format`    | Prettier                           |

## Arquitectura `src/`

Los componentes en `app/` son **Server Components** por defecto. `'use client'` solo cuando hace falta estado, eventos del DOM o hooks de React.

En Next.js 15, `params`, `searchParams`, `cookies()` y `headers()` son asíncronos: usalos con `await`.

## GitHub (repo nuevo)

```bash
git add .
git commit -m "chore: bootstrap Next.js 15 production starter"

gh repo create ai-builder-test --private --source=. --remote=origin --push
```

Si preferís la web: creá el repo vacío en GitHub (sin README) y después:

```bash
git remote add origin https://github.com/<USER>/ai-builder-test.git
git branch -M main
git push -u origin main
```

## Vercel (CI en cada push a `main`)

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub.
2. **Add New… → Project** y seleccioná este repositorio.
3. Framework preset: **Next.js**. Root directory: `./`.
4. Cargá las variables de `.env.example` (públicas y privadas) en **Environment Variables**.
5. Deploy. Vercel construye cada push a `main` y crea previews por pull request.

CLI equivalente:

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local
vercel --prod
```

No commitees `.env`, `.env.local` ni secretos. Sí commiteá `.env.example`.
