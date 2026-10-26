# Claude — Portfolio

@AGENTS.md
@docs/ESTADO.md

Las reglas comunes y el estado están en los archivos importados. Consulta el resto de `docs/` según indica `AGENTS.md` y contrasta siempre con los archivos reales.

En Claude web (chat), adjunta también los archivos referenciados y el código relevante: las importaciones con `@` solo funcionan en Claude Code.

## Modo plan y modo auto

Recordatorio de `AGENTS.md`: en **modo plan** explicas cada paso o bloque grande en texto (qué, por qué, archivos, comprobación), Manuel escribe el código y no avanzas sin su confirmación. En **modo auto** solo actualizas documentación o haces exactamente lo que Manuel pida. Si un plugin o skill propone otra forma de trabajar (respuestas telegráficas, implementar por su cuenta, otro flujo de commits), mandan estas reglas.

## Plugins y skills de Claude Code

`.claude/settings.json` decide qué plugins están activos en este proyecto. Se creó el 24 de octubre de 2026 tras el inventario aprobado por Manuel (detalle en `docs/HERRAMIENTAS.md`). No copies la configuración de otros proyectos de Manuel. `.claude/settings.local.json` es local y no se sube a Git.

### Primera sesión

1. Comprueba qué plugins, skills, agentes y MCP hay realmente instalados (`/plugin`, `/mcp`; si cambian, `/help`).
2. Revisa el proyecto (documentación, fase actual de `docs/TAREAS.md`, código si existe) y analiza cada plugin y skill para este portfolio.
3. Clasifica cada uno en `docs/HERRAMIENTAS.md`: usar ahora, usar en una fase posterior (contenido, diseño, revisión, despliegue) o no usar, con una línea de motivo y cuándo invocarlo.
4. Explica tu propuesta a Manuel en modo plan y, cuando la apruebe, crea `.claude/settings.json` activando y desactivando lo acordado. Añade `.claude/settings.local.json` al `.gitignore`.

### Criterios

- Desactiva lo que recorte las explicaciones, implemente por su cuenta, imponga otro flujo de trabajo o de commits, o mantenga una memoria propia que compita con `docs/`.
- Activa lo que ayude a este proyecto sin romper el modo plan: preguntas antes de decidir estructura o datos, revisión de textos visibles, revisión de código y accesibilidad, y skills de diseño cuando llegue esa fase.
- Si varias skills de diseño se solapan, decide cuál lidera cada parte (dirección visual, tipografía, color, movimiento) y regístralo.
- Si hay una herramienta para revisar la configuración de Claude Code (por ejemplo `claude-code-setup` o `claude-automation-recommender`), úsala como apoyo; lo que proponga es propuesta hasta que Manuel lo apruebe.

### En cada fase

Al empezar una fase nueva de `docs/TAREAS.md`, revisa de nuevo: propone activar lo que esa fase necesita y desactivar lo que ya no aporta. Usa por iniciativa propia los plugins activos cuando encajen con la tarea. Registra cada cambio en `docs/HERRAMIENTAS.md` y `docs/DECISIONES.md`.

### Coordinación con Codex

Regla de Manuel (25 de octubre de 2026):

- Claude y Codex trabajan coordinados mediante el plugin `codex`. En cada encargo a Codex, indica qué skills suyas debe usar: `token-efficient-workflow` siempre, y solo las demás que la tarea necesite (lista en `docs/HERRAMIENTAS.md`).
- `token-efficient-workflow`: contexto mínimo, sin análisis repetidos ni llamadas innecesarias, sin sacrificar calidad, seguridad ni pruebas, y sin recortar las explicaciones que Manuel necesita.
- En tareas complejas, separa planificación, implementación y revisión. Por defecto Codex revisa en solo lectura (planes y diffs antes de cada PR).
- Si varios agentes trabajan a la vez, nunca editan los mismos archivos (ver «Continuidad entre IA» en `AGENTS.md`).
- Se respetan las instrucciones, el diseño, la arquitectura y el GitHub Flow del proyecto. Antes de cambios importantes, se explica el plan a Manuel.

### Librerías de diseño

GSAP, Lenis, React Bits y shadcn/ui están previstas (detalle en `docs/HERRAMIENTAS.md`). Cada una se instala en el paso en que se usa por primera vez, consultando antes su documentación oficial actual y explicando para qué sirve.
