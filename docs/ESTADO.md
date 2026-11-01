# Estado actual y relevo

Última actualización: 31 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex (plugin `codex`).

## Resumen del estado real

La web tiene la estructura completa de una página: cabecera, inicio, sobre mí, proyectos (tarjetas desde `src/data/projects.ts`), tecnologías, contacto, pie y página 404, con SEO básico. En la fase de diseño ya se integraron shadcn/ui, Lenis, GSAP con ScrollTrigger, componentes de React Bits y un cursor personalizado. **Todo el contenido es de prueba** (proyectos, enlaces, tecnologías, dominio `manuelcasinos.dev`): hay que sustituirlo por los datos reales de `docs/PROYECTOS.md` antes de publicar.

Nueva dirección visual (31 oct): **ASCII art interactivo** con la paleta **Abyss + Jade** (ver `docs/DECISIONES.md`). Aplicado: paleta e inicio (nudo 3D en ASCII con Three.js + nombre ASCII con figlet que se descifra). Después, rediseño «terminal elegante»: nombre con partículas que se apartan del ratón, cursor en bloque (`src/components/Cursor.astro`), títulos con prompt, tarjetas tipo ventana, sección de currículum (falta el PDF) y contacto con correo, GitHub y LinkedIn (`src/data/profile.ts`). Ya no hay islas de React en uso, ni GSAP (entradas con `src/scripts/reveal.ts`).

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Es la primera vez que Manuel usa Astro y Vite:** explica cada concepto nuevo antes de usarlo (componentes `.astro`, frontmatter `---`, islas y directivas `client:*`, rutas en `src/pages`, layouts, qué hace Vite) y entrega los archivos nuevos completos y comentados.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Codex colabora según la sección «Coordinación con Codex» de `CLAUDE.md`.
- grill-me es un cuestionario sobre el código: ofrécelo a Manuel después de cada paso con código, para practicar.
- Pasos grandes: agrupa cambios relacionados en un mismo paso (p. ej. tipografía + estructura de una sección completa), con el mensaje de commit y los comandos al final del paso. Se presenta el siguiente cuando Manuel lo pide.

- **Desde el 31 oct:** los scripts, efectos, animaciones, configuración y limpiezas los implementa la IA directamente (verifica, revisión de Codex, commit, PR y merge) y solo informa en pocas líneas. Manuel ya entiende la estructura de componentes de Astro; el aprendizaje paso a paso queda para otro proyecto. Las decisiones de diseño se le siguen preguntando una a una.

## Git

- `main` al día hasta la PR de `feature/cv-and-stack` (1 nov).
- Sin protección de `main` en GitHub (decisión de Manuel); se sigue el flujo de ramas y PR. `git fetch --prune` limpia las ramas remotas borradas.

## Comprobaciones (31 oct, revisión de UI)

- Revisión con el agente ui-reviewer (antislop + criterios de impeccable): contraste AA correcto con la paleta, foco, semántica y movimiento reducido bien; arreglados los fallos rápidos.
- Ejecutadas por Claude: `npm run check` → 0 errores; `npm run build` → 2 páginas, sin imports `@/` sin empaquetar; Chrome: Lenis activo, las secciones entran y siguen visibles al volver arriba, consola sin errores; móvil 390 px: cabecera estática, enlaces de 44 px, sin scroll horizontal.

## Problemas conocidos

- No editar archivos con `Set-Content` de PowerShell 5.1: añade BOM y puede romper el frontmatter de Astro.

- `create-astro` no crea el proyecto en una carpeta con archivos: se creó en `../portfolio-base` y se copió (ver `docs/HERRAMIENTAS.md`).
- Si un `.astro` sale sin colores en VS Code, comprobar primero que el código del frontmatter está entre las dos líneas `---` (fuera de ellas es texto HTML). La extensión de Astro está instalada pero no aparece en `code --list-extensions`: probablemente está en otro perfil de VS Code.
- `npm run check` no detecta clases de Tailwind mal escritas (p. ej. `max-w-3x1`); la extensión Tailwind CSS IntelliSense las marca.

## Datos o decisiones pendientes de Manuel

- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).

## Próximo paso concreto

1. Sustituir los proyectos de prueba de `src/data/projects.ts` por los reales de `docs/PROYECTOS.md` (Stack y «Sobre mí» ya usan datos del CV).
2. Para actualizar el CV: sustituir `public/cv/manuel-casinos-perez.pdf` (mismo nombre).
3. Más adelante: ESLint + `npm run lint` y análisis con SonarQube (ver `docs/TAREAS.md`).
