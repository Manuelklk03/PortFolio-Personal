# Estado actual y relevo

Última actualización: 27 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex (plugin `codex`).

## Resumen del estado real

`main` tiene la documentación (PR #1) y la base **Astro + React + Tailwind + TypeScript estricto** (PR #2). Astro sustituye a Next.js: Manuel quería estrenar algo nuevo sin dejar React (motivo en `docs/DECISIONES.md`). También en `main`: layout base (PR #3), Prettier con el plugin de Astro y la paleta como tema de Tailwind con `@theme` en `src/styles/global.css` (fondo y texto base en el layout). La página de inicio muestra una tarjeta temporal con los seis colores. Todavía no hay secciones ni contenido. Paleta aplicada, pendiente de que Manuel la apruebe; tipografía sin aplicar.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Es la primera vez que Manuel usa Astro y Vite:** explica cada concepto nuevo antes de usarlo (componentes `.astro`, frontmatter `---`, islas y directivas `client:*`, rutas en `src/pages`, layouts, qué hace Vite) y entrega los archivos nuevos completos y comentados.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Codex colabora según la sección «Coordinación con Codex» de `CLAUDE.md`.
- grill-me es un cuestionario sobre el código: ofrécelo a Manuel después de cada paso con código, para practicar.

## Git

- Todo mergeado en `main` hasta la PR de `fix/prettier-eol`. Las correcciones pequeñas las hace la IA con su commit, PR y merge (ver `AGENTS.md`).
- Sin protección de `main` en GitHub (decisión de Manuel); se sigue el flujo de ramas y PR.

## Cambios de esta sesión (rama `feature/base-layout`)

- Escritos por Manuel: `src/layouts/Layout.astro` (frontmatter con `import` de `global.css` e `interface Props` con `title` y `description`; `<html lang="es">`, metas, favicon y `<slot />`) y `src/pages/index.astro` (usa `<Layout>` con un `<h1>` de prueba con `text-cyan-400`).
- Documentación: `TAREAS.md`, `HERRAMIENTAS.md`, `CHANGELOG.md` y este archivo.

## Comprobaciones

- Ejecutadas por Claude: `npm run check` → 0 errores, 0 avisos, 0 hints (4 archivos); `npm run build` → 1 página; `dist/index.html` contiene `lang="es"`, la meta `description` y el título; el CSS generado incluye `.text-cyan-400`.
- Manuel confirmó que la página se ve bien en el navegador.

## Problemas conocidos

- `create-astro` no crea el proyecto en una carpeta con archivos: se creó en `../portfolio-base` y se copió (ver `docs/HERRAMIENTAS.md`).
- Si un `.astro` sale sin colores en VS Code, comprobar primero que el código del frontmatter está entre las dos líneas `---` (fuera de ellas es texto HTML). La extensión de Astro está instalada pero no aparece en `code --list-extensions`: probablemente está en otro perfil de VS Code.

## Datos o decisiones pendientes de Manuel

- Estructura: una página con secciones (propuesta).
- Aprobar o ajustar paleta y tipografía al verlas aplicadas.
- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).
- Correo público y CV.

## Próximo paso concreto (modo plan)

1. Manuel aprueba o ajusta la paleta vista en la tarjeta de muestra.
2. Tipografía: consultar cómo carga Astro las fuentes (Geist y Geist Mono) y aplicarlas en el tema.
