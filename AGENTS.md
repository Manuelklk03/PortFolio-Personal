# Instrucciones para trabajar en el portfolio

## Antes de empezar

Lee, en este orden:
1. `docs/ESTADO.md`.
2. `docs/CONTEXTO.md`.
3. `docs/DECISIONES.md`.
4. `docs/TAREAS.md`.
5. `docs/PROYECTOS.md`.
6. `docs/HERRAMIENTAS.md` (plugins, herramientas y librerías por fase).

Después contrasta la documentación con el repositorio: `git status`, `git branch -a`, `git log --oneline -5` y, si existe, `package.json` (scripts con `npm run`). No supongas que existen rutas, dependencias, scripts o un despliegue por estar mencionados en la documentación. Si código y documentación no coinciden, aclara la diferencia y corrige el estado antes de continuar.

Las instrucciones actuales de Manuel tienen prioridad. Para los hechos personales, usa solo la información confirmada de `docs/PROYECTOS.md` y las correcciones de Manuel.

## Modo de trabajo

Manuel quiere entender cada paso. Hay dos modos:

### Modo plan (por defecto para cualquier cambio de código)

- Antes de cada paso o bloque grande, explica en texto qué se va a hacer, por qué y para qué, qué archivos se crean o cambian y cómo se comprobará. Como un plan que Manuel puede leer y aprobar.
- Manuel escribe el código guiado. Para archivos nuevos, entrega el contenido completo con su ruta relativa. Para archivos existentes, indica las líneas exactas que cambian y el motivo de cada cambio.
- Explica brevemente el concepto que se practica y distingue Astro de React cuando corresponda.
- Indica qué parte hace Manuel y cuál es la comprobación final del paso.
- No avances al siguiente paso hasta que Manuel lo confirme.
- Si Manuel pide expresamente que implementes algo tú, hazlo y explica después lo esencial.

### Modo auto (solo dos usos)

- Actualizar la documentación (`docs/`, `CHANGELOG.md`, `AGENTS.md`, `CLAUDE.md`, `README.md` cuando toque).
- Hacer exactamente lo que Manuel pida de forma expresa.

En modo auto no toques código por iniciativa propia ni encadenes pasos que no se hayan pedido.

### Estados de una tarea

Una respuesta con instrucciones no demuestra que Manuel las haya aplicado. Distingue siempre entre **preparado** (lo has propuesto), **aplicado** (Manuel o tú lo habéis hecho) y **verificado** (comprobado con comandos o en el navegador). Marca algo como completado solo con evidencia.

## Forma de ayudar

- Responde en español, de forma directa y con pasos concretos. Explica lo necesario, sin relleno.
- Comprueba qué terminal usa Manuel (CMD, PowerShell o Git Bash en Windows) antes de dar comandos específicos de un shell.
- Mantén una tarea acotada por sesión. El plan de `docs/TAREAS.md` no es una orden de implementar todas las fases.
- No cambies el stack, la estructura o la dirección visual acordada sin tratarlo con Manuel.
- No añadas dependencias, servicios, autenticación o backend sin una necesidad del portfolio. Cada dependencia se instala en el paso en que se usa por primera vez, explicando para qué sirve; nada «por si acaso». Las librerías de diseño previstas están en `docs/HERRAMIENTAS.md`.
- Usa npm y conserva `package-lock.json`.

## Reglas de código y contenido

- Astro con React para las partes interactivas, y TypeScript estricto (`astro/tsconfigs/strict`). Por defecto todo es HTML estático en componentes `.astro`; un componente de React (`.tsx`) solo se hidrata con una directiva `client:*` cuando necesita interacción, y se elige la más tardía que funcione (`client:visible` o `client:idle` antes que `client:load`). No conviertas una sección entera en isla para resolver una interacción local.
- `src/pages` define las rutas, `src/layouts` los layouts, los componentes compartidos van en `src/components` y los datos (proyectos, tecnologías) en `src/data` con sus tipos. Separa datos y presentación.
- Identificadores en inglés; interfaz, explicaciones y documentación en español. Componentes en PascalCase (también sus archivos `.astro` y `.tsx`), funciones y variables en camelCase, el resto de archivos y carpetas en kebab-case.
- Sin `any`, conversiones forzadas ni desactivación de reglas para ocultar errores.
- Los estilos se hacen con Tailwind. No introduzcas otra convención de CSS en paralelo; `src/styles/global.css` queda para variables del tema y estilos base. Los componentes de shadcn/ui conservan sus utilidades y toman los colores de las variables del tema.
- HTML semántico, accesibilidad (etiquetas, foco visible, teclado, textos alternativos) y diseño responsive.
- Las animaciones respetan `prefers-reduced-motion`, no bloquean la lectura ni la navegación y no empeoran el rendimiento en móvil.
- No inventes experiencia, dominio de tecnologías, métricas, testimonios ni enlaces. Un proyecto en desarrollo aparece como tal.
- Nunca incluyas secretos, credenciales ni datos privados en el repositorio ni en la documentación.

## Flujo de GitHub

Se sigue **GitHub Flow**, igual que en el proyecto ValveDex de Manuel:

1. `git switch main && git pull --ff-only`.
2. `git switch -c <tipo>/<nombre>` con `feature/`, `fix/`, `refactor/`, `docs/`, `test/` o `chore/`. **Nunca se trabaja directamente en `main`.** Una rama = una funcionalidad o cambio lógico completo.
3. Commits pequeños y claros.
4. `git push -u origin <rama>` la primera vez; después, `git push`.
5. `gh pr create --base main --fill`.
6. Revisar los cambios y `gh pr merge --merge --delete-branch`.
7. `git switch main && git pull --ff-only`.

Mensajes de commit:

- Conventional Commits en español: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, con ámbito cuando ayude. Ejemplo: `feat(projects): añadir tarjetas de proyectos`.
- Los redacta la IA y los escribe Manuel. Al final de cada paso, entrega el mensaje completo: título, línea en blanco y descripción en lista con `- `.
- No hagas commits, push, PR ni merges salvo petición expresa de Manuel. Excepción: las correcciones pequeñas que detectes (erratas, configuración, fixes) las arreglas tú con su commit, push, PR y merge, y luego le dices a Manuel qué cambiaste. Tampoco ejecutes por tu cuenta cambios de configuración de Git o GitHub: dale los comandos.

Otras reglas:

- `main` no tiene protección configurada en GitHub (decisión de Manuel): el flujo de ramas y PR se respeta por disciplina, no porque GitHub lo imponga.
- Para continuar una rama en otro equipo: `git push` en el primero; en el segundo, `git fetch`, `git switch <rama>` y `git pull --ff-only`. Antes de cambiar de equipo, el árbol debe estar limpio y la rama al día.
- Si se edita algo directamente en GitHub, hacer `git switch main && git pull --ff-only` antes de seguir.
- Versionado semántico con tags anotados y GitHub Releases, solo cuando `main` esté estable y Manuel lo indique. Avisa cuando veas un buen momento, pero no crees el tag. Criterios en `docs/DECISIONES.md`.

## Comprobaciones

Confirma primero que existe `package.json` y consulta sus scripts. Para código: `npm run check` (tipos de `.astro` y TypeScript) y las pruebas configuradas; `npm run build` al cerrar una entrega o tocar rutas, configuración o islas de React. No hay ESLint configurado. Para cambios visuales: móvil, escritorio, teclado y enlaces. No inventes resultados: distingue ejecutado, pendiente y no disponible.

## Documentación viva

La documentación se mejora conforme avanza el proyecto. Cuando descubras algo que la siguiente IA necesite saber (una convención, un comando real, un problema y su solución, cómo se integró una librería, un plugin útil), añádelo al documento que corresponda. Mantén los documentos breves: actualiza o sustituye lo obsoleto en vez de acumular.

- `docs/ESTADO.md`: punto de continuación.
- `docs/DECISIONES.md`: decisiones con su motivo.
- `docs/HERRAMIENTAS.md`: plugins y librerías.
- `CHANGELOG.md`: cambios completados en «Sin publicar» (formato Keep a Changelog). Lo futuro va en `docs/TAREAS.md`.

## Al terminar cada tarea

1. Actualiza `docs/ESTADO.md`: fecha, rama, cambios, archivos, comprobaciones reales, problemas y próximo paso concreto.
2. Actualiza `docs/TAREAS.md`, `docs/DECISIONES.md`, `CHANGELOG.md` y `docs/HERRAMIENTAS.md` si corresponde.
3. Entrega a Manuel el mensaje de commit y los comandos del flujo de GitHub que tocan.
4. Resume qué cambió, cómo se comprobó, qué queda sin commit y qué toca después.

Si trabajas en un chat sin acceso a los archivos, entrega el contenido actualizado de los documentos afectados y pide solo los archivos que necesites. No afirmes haber accedido al ordenador de Manuel.

## Continuidad entre IA

`AGENTS.md` contiene las reglas comunes; `CLAUDE.md` las importa para Claude Code. No mantengas copias divergentes. `docs/ESTADO.md` es el punto de relevo: no dependas de que otra IA recuerde una conversación. Evita que dos herramientas editen a la vez los mismos archivos del mismo checkout. Si deben trabajar a la vez, cada una usa su propio worktree o clon con su rama; en la misma carpeta, una rama distinta no las aísla.
