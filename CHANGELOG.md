# Changelog

Este archivo recoge cambios relevantes completados. Las tareas futuras están en [docs/TAREAS.md](docs/TAREAS.md).

Sigue la organización de [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), con apartados como Añadido, Cambiado y Corregido cuando tengan contenido.

## Sin publicar

### Añadido

- 2026-10-24: documentación inicial del proyecto (`AGENTS.md`, `CLAUDE.md`, `docs/`), modo de trabajo, flujo de GitHub y criterios para elegir plugins de Claude Code.
- 2026-10-24: `.claude/settings.json` con los plugins del proyecto, inventario en `docs/HERRAMIENTAS.md` y `.gitignore`.
- 2026-10-25: base del proyecto con Astro 7, React 19, Tailwind 4 y TypeScript estricto; comprobación de tipos con `npm run check`.
- 2026-10-25: reglas de código adaptadas a Astro, coordinación Claude + Codex en `CLAUDE.md` y README corregido.
- 2026-10-27: layout base `src/layouts/Layout.astro` (`lang="es"`, título, descripción, favicon y estilos de Tailwind) usado en la página de inicio.
- 2026-10-27: Prettier con `prettier-plugin-astro` para formatear los `.astro` en VS Code al guardar.
- 2026-10-27: paleta oscura como tema de Tailwind (`@theme`) y tipografía Geist / Geist Mono servida desde la propia web con la API de fuentes de Astro.
- 2026-10-28 a 2026-10-30: secciones con contenido de prueba, tarjetas de proyectos, SEO, página 404, shadcn/ui, Lenis, GSAP, componentes de React Bits y cursor personalizado (PR #12 a #26).
- 2026-10-31: inicio ASCII con un nudo 3D de Three.js dibujado con caracteres que sigue al ratón y el nombre en ASCII (figlet) que se descifra; paleta Abyss + Jade.
- 2026-10-31: rediseño «terminal elegante»: nombre con partículas ASCII interactivas, cursor en bloque, títulos con prompt, tarjetas tipo ventana de terminal, sección de currículum, contacto con correo, GitHub y LinkedIn, y colores más intensos.

### Corregido

- 2026-10-31: imágenes de proyectos (eran SVG con extensión `.jpg`) y paquetes sin uso eliminados.
