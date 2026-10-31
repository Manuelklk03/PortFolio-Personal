# Estado actual y relevo

Última actualización: 31 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex (plugin `codex`).

## Resumen del estado real

La web tiene la estructura completa de una página: cabecera, inicio, sobre mí, proyectos (tarjetas desde `src/data/projects.ts`), tecnologías, contacto, pie y página 404, con SEO básico. En la fase de diseño ya se integraron shadcn/ui, Lenis, GSAP con ScrollTrigger, componentes de React Bits y un cursor personalizado. **Todo el contenido es de prueba** (proyectos, enlaces, tecnologías, dominio `manuelcasinos.dev`): hay que sustituirlo por los datos reales de `docs/PROYECTOS.md` antes de publicar.

Nueva dirección visual (31 oct): **ASCII art interactivo** con la paleta **Abyss + Jade** (ver `docs/DECISIONES.md`); todavía sin aplicar en el código.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Es la primera vez que Manuel usa Astro y Vite:** explica cada concepto nuevo antes de usarlo (componentes `.astro`, frontmatter `---`, islas y directivas `client:*`, rutas en `src/pages`, layouts, qué hace Vite) y entrega los archivos nuevos completos y comentados.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Codex colabora según la sección «Coordinación con Codex» de `CLAUDE.md`.
- grill-me es un cuestionario sobre el código: ofrécelo a Manuel después de cada paso con código, para practicar.
- Pasos grandes: agrupa cambios relacionados en un mismo paso (p. ej. tipografía + estructura de una sección completa), con el mensaje de commit y los comandos al final del paso. Se presenta el siguiente cuando Manuel lo pide.

## Git

- `main` al día hasta la PR de `fix/cleanup-and-docs`. Las PR #12 a #26 se hicieron sin actualizar la documentación; esta rama la pone al día.
- Sin protección de `main` en GitHub (decisión de Manuel); se sigue el flujo de ramas y PR. `git fetch --prune` limpia las ramas remotas borradas.

## Comprobaciones (31 oct)

- Ejecutadas por Claude: `npm run check` → 0 errores, 0 avisos; `npm run build` → 2 páginas; vista en Chrome (`astro preview`) sin errores en consola.

## Problemas conocidos

- `create-astro` no crea el proyecto en una carpeta con archivos: se creó en `../portfolio-base` y se copió (ver `docs/HERRAMIENTAS.md`).
- Si un `.astro` sale sin colores en VS Code, comprobar primero que el código del frontmatter está entre las dos líneas `---` (fuera de ellas es texto HTML). La extensión de Astro está instalada pero no aparece en `code --list-extensions`: probablemente está en otro perfil de VS Code.
- `npm run check` no detecta clases de Tailwind mal escritas (p. ej. `max-w-3x1`); la extensión Tailwind CSS IntelliSense las marca.

## Datos o decisiones pendientes de Manuel

- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).
- Correo público y CV.

## Próximo paso concreto (modo plan)

1. Preguntar a Manuel el efecto ASCII del inicio (fondo reactivo al ratón, nombre en ASCII que se descifra, marcos de terminal…) y el resto de decisiones de diseño, una a una.
2. Aplicar la paleta Abyss + Jade en `@theme` y el primer efecto ASCII, sustituyendo `OrbitingBalls` / `TextReveal` si Manuel lo aprueba.
3. Más adelante: sustituir los datos de prueba por los reales.
