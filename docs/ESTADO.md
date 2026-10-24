# Estado actual y relevo

Última actualización: 24 de octubre de 2026.
Última sesión: Claude Code, con revisión de Codex en paralelo.

## Resumen del estado real

Repositorio de GitHub clonado. `main` tiene el README creado desde GitHub y, tras la PR `docs/initial-docs`, la documentación del proyecto. Todavía no hay código, `package.json` ni base Next.js. Están acordados el stack (Next.js + React + TypeScript + Tailwind), la dirección visual oscura y técnica, el modo de trabajo (plan / auto), el flujo de GitHub de ValveDex, los plugins de Claude Code (`.claude/settings.json`) y las librerías para la fase de diseño (shadcn/ui, React Bits, GSAP, Lenis). Paleta y tipografía siguen propuestas.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación); Manuel escribe el código guiado y confirma antes de avanzar.
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash** (confirmado por Manuel).
- Codex trabaja en paralelo mediante el plugin `codex`: revisiones de solo lectura de documentación, planes y diffs.

## Git

- Rama de esta sesión: `docs/initial-docs` → PR a `main` (Manuel autorizó a Claude a hacer commit, PR y merge de esta entrega).
- `main` ya tenía tres commits hechos desde GitHub, así que la documentación entra por rama y PR; no hay excepción al GitHub Flow.
- Protección de `main` y configuración de Git: pendientes (ver `docs/TAREAS.md`).

## Cambios de esta sesión

- `.claude/settings.json` (nuevo): plugins activos y desactivados del proyecto.
- `.gitignore` (nuevo): ignora `.claude/settings.local.json`. Al crear la base, combinarlo con el de `create-next-app`.
- `docs/HERRAMIENTAS.md`: inventario de plugins y skills con fase y estado.
- `docs/ESTADO.md`, `docs/TAREAS.md`, `docs/DECISIONES.md`, `docs/CONTEXTO.md`, `LEEME.md`, `AGENTS.md`, `CHANGELOG.md`: estado real de Git y correcciones de la revisión de Codex.

## Comprobaciones

- Ejecutadas: `git status`, `git log`, `git branch -a`; Node v24.14.0, npm 11.21.0, `gh` 2.96.0 autenticado como `Manuelklk03`; codex-cli 0.164.0 con sesión de ChatGPT (`/codex:setup`).
- Pendientes: protección de `main` en GitHub (no consultada), creación de la base, `npm run dev`, `npm run lint`, `npm run build`.

## Problemas conocidos

- `create-next-app` puede negarse a crear el proyecto en una carpeta con archivos. Solución prevista: crearlo en una carpeta temporal y mover su contenido al repositorio, sin tocar `.git` ni la documentación, y combinar `.gitignore`.
- `README.md` tiene restos pegados de un chat, formato Markdown roto, enlaces sin URL, el stack como «pendiente» y Valvedex con React/Next.js como hecho (en `docs/PROYECTOS.md` es «base prevista»). Se corrige en la rama de la base (decisión de Manuel).

## Datos o decisiones pendientes de Manuel

- ¿npm queda acordado? (`AGENTS.md` ya lo exige; el resto de documentos lo tenía como propuesto).
- Nombres de los campos de proyectos en inglés (`title`, `description`, `personalContribution`…), como pide `AGENTS.md`: confirmar.
- ¿ValveDex usa Three.js / React Three Fiber? `docs/HERRAMIENTAS.md` lo afirmaba sin confirmar.
- Aprobar o ajustar paleta y tipografía al verlas aplicadas.
- Correo público y CV.

## Próximo paso concreto (modo plan)

1. Guiar a Manuel para configurar GitHub (protección de `main`, borrar ramas al mergear, merge commits) y Git (`pull.rebase=false`, `pull.ff only`).
2. Explicar el plan para crear la base Next.js en la rama `chore/project-setup` (incluida la limpieza del README) y, tras la aprobación de Manuel, guiarle paso a paso.
3. Al empezar la fase de diseño, activar en `.claude/settings.json` los plugins marcados «desactivado hasta esa fase» en `docs/HERRAMIENTAS.md`.
