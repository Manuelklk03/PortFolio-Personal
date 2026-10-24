# Documentación del portfolio de Manuel

Estos archivos permiten desarrollar el mismo portfolio con Claude Code, Claude, ChatGPT o Codex sin perder el contexto. Van en la raíz del repositorio, junto al código.

Las IA no comparten conversaciones ni archivos entre sí. La continuidad depende de que esta documentación se actualice al final de cada sesión y se suba al repositorio.

## Qué contiene

| Archivo | Para qué sirve |
| --- | --- |
| `LEEME.md` | Esta guía. |
| `AGENTS.md` | Instrucciones comunes: modo plan / auto, flujo de GitHub, reglas de código. |
| `CLAUDE.md` | Lo específico de Claude Code: cómo revisar y usar los plugins. |
| `docs/ESTADO.md` | Punto exacto en el que se dejó el trabajo. Lo primero que se lee. |
| `docs/CONTEXTO.md` | Objetivo, alcance, base técnica y diseño. |
| `docs/DECISIONES.md` | Decisiones acordadas y propuestas. |
| `docs/TAREAS.md` | Trabajo pendiente por fases. |
| `docs/PROYECTOS.md` | Información de Manuel y de sus proyectos. |
| `docs/HERRAMIENTAS.md` | Plugins de Claude Code y librerías de diseño (shadcn/ui, React Bits, GSAP, Lenis). |
| `CHANGELOG.md` | Cambios completados, por versión. |
| `.claude/settings.json` | Plugins activos en el proyecto, creado por Claude Code tras el inventario de `docs/HERRAMIENTAS.md`. |

---

## Empezar

La documentación ya está en `main` (entró por la rama `docs/initial-docs` y PR). Todo cambio va por rama y PR (GitHub Flow, explicado en `AGENTS.md`); no se trabaja directamente en `main`.

### 1. Abre Claude Code en la carpeta

```bash
claude
```

Claude Code lee `CLAUDE.md`, que importa `AGENTS.md` y `docs/ESTADO.md`.

### 2. Pega el mensaje de arranque

```text
Empezamos mi portfolio. Lee CLAUDE.md, AGENTS.md y todos los documentos de docs/ en el orden indicado, y contrástalos con el repositorio (git status, git branch -a, git log --oneline -5).

Trabajamos en modo plan: antes de cada paso o bloque grande, explícame en texto qué vamos a hacer, por qué, qué archivos se tocan y cómo lo comprobamos. Yo escribo el código guiado y no avanzas sin que te lo confirme. El modo auto es solo para actualizar documentación o hacer lo que te pida expresamente.

Primero revisa el proyecto y los plugins, skills y MCP que tengo instalados. Analiza cuáles sirven para este portfolio y cuáles no, siguiendo los criterios de CLAUDE.md, rellena docs/HERRAMIENTAS.md y explícame tu propuesta. Cuando la apruebe, crea tú el .claude/settings.json del proyecto. Después guíame para configurar GitHub y Git como en ValveDex, y explícame el plan para crear la base Next.js en una rama chore/.

Al terminar, actualiza la documentación y dame el mensaje de commit y los comandos de la PR.
```

### 3. Al terminar cada tarea

La IA te dará el mensaje de commit y los comandos. El ciclo normal es:

```bash
git add .
git commit
git push -u origin <rama>
gh pr create --base main --fill
gh pr merge --merge --delete-branch
git switch main && git pull --ff-only
```

---

## Continuar en otra IA

### Mensaje para continuar con Claude Code

```text
Seguimos con mi portfolio. Lee CLAUDE.md, AGENTS.md y los documentos de docs/, y contrástalos con el repositorio (git status, git branch -a, git log --oneline -5, gh pr list --state all).

Modo plan: explícame cada paso o bloque grande en texto antes de hacerlo; yo escribo el código y confirmo antes de avanzar. Modo auto solo para documentación o lo que te pida. Si empezamos una fase nueva, revisa qué plugins conviene activar o desactivar.

Continúa con el próximo paso de docs/ESTADO.md. Al terminar, actualiza la documentación (mejorándola con lo aprendido) y dame el mensaje de commit y los comandos de la PR. No marques como hecho algo que solo se haya propuesto.
```

### Mensaje para ChatGPT, Codex u otra IA

```text
Continúa este portfolio desde su estado actual. Lee AGENTS.md y los documentos que indica, y comprueba el código antes de cambiar nada. La conversación anterior puede estar desactualizada: usa los archivos actuales y mis instrucciones de esta sesión.

Trabaja en modo plan: explícame cada paso antes de hacerlo y pásame los archivos completos o las líneas exactas a cambiar; yo escribo el código. Sigue el flujo de GitHub de AGENTS.md. Actualiza la documentación al finalizar y dame el mensaje de commit y el próximo paso concreto.
```

Si el repositorio es público, la IA puede consultarlo cuando tenga acceso a internet; si no, adjunta los archivos necesarios.
