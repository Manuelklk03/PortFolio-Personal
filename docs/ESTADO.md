# Estado actual y relevo

Última actualización: 3 de noviembre de 2026.
Última sesión: Antigravity (Google DeepMind) con revisión y comprobaciones locales.

## Resumen del estado real

La web tiene la estructura completa de una página con diseño ASCII art y terminal elegante: cabecera con navegación, nudo 3D ASCII, partículas del nombre interactivas, sobre mí con retrato ASCII + mosaico enfocado, proyectos reales desplegables (`<details name="projects">`), stack técnico, terminal interactiva ejecutable con comandos, visor de CV en PDF integrado y contacto.

**Nueva funcionalidad (3 nov):**
- **Morfeo en estarcido** (imagen generada por Codex para Manuel, `public/intro/morpheus.webp`, con el negro convertido en transparencia) sobre una lluvia de código de Matrix, con dos **píldoras en cápsula CSS** en las palmas: caen con rebote al abrir, flotan y laten, la que se apunta crece y la otra se atenúa, y al elegir su color inunda la pantalla antes de cambiar el tema.
- **Sin tema hasta elegir:** la web arranca en modo neutro (grises, `data-theme="neutral"`); omitir o Esc aplica la píldora azul.
- **Tema Matrix Phosphor (Píldora Roja):** activa la realidad verde fósforo de terminal (`#00FF66`, fondos `#030804`, bordes `#133a18`, brillo y luz radial verde).
- **Tema Abyss + Jade (Píldora Azul):** mantiene el tema base azul abismo y jade cian.
- **Persistencia y reactividad:** elección guardada en `localStorage`, script inline temprano en `<head>` para evitar parpadeos (FOUC), eventos reactivos para sincronizar las partículas del nombre en vivo, enlace `./pill` en la cabecera y comandos `pill`, `matrix` y `theme` en la terminal.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación).
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Flujo de GitHub: ramas de feature, Conventional Commits y PR.

## Git

- `main` al día hasta la PR de `feature/contact-and-field` (4 nov).

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

1. Decidir dominio y alojamiento; después, pasada de SEO con claude-seo (ver `docs/HERRAMIENTAS.md`).
2. ESLint + `npm run lint` y análisis con SonarQube (ver `docs/TAREAS.md`).
3. Capturas de Digital Fit y ValveDex cuando Manuel las tenga (`public/projects/` + campo `image`).
