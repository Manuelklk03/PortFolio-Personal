# Estado actual y relevo

Última actualización: 27 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex (plugin `codex`).

## Resumen del estado real

`main` tiene la documentación, la base **Astro + React + Tailwind + TypeScript estricto** (Astro sustituye a Next.js; motivo en `docs/DECISIONES.md`), el layout base `src/layouts/Layout.astro`, Prettier con el plugin de Astro, la paleta como tema de Tailwind (`@theme` en `src/styles/global.css`) y la tipografía Geist / Geist Mono con la API de fuentes de Astro. Paleta y tipografía son la base aceptada; se revisan en la fase de diseño. La página de inicio solo muestra una tarjeta temporal; todavía no hay secciones ni contenido.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Es la primera vez que Manuel usa Astro y Vite:** explica cada concepto nuevo antes de usarlo (componentes `.astro`, frontmatter `---`, islas y directivas `client:*`, rutas en `src/pages`, layouts, qué hace Vite) y entrega los archivos nuevos completos y comentados.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Codex colabora según la sección «Coordinación con Codex» de `CLAUDE.md`.
- grill-me es un cuestionario sobre el código: ofrécelo a Manuel después de cada paso con código, para practicar.
- Pasos grandes: agrupa cambios relacionados en un mismo paso (p. ej. tipografía + estructura de una sección completa), con el mensaje de commit y los comandos al final del paso. Se presenta el siguiente cuando Manuel lo pide.

## Git

- Todo mergeado en `main` (última entrega: tipografía, rama `feature/typography`). Las correcciones pequeñas las hace la IA con su commit, PR y merge (ver `AGENTS.md`).
- Sin protección de `main` en GitHub (decisión de Manuel); se sigue el flujo de ramas y PR.

## Comprobaciones (última entrega)

- Ejecutadas por Claude: `npm run check` → 0 errores; `npm run build` → 1 página, fuentes `.woff2` en `dist/_astro/fonts/` y `preload` de Geist en `index.html`; `npx prettier --check src` sin avisos.

## Problemas conocidos

- `create-astro` no crea el proyecto en una carpeta con archivos: se creó en `../portfolio-base` y se copió (ver `docs/HERRAMIENTAS.md`).
- Si un `.astro` sale sin colores en VS Code, comprobar primero que el código del frontmatter está entre las dos líneas `---` (fuera de ellas es texto HTML). La extensión de Astro está instalada pero no aparece en `code --list-extensions`: probablemente está en otro perfil de VS Code.
- `npm run check` no detecta clases de Tailwind mal escritas (p. ej. `max-w-3x1`); la extensión Tailwind CSS IntelliSense las marca.

## Datos o decisiones pendientes de Manuel

- Estructura: una página con secciones (propuesta).
- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).
- Correo público y CV.

## Próximo paso concreto (modo plan)

1. Estructura de la página: componentes `Header` y `Footer` en `src/components`, secciones con sus anclas en `index.astro`, navegación accesible y enlace «Saltar al contenido».
