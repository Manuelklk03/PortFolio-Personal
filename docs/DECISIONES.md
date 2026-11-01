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
| El proyecto empieza de cero (no había código previo). | Confirmado por Manuel. | Se crea con un generador oficial (ver stack del 25 oct). |
| Estilos con Tailwind CSS. | Elegido por Manuel (en ValveDex usa CSS Modules + BEM; aquí eligió Tailwind). | No usar BEM ni CSS propio en paralelo salvo en `src/styles/global.css` para variables y estilos base. |
| Dirección visual: oscuro y técnico. | Elegido por Manuel. | Ver propuesta de paleta y tipografía abajo. |

## Confirmado — 24 de octubre de 2026 (sesión con Claude)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| Se parte de un repositorio de GitHub ya clonado, sin código de aplicación (solo un README creado desde GitHub). | Situación real indicada por Manuel. | La base se crea en una carpeta temporal y se copia al repositorio, sin crear otro. |
| El desarrollo principal se hará con Claude Code usando los plugins de Manuel. | Indicado por Manuel. | `CLAUDE.md` define cómo revisar, activar y documentar plugins; inventario en `docs/HERRAMIENTAS.md`. |
| Librerías para la fase de diseño: shadcn/ui, React Bits, GSAP y Lenis. | Elegidas por Manuel. | Se instalan al llegar a esa fase, no antes. Las animaciones pasan de ampliación a parte del plan. |
| La documentación se mejora conforme avanza el proyecto. | Indicado por Manuel. | Sección «Documentación viva» en `AGENTS.md`. |
| Modo plan para el código: cada paso o bloque grande se explica en texto, Manuel escribe el código guiado y aprueba antes de avanzar. Modo auto solo para documentación o lo que Manuel pida expresamente. | Manuel quiere entender cada paso, como en ValveDex. | Sección «Modo de trabajo» en `AGENTS.md`. |
| Flujo de GitHub igual que ValveDex: GitHub Flow, ramas con prefijo, PR a `main` con merge commit, Conventional Commits en español redactados por la IA y escritos por Manuel. | Indicado por Manuel. | Sección «Flujo de GitHub» en `AGENTS.md`. La IA no hace commits, push ni PR salvo petición expresa. |
| `CHANGELOG.md` con formato Keep a Changelog. | Mismo sistema que ValveDex. | Cambios completados en «Sin publicar». |
| Claude Code decide y crea `.claude/settings.json` tras revisar el proyecto y los plugins instalados; no se copia la configuración de otros proyectos. | Indicado por Manuel. | Criterios en `CLAUDE.md`; requiere aprobación de Manuel. |
| Plugins del proyecto: activos codex, grill-me (cuestionario sobre el código, ver `docs/HERRAMIENTAS.md`), karpathy-skills y claude-code-setup; desactivados caveman, ponytail, claude-mem y superpowers; los de diseño y antislop, desactivados hasta su fase. | Aprobado por Manuel tras el inventario. caveman y ponytail recortan explicaciones, claude-mem compite con `docs/`, superpowers impone otro flujo. | `.claude/settings.json`; detalle y reparto de diseño en `docs/HERRAMIENTAS.md`. |
| Codex colabora en paralelo con el plugin `codex`, revisando en solo lectura. | Pedido por Manuel. | Revisión independiente antes de cada PR; no implementa por su cuenta. |
| Terminal: Git Bash. | Confirmado por Manuel. | Los comandos se dan en sintaxis de Bash. |
| La documentación entra por la rama `docs/initial-docs` y PR, no directa a `main`. | `main` ya tenía tres commits hechos desde GitHub. | Se elimina la excepción del primer commit. |
| El README se corrige en la rama de la base, no en la de documentación. | Decidido por Manuel. | Tarea en `docs/TAREAS.md`. |
| Para esta entrega de documentación, Claude hace commit, push, PR y merge. | Autorización expresa de Manuel para esta entrega. | No se extiende a las siguientes ramas sin nueva autorización. |

## Confirmado — 25 de octubre de 2026 (sesión con Claude Code)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| Stack: Astro (sobre Vite) + React para las islas interactivas + TypeScript estricto + Tailwind. Sustituye a Next.js. | Manuel quería estrenar algo nuevo sin dejar React; Astro genera HTML estático (buen SEO y vista previa al compartir) y encaja con una web de contenido. shadcn/ui, React Bits, GSAP y Lenis siguen siendo compatibles. | Reglas de código de `AGENTS.md` adaptadas a Astro. Comprobaciones: `npm run check` y `npm run build`; sin ESLint por ahora. |
| Gestor de paquetes: npm. | Confirmado por Manuel. | Se conserva `package-lock.json`. |
| Identificadores en inglés, también los campos de los proyectos (`title`, `description`, `personalContribution`…). | Confirmado por Manuel. | Los nombres en español de `docs/CONTEXTO.md` son conceptuales. |
| No se configura la protección de `main` ni `pull.ff only`; se sigue el flujo de ramas y PR. | Decidido por Manuel: basta con seguir el flujo. | Tarea retirada de `docs/TAREAS.md`. |
| Coordinación de Claude y Codex: cada encargo a Codex indica qué skills usar (`token-efficient-workflow` siempre), se separan planificación, implementación y revisión, y no editan los mismos archivos a la vez. | Pedido por Manuel. | Sección en `CLAUDE.md`; skills en `docs/HERRAMIENTAS.md`. |

## Confirmado — 27 de octubre de 2026 (sesión con Claude Code)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| Objetivo visual: diseño profesional que destaque, no una plantilla genérica. | Pedido por Manuel. | En la fase de diseño (3b) se activan las skills de diseño y las decisiones visuales (dirección, tipografía, color, movimiento, cursor) se preguntan a Manuel una a una con opciones, en el paso que las necesita. grill-me sigue siendo el cuestionario sobre el código. |
| Cursor de ratón personalizado. | Pedido por Manuel. | Solo en dispositivos con puntero fino (`pointer: fine`); se desactiva en táctil y con `prefers-reduced-motion`; no oculta el foco ni dificulta clicar. Tarea en la fase 3b. |
| Las correcciones pequeñas que detecte la IA (erratas, configuración, fixes) las aplica ella sola con su commit, push, PR y merge, y después le dice a Manuel qué arregló. Los pasos con código nuevo siguen en modo plan. | Pedido por Manuel. | Excepción a «no hagas commits salvo petición expresa» de `AGENTS.md`. |
| Plugins nuevos: activar chrome-devtools-mcp; vercel desactivado hasta la fase 4; desactivar oh-my-claudecode, mempalace y supabase. | Aprobado por Manuel tras la propuesta de Claude. | `.claude/settings.json` y tabla de `docs/HERRAMIENTAS.md`. |

## Confirmado — 31 de octubre de 2026 (sesión con Claude Code)

| Decisión | Motivo | Consecuencias |
| --- | --- | --- |
| Dirección visual: ASCII art interactivo, estilo terminal elegante. Sustituye a «oscuro y técnico» genérico. | Elegido por Manuel: quiere un diseño que destaque. | Los efectos actuales (`OrbitingBalls`, `TextReveal`) se revisan para sustituirlos por efectos ASCII. Las decisiones concretas (efecto del inicio, marcos, cursor) se preguntan una a una. |
| Paleta «Abyss + Jade»: fondo `#050A14`, superficie `#0A1626`, borde `#15304A`, texto `#DDF7F0`, secundario `#8AA9A6`, acento `#3EE6C1`, acento 2 `#0F9D9A`. | Elegida por Manuel (Midnight Abyss + Aqua Jade). Contraste del texto secundario sobre el fondo ≈ 7,7:1. | Sustituye a la paleta base del 27 oct; se aplica en `@theme` en el paso de diseño. |
| Inicio: nudo 3D en ASCII de fondo que gira solo con un balanceo suave, con botón «pausar fondo» (WCAG 2.2.2; desde el 31 oct ya no sigue al ratón, a petición de Manuel) + nombre en ASCII grande que se descifra al cargar y al pasar el ratón. | Elegido por Manuel («las dos combinadas»). | Sustituye a `OrbitingBalls` y `TextReveal`. Sin animación con `prefers-reduced-motion` (se muestra estático); el nombre real sigue como texto accesible (`h1`). |
| Resto de la web: «terminal elegante». Marcos finos tipo `┌─┐` en tarjetas, títulos de sección con prompt (`~/proyectos $`), cursor jade en forma de bloque `█`. Los textos largos siguen en Geist. | Elegido por Manuel. | El cursor actual se adapta a esta forma; mismas condiciones de accesibilidad (`pointer: fine`, sin él con `prefers-reduced-motion`). |
| Fase de diseño: activar frontend-stack, frontend-design, emil-design-eng, impeccable, ui-ux-pro-max y antislop. Siguen desactivados taste (se solapa con frontend-design), imagegen-skills y vercel (fase 4). | Pedido por Manuel: activar todo lo que sirva al proyecto. | `.claude/settings.json` y tabla de `docs/HERRAMIENTAS.md`. Reparto: frontend-stack decide, frontend-design lidera dirección visual y tipografía, emil-design-eng el movimiento, ui-ux-pro-max color y shadcn, impeccable audita, antislop revisa textos y UI genérica. |
| En este portfolio la IA implementa directamente scripts, efectos, configuración y limpiezas, y solo informa del resultado. Modo plan solo para decisiones de diseño. | Pedido por Manuel: el proyecto es pequeño y ya entiende la estructura de Astro; el aprendizaje paso a paso será en otro proyecto. | Sustituye a «Manuel escribe el código guiado» para este proyecto. |
| Nombre del inicio: partículas ASCII que se apartan del ratón y vuelven con un muelle; clic = onda expansiva. Sustituye al efecto de descifrado. | Elegido por Manuel (el descifrado le resultaba raro). | Canvas en `AsciiName.astro`; con `prefers-reduced-motion` se muestra el `<pre>` estático. |
| Sección de currículum con visor PDF y descarga; correo público `manuelcp420@gmail.com` junto a GitHub y LinkedIn. | Pedido por Manuel. | Datos en `src/data/profile.ts`; mientras `cvUrl` sea `null` la sección muestra «Disponible muy pronto» (sin botones rotos). |
| Quitar GSAP: las entradas de sección pasan a IntersectionObserver + CSS y Lenis funciona solo. | Revisión de UI del 31 oct: GSAP nunca se ejecutó (scripts sin procesar) y al arreglarlo dejaba tarjetas a medias; una entrada simple no lo necesita. | Menos JavaScript. Si más adelante hace falta una línea de tiempo o scroll con scrub, se reinstala. |
| La entrada del inicio la hacen solo las partículas del nombre; la cabecera no es fija en móvil; «CV» solo aparece en el menú y como sección cuando hay PDF. | Revisión de UI (antislop / impeccable) del 31 oct. | `animateHero` eliminado; enlaces del menú de 44 px en móvil. |
| Ajustes de diseño tras la revisión de UI: nudo 3D a la derecha con degradado hacia el texto; proyectos como listado `ls -l` (sin tarjetas tipo ventana de Mac); secciones más compactas con título de terminal (`~/id $ comando`, el nombre real queda para lectores de pantalla); «Sobre mí» como bloque clave-valor y «Tecnologías» como listado; brillo solo en el nombre y el cursor, un único foco de luz de fondo. | Elegido por Manuel. | `ProjectCard.astro` sustituido por `ProjectEntry.astro`; «Sobre mí» usa datos reales de `profile.about`. |
| ASCII en toda la página (1 nov): franja que deshace el final del inicio, prompt de la cabecera que sigue a la sección visible + barra de progreso de scroll (escritorio), «Sobre mí» estilo neofetch con retrato ASCII de Manuel (de `src/assets/portrait.jpg`; mientras no exista, sus iniciales), firma de cada proyecto en ANSI Shadow y hover que invierte colores como una selección de terminal. Sin esquinas redondeadas. | Elegido por Manuel tras las propuestas del director de diseño (frontend-stack) y de Codex. La fuente Calvin S se descartó: su X parecía una esvástica. | Generación al compilar en `src/lib/ascii-art.ts` (figlet + sharp). Contacto como filas de terminal y 404 con el mismo lenguaje (revisión antislop). |
| Retrato de «Sobre mí»: empieza en ASCII y la foto se monta encima fila a fila (44 filas) al entrar en pantalla; la foto va sin fondo y en duotono de la paleta (fondo → teal → jade). | Pedido por Manuel. | `tintedPhoto` en `src/lib/ascii-art.ts` (fondo detectado desde los bordes, data URI WebP); animación en `global.css`. Sin animación (movimiento reducido o sin JS) se ve directamente la foto. |
| Publicar el CV completo (incluido el teléfono) con visor y descarga; la sección Stack usa las tecnologías del CV. | Decidido por Manuel tras el aviso de que el teléfono quedaría público. | `cvUrl` en `src/data/profile.ts`; `src/data/tech.ts` ya no es de prueba. |
| CV con vista previa propia (pdf.js) en un marco de terminal: se ve la parte de arriba y se funde con el fondo; el documento completo se abre o descarga con botones de terminal. Sustituye al `<object>` del visor del navegador. | Manuel: el visor del navegador se veía artificial. | `CvPreview.astro`; la página se «imprime» en 30 pasos con movimiento permitido. |
| Los proyectos, enlaces, tecnologías y el dominio `manuelcasinos.dev` que hay ahora en la web son **datos de prueba**. | Indicado por Manuel. | Deben sustituirse por los datos reales de `docs/PROYECTOS.md` antes de publicar. |

## Propuestas pendientes

| Propuesta | Estado |
| --- | --- |
| Paleta: fondo `#0B0F14`, superficie `#121821`, borde `#1F2937`, texto `#E6EDF3`, texto secundario `#8B949E`, acento `#22D3EE`. | Aplicada como base (27 oct 2026, tema `@theme`); se revisa en la fase de diseño. |
| Tipografía: Geist (texto) y Geist Mono (detalles técnicos). | Aplicada como base (27 oct 2026) con la API de fuentes de Astro y Fontsource; se revisa en la fase de diseño. |
| Solo tema oscuro en la primera versión. | Propuesta; tema claro queda como ampliación. |
| Primera versión con una página y secciones. | Aplicada (estructura de PR #11 en adelante). |
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
| Stack Next.js (App Router) + React + TypeScript. | Astro + React + TypeScript (25 oct 2026), antes de escribir código. |
| Proteger `main` en GitHub y configurar `pull.ff only`. | Sin protección: solo se sigue el flujo de ramas y PR (25 oct 2026). |

## Cómo registrar nuevas decisiones

Añade fecha, decisión, motivo y consecuencias relevantes. Identifica si está acordada, propuesta o sustituida. Cuando Manuel cambie una decisión, marca la anterior como sustituida y registra la nueva para que las siguientes IA no la recuperen por error.

No registres como decisión aprobada una preferencia de la IA que Manuel no haya confirmado.
