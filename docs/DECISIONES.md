# Registro de decisiones

## Confirmado — 6 de octubre de 2026 (sesión inicial, ChatGPT / Codex)

| Decisión | Motivo |
| --- | --- |
| Crear un portfolio para mostrar los proyectos de Manuel. | Es el objetivo solicitado. |
| Mantener documentación compartida entre Claude y ChatGPT/Codex. | Poder continuar el mismo trabajo sin depender del historial del chat. |
| Usar `AGENTS.md` como instrucciones comunes y `CLAUDE.md` como entrada. | Evitar reglas duplicadas que se contradigan. |
| Registrar el estado y las tareas después de cada sesión. | Dejar claro qué está hecho y qué toca después. |

## Confirmado — octubre de 2026 (sesión con Claude)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| El proyecto empieza de cero (no había código previo). | Confirmado por Manuel. | Se crea con `create-next-app`. |
| Stack: Next.js (App Router) + React + TypeScript. | Coherente con su aprendizaje y con Cerrajería NOA; permite datos locales sin backend. Manuel eligió los estilos sobre esta base. | Código en `src/`, alias `@/*`. |
| Estilos con Tailwind CSS. | Elegido por Manuel (en ValveDex usa CSS Modules + BEM; aquí eligió Tailwind). | No usar BEM ni CSS propio en paralelo salvo en `globals.css` para variables y estilos base. |
| Dirección visual: oscuro y técnico. | Elegido por Manuel. | Ver propuesta de paleta y tipografía abajo. |

## Confirmado — 24 de octubre de 2026 (sesión con Claude)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| Se parte de un repositorio de GitHub vacío ya clonado. | Situación real indicada por Manuel. | La base Next.js se crea dentro de esa carpeta, sin crear otro repositorio. |
| El desarrollo principal se hará con Claude Code usando los plugins de Manuel. | Indicado por Manuel. | `CLAUDE.md` define cómo revisar, activar y documentar plugins; inventario en `docs/HERRAMIENTAS.md`. |
| Librerías para la fase de diseño: shadcn/ui, React Bits, GSAP y Lenis. | Elegidas por Manuel. | Se instalan al llegar a esa fase, no antes. Las animaciones pasan de ampliación a parte del plan. |
| La documentación se mejora conforme avanza el proyecto. | Indicado por Manuel. | Sección «Documentación viva» en `AGENTS.md`. |
| Modo plan para el código: cada paso o bloque grande se explica en texto, Manuel escribe el código guiado y aprueba antes de avanzar. Modo auto solo para documentación o lo que Manuel pida expresamente. | Manuel quiere entender cada paso, como en ValveDex. | Sección «Modo de trabajo» en `AGENTS.md`. |
| Flujo de GitHub igual que ValveDex: GitHub Flow, ramas con prefijo, PR a `main` con merge commit, Conventional Commits en español redactados por la IA y escritos por Manuel. | Indicado por Manuel. | Sección «Flujo de GitHub» en `AGENTS.md`. La IA no hace commits, push ni PR salvo petición expresa. |
| `CHANGELOG.md` con formato Keep a Changelog. | Mismo sistema que ValveDex. | Cambios completados en «Sin publicar». |
| Claude Code decide y crea `.claude/settings.json` tras revisar el proyecto y los plugins instalados; no se copia la configuración de otros proyectos. | Indicado por Manuel. | Criterios en `CLAUDE.md`; requiere aprobación de Manuel. |
| Plugins del proyecto: activos codex, grill-me, karpathy-skills y claude-code-setup; desactivados caveman, ponytail, claude-mem y superpowers; los de diseño y antislop, desactivados hasta su fase. | Aprobado por Manuel tras el inventario. caveman y ponytail recortan explicaciones, claude-mem compite con `docs/`, superpowers impone otro flujo. | `.claude/settings.json`; detalle y reparto de diseño en `docs/HERRAMIENTAS.md`. |
| Codex colabora en paralelo con el plugin `codex`, revisando en solo lectura. | Pedido por Manuel. | Revisión independiente antes de cada PR; no implementa por su cuenta. |
| Terminal: Git Bash. | Confirmado por Manuel. | Los comandos se dan en sintaxis de Bash. |
| La documentación entra por la rama `docs/initial-docs` y PR, no directa a `main`. | `main` ya tenía tres commits hechos desde GitHub. | Se elimina la excepción del primer commit. |
| El README se corrige en la rama de la base, no en la de documentación. | Decidido por Manuel. | Tarea en `docs/TAREAS.md`. |
| Para esta entrega de documentación, Claude hace commit, push, PR y merge. | Autorización expresa de Manuel para esta entrega. | No se extiende a las siguientes ramas sin nueva autorización. |

## Propuestas pendientes

| Propuesta | Estado |
| --- | --- |
| Gestor de paquetes: npm. | Propuesto (viene con Node); `AGENTS.md` ya lo da por hecho. Confirmar al crear el proyecto. |
| Campos de los proyectos con identificadores en inglés (`title`, `description`, `personalContribution`…), como exige `AGENTS.md`. | Propuesto; los nombres en español de `docs/CONTEXTO.md` son conceptuales. |
| Paleta: fondo `#0B0F14`, superficie `#121821`, borde `#1F2937`, texto `#E6EDF3`, texto secundario `#8B949E`, acento `#22D3EE`. | Propuesta; revisar al verla aplicada. |
| Tipografía: Geist (texto) y Geist Mono (detalles técnicos), vía `next/font`. | Propuesta; no añade dependencias. |
| Solo tema oscuro en la primera versión. | Propuesta; tema claro queda como ampliación. |
| Primera versión con una página y secciones. | Pendiente de acordar. |
| Proyectos en un archivo de datos local, sin backend. | Pendiente de acordar. |
| Cerrajería NOA y Digital Fit como proyectos principales. | Pendiente de revisar material y selección. |
| Alojamiento, dominio, correo y CV público. | Sin definir. |
| Versiones: `v0.1.0` con la base y la estructura de una página funcionando; `v0.x.0` por cada bloque estable (diseño, contenido real…); `v0.x.y` para correcciones; `v1.0.0` con la primera versión publicada y revisada. | Propuesta; tags solo cuando Manuel lo indique. |

## Sustituidas

| Propuesta anterior | Sustituida por |
| --- | --- |
| Animaciones discretas como ampliación fuera de la primera versión. | Fase de diseño con shadcn/ui, React Bits, GSAP y Lenis (24 oct 2026). |
| Crear el repositorio desde `create-next-app` y conectarlo después a GitHub. | Repositorio ya creado y clonado (24 oct 2026). |
| CSS propio con BEM o Tailwind. | Tailwind (octubre de 2026). |

## Cómo registrar nuevas decisiones

Añade fecha, decisión, motivo y consecuencias relevantes. Identifica si está acordada, propuesta o sustituida. Cuando Manuel cambie una decisión, marca la anterior como sustituida y registra la nueva para que las siguientes IA no la recuperen por error.

No registres como decisión aprobada una preferencia de la IA que Manuel no haya confirmado.
