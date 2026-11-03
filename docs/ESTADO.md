# Estado actual y relevo

Última actualización: 3 de noviembre de 2026.
Última sesión: Antigravity (Google DeepMind) con revisión y comprobaciones locales.

## Resumen del estado real

La web tiene la estructura completa de una página con diseño ASCII art y terminal elegante: cabecera con navegación, nudo 3D ASCII, partículas del nombre interactivas, sobre mí con retrato ASCII + mosaico enfocado, proyectos reales desplegables (`<details name="projects">`), stack técnico, terminal interactiva ejecutable con comandos, visor de CV en PDF integrado y contacto.

**Nueva funcionalidad (3 nov):**
- **Morfeo de Matrix en arte ASCII** con las dos manos extendidas ofreciendo la **Píldora Roja** (`🔴`) o la **Píldora Azul** (`🔵`) en un modal accesible (`<dialog>`).
- **Tema Matrix Phosphor (Píldora Roja):** activa la realidad verde fósforo de terminal (`#00FF66`, fondos `#030804`, bordes `#133a18`, brillo y luz radial verde).
- **Tema Abyss + Jade (Píldora Azul):** mantiene el tema base azul abismo y jade cian.
- **Persistencia y reactividad:** elección guardada en `localStorage`, script inline temprano en `<head>` para evitar parpadeos (FOUC), eventos reactivos para sincronizar las partículas del nombre en vivo, enlace `./pill` en la cabecera y comandos `pill`, `matrix` y `theme` en la terminal.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación).
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Flujo de GitHub: ramas de feature, Conventional Commits y PR.

## Git

- Rama actual: `feature/matrix-pill-intro`.
- Lista para commit, push, PR y merge a `main`.

## Comprobaciones (3 nov)

- `npm run check` (diagnóstico Astro y TypeScript) → 0 errores, 0 warnings, 0 hints.
- `npm run build` → 2 páginas estáticas (`/index.html` y `/404.html`) compiladas limpiamente en 3.57s.
- Accesibilidad: `<dialog>` nativo, atajos de teclado (`R` roja, `A`/`B` azul, `Esc` salir), botón omitir, foco atrapado y bloqueo de scroll de fondo mientras el diálogo está abierto.

## Problemas conocidos

- No editar archivos con `Set-Content` de PowerShell 5.1: añade BOM y puede romper el frontmatter de Astro.
- En Windows PowerShell, invocar `npm.cmd` en lugar del alias `.ps1` si las execution policies del sistema bloquean scripts locales.

## Datos o decisiones pendientes de Manuel

- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).

## Próximo paso concreto

1. Hacer commit de la rama `feature/matrix-pill-intro`, subirla, abrir PR y fusionar a `main`.
2. Probar en el navegador el efecto en vivo abriendo `npm run dev`.
3. Decidir dominio y alojamiento; después, pasada de SEO con claude-seo (ver `docs/HERRAMIENTAS.md`).
4. ESLint + `npm run lint` y análisis con SonarQube (ver `docs/TAREAS.md`).
5. Capturas de Digital Fit y ValveDex cuando Manuel las tenga (`public/projects/` + campo `image`).
