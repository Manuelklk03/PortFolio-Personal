# Estado actual y relevo

Última actualización: 25 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex (plugin `codex`).

## Resumen del estado real

El repositorio tiene la documentación en `main` (PR #1) y, en la rama `chore/project-setup`, la base del proyecto con **Astro + React + Tailwind + TypeScript estricto**. Astro sustituye a Next.js: Manuel quería estrenar algo nuevo sin dejar React (motivo en `docs/DECISIONES.md`). La página actual es la de la plantilla `minimal` (solo «Astro»); todavía no hay layout, secciones ni contenido. Paleta y tipografía siguen propuestas.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Es la primera vez que Manuel usa Astro y Vite:** explica cada concepto nuevo antes de usarlo (componentes `.astro`, frontmatter `---`, islas y directivas `client:*`, rutas en `src/pages`, layouts, qué hace Vite) y entrega los archivos nuevos completos y comentados.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Codex colabora según la sección «Coordinación con Codex» de `CLAUDE.md`.
- grill-me es un cuestionario sobre el código: ofrécelo a Manuel después de cada paso con código, para practicar.

## Git

- `chore/project-setup` mergeada en `main` (PR #2). Commit, PR y merge hechos por Claude por petición expresa de Manuel.
- Sin protección de `main` en GitHub (decisión de Manuel); se sigue el flujo de ramas y PR.

## Cambios de esta sesión (rama `chore/project-setup`)

- Base creada por Manuel: `astro.config.mjs`, `tsconfig.json`, `package.json`, `package-lock.json`, `src/pages/index.astro`, `src/styles/global.css`, `public/`, `.vscode/` (recomienda la extensión de Astro) y `.gitignore` combinado.
- Documentación: reglas de código de `AGENTS.md` adaptadas a Astro; `CLAUDE.md` con la coordinación Claude + Codex; `DECISIONES.md`, `CONTEXTO.md`, `TAREAS.md`, `HERRAMIENTAS.md` (versiones reales, grill-me corregido, Claudex), `CHANGELOG.md`, `LEEME.md` y `README.md` corregido.

## Comprobaciones

- Ejecutadas por Claude: `npm run check` → 0 errores, 0 avisos; `npm run build` → `/index.html` generado; `npm run dev` → HTTP 200 en http://localhost:4321; `node_modules/`, `dist/` y `.astro/` ignorados.
- `package.json`: `name` = `portfolio` y script `check` añadidos. `.gitignore`: `.env.*` ignorado salvo `.env.example` (aviso de Codex).

## Problemas conocidos

- `create-astro` no crea el proyecto en una carpeta con archivos: se creó en `../portfolio-base` y se copió (ver `docs/HERRAMIENTAS.md`).
- `src/pages/index.astro` tiene `lang="en"` y título «Astro»: se corrige al crear el layout.

## Datos o decisiones pendientes de Manuel

- Estructura: una página con secciones (propuesta).
- Aprobar o ajustar paleta y tipografía al verlas aplicadas.
- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).
- Correo público y CV.

## Próximo paso concreto (modo plan)

1. Nueva rama `feature/base-layout`: explicar layouts de Astro y crear `src/layouts/Layout.astro` (`lang="es"`, título y descripción, importación de `global.css`), y usarlo en `index.astro`. Comprobar que Tailwind aplica estilos.
