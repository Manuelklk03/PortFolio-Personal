# Herramientas, plugins y librerías

Este archivo lo mantiene la IA que trabaje en el proyecto. Recoge qué herramientas hay, para qué fase sirven y cómo quedaron integradas. Se actualiza conforme avanza el proyecto.

## Plugins, skills y MCP de Claude Code

Inventario del 24 de octubre de 2026, aprobado por Manuel. Se aplica en `.claude/settings.json`: los valores del proyecto mandan sobre la configuración global de Manuel, así que lo desactivado aquí sigue activo en sus otros proyectos.

| Nombre | Tipo | Para qué sirve aquí y cuándo usarlo | Fase | Estado |
| --- | --- | --- | --- | --- |
| codex (`openai-codex`) | plugin + agente | Segunda opinión de Codex: `/codex:review` o `/codex:adversarial-review` sobre planes y diffs antes de cada PR; `/codex:rescue` para diagnósticos. Solo revisa o investiga; no implementa por su cuenta. | Todas | activo |
| grill-me | skill | Cuestionario que pregunta a Manuel cómo funciona el código del repositorio, para comprobar que lo entiende. No sirve para tomar decisiones. Ofrecerlo después de cada paso con código. | Desde la base | activo |
| andrej-karpathy-skills | skill | Cambios pequeños, sin extras ni refactorizaciones no pedidas. | Todas | activo |
| claude-code-setup | skill | Revisar esta configuración de Claude Code. Sus propuestas requieren aprobación. | Al cambiar de fase | activo |
| caveman | plugin (hooks) | Recorta las explicaciones; choca con el modo plan. | — | desactivado |
| ponytail | plugin (hooks) | Respuestas muy escuetas; karpathy ya cubre «no añadir lo no pedido». | — | desactivado |
| claude-mem | plugin (memoria) | Memoria propia que compite con `docs/` como punto de relevo. | — | desactivado |
| superpowers | plugin (skills de proceso) | Impone su flujo (subagentes que implementan, worktrees, TDD, commits); incompatible con el modo plan. | — | desactivado |
| frontend-stack | skill router | Decide qué skill de diseño lidera cada parte. | 3b (y paleta en 1) | activo (31 oct) |
| frontend-design | skill | Lidera la dirección visual y la tipografía. | 3b | activo (31 oct) |
| impeccable | skill + agentes | Auditoría de accesibilidad y pulido de la UI. | 3b y 4 | activo (31 oct) |
| emil-design-eng | skill | Lidera el movimiento (GSAP, Lenis) y su revisión. | 3b | activo (31 oct) |
| ui-ux-pro-max | skill | Apoyo para shadcn/ui y tokens de color. | 3b | activo (31 oct) |
| taste | skill | Se solapa con frontend-design. | — | desactivado |
| imagegen-skills | skill | No hace falta; si se necesita una imagen, Codex tiene la skill `imagegen`. | — | desactivado |
| antislop | skill | Revisión de textos visibles y de UI genérica. | 2 y 4 | activo (31 oct) |
| headroom | plugin | Ya desactivado globalmente; no aporta aquí. | — | desactivado |
| chrome-devtools-mcp | plugin (MCP) | Comprobar cada paso en el navegador: móvil, teclado, consola y rendimiento. | Todas | activo |
| vercel | plugin | Despliegue en Vercel, solo si se elige como alojamiento. | 4 | desactivado hasta esa fase |
| oh-my-claudecode | plugin | Impone su flujo (orquestación y modos automáticos); choca con el modo plan. Sin configurar. | — | desactivado |
| mempalace | plugin (memoria) | Memoria propia que compite con `docs/`, como claude-mem. | — | desactivado |
| supabase | plugin | El portfolio no tiene backend ni base de datos. | — | desactivado |

Skills globales sin plugin (27 oct 2026): Task Observer y Graphify no se usan (repositorio pequeño: construir el grafo cuesta más tokens de los que ahorra; reconsiderar si crece). SkillUI y Claudex solo si un paso los necesita, comprobando antes que funcionan.

Skills globales de GSAP (`gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-performance`…), `make-interfaces-feel-better`, `transitions-dev` y las de Chrome DevTools (`a11y-debugging`, `debug-optimize-lcp`) están disponibles y se usan en la fase de diseño cuando encajen.

Estados posibles: activo, desactivado, desactivado hasta esa fase, por instalar, no aplica.

Reparto en la fase de diseño: frontend-stack decide quién lidera cada parte; frontend-design lleva la dirección visual y la tipografía, emil-design-eng el movimiento, ui-ux-pro-max apoya con shadcn/ui y el color, e impeccable audita.

Skills de Codex útiles para revisar (en `~/.agents/skills`, las usa Codex): `vercel-react-best-practices` (solo para las islas de React; sus reglas de Next.js no aplican), `web-design-guidelines` (accesibilidad y UX), `playwright` y `agent-browser` (comprobar en el navegador). `token-efficient-workflow` en todos los encargos. Codex: CLI 0.164.0, sesión con ChatGPT; la «review gate» de `/codex:setup` está desactivada.

Claude usa su skill `token-efficiency` (global, en `~/.claude/skills`) en todas las sesiones, y en cada encargo pide a Codex `token-efficient-workflow`. Formato de cada paso en modo plan: explicación, archivos, qué hace Manuel, comprobación y, al final del mismo paso, el mensaje de commit y los comandos de GitHub Flow; no se repiten después (petición de Manuel, 27 oct 2026).

Claudex (`BeamoINT/Claudex` 1.6.4, instalado por Manuel fuera del proyecto) lanza Claude Code a través de un proxy local con modelos de ChatGPT y expone las skills de Codex. Es una herramienta de terceros: copia la sesión de ChatGPT a su carpeta, se actualiza sola y arranca con permisos en modo `auto`. Las sesiones normales de Claude Code no lo usan; la coordinación con Codex se hace con el plugin `codex`.

## Librerías previstas para la fase de diseño

Manuel quiere usar estas librerías cuando se llegue a la fase de diseño y animación. Cada una se instala en el paso en que se usa por primera vez, explicando para qué sirve; nada «por si acaso». Antes de instalar, consultar la documentación oficial actual y confirmar con Manuel; registrar después la versión real y cómo se integró.

| Librería | Para qué | Notas de integración |
| --- | --- | --- |
| shadcn/ui | Componentes accesibles (botones, diálogos, menús…) que se copian al proyecto y se estilan con Tailwind. | Tiene guía de instalación para Astro: sus componentes son de React y se usan como islas solo si son interactivos. Se inicializa con su CLI. Su tema usa variables CSS: adaptarlas a la paleta del portfolio en lugar de mantener dos sistemas de colores. Añadir solo los componentes que se usen. |
| React Bits | Componentes animados y efectos de texto/fondo para dar personalidad. | Elegir la variante TypeScript + Tailwind. Se copian componentes concretos (se pueden añadir con el CLI de shadcn). Usar pocos y con intención; revisar sus dependencias antes de añadir cada uno. |
| GSAP | Animaciones (entrada de secciones, scroll con ScrollTrigger, texto). | En Astro, para animar HTML estático basta un `<script>` en el componente `.astro`. Dentro de islas de React, usar `@gsap/react` y su hook `useGSAP` para limpiar las animaciones. Registrar los plugins de GSAP que se usen. |
| Three.js + React Three Fiber (+ drei) | Escenas 3D. Su uso en ValveDex está pendiente de confirmar; aquí solo si Manuel lo decide. | Pesadas: cargar solo donde se usen. |
| Lenis | Scroll suave. | En Astro se inicia en un `<script>` del layout (no necesita React). Si se usa con GSAP ScrollTrigger, sincronizarlos (Lenis debe avisar a ScrollTrigger en cada scroll). Comprobar que los enlaces a secciones (`#proyectos`…) siguen funcionando. |

Criterios comunes:

- Respetar `prefers-reduced-motion`: sin scroll suave ni animaciones grandes si el usuario lo pide.
- El contenido debe verse y funcionar aunque falle una animación (no ocultar texto que solo aparezca con JavaScript sin alternativa).
- Comprobar rendimiento en móvil tras añadir cada librería.
- Mantener las animaciones al servicio del contenido: el portfolio es para mostrar proyectos.

## Integraciones realizadas

Base creada el 25 de octubre de 2026 (rama `chore/project-setup`). Versiones reales de `package.json`:

| Paquete | Versión | Dónde se configura | Notas |
| --- | --- | --- | --- |
| astro | ^7.4.2 | `astro.config.mjs` | Creado con `npm create astro@latest portfolio-base -- --template minimal --no-install --no-git --no-ai --skip-houston --yes` en una carpeta temporal y copiado al repositorio. `--no-ai` evita que cree su propio `AGENTS.md`. Requiere Node >= 22.23.4. Servidor de desarrollo en el puerto 4321. |
| @astrojs/react + react / react-dom | ^7.1.1 / ^19.3.1 | `astro.config.mjs` (`integrations`), `tsconfig.json` (`jsx`) | Añadido con `npx astro add react`. |
| tailwindcss + @tailwindcss/vite | ^4.3.3 | `astro.config.mjs` (`vite.plugins`), `src/styles/global.css` | Añadido con `npx astro add tailwind`. Tailwind 4: sin `tailwind.config`; el tema se define en CSS. `global.css` se importa en el frontmatter de `src/layouts/Layout.astro`, así que llega a toda página que use el layout. |
| @astrojs/check + typescript | ^0.9.12 / ^6.0.3 | script `check` | Comprobación de tipos de `.astro` (`npm run check`). |
| Fuentes Geist y Geist Mono | Fontsource (proveedor de la API de fuentes de Astro) | `astro.config.mjs` (`fonts`), `<Font />` en `Layout.astro`, `@theme inline` en `global.css` | Sin dependencia npm: Astro descarga las fuentes al compilar y las sirve desde `/_astro/fonts/`. Pesos 400–700 (Geist) y 400–500 (Mono), subconjunto `latin`. Solo Geist con `preload`. Los cambios en `astro.config.mjs` requieren reiniciar `npm run dev`. |
| prettier + prettier-plugin-astro | 3.9.10 / 1.1.2 (exactas) | `.prettierrc`, `.vscode/settings.json` | Formateo, añadido el 27 oct 2026 según la guía de Astro (`npm install --save-dev --save-exact …`). `.vscode/settings.json` hace que la extensión de Prettier formatee los `.astro`. Formatear todo: `npx prettier . --write`. `"endOfLine": "auto"`: con `core.autocrlf=true` Git guarda LF y la carpeta tiene CRLF; sin esa opción Prettier marca todos los archivos. Sin `prettier-plugin-tailwindcss` por ahora; si se añade, va el último en `plugins`. |
| shadcn/ui (base) | clsx ^2.1.1, tailwind-merge ^3.7.0, class-variance-authority ^0.7.1 | `components.json`, `src/lib/utils.ts`, `src/components/ui/`, variables en `global.css` | Componentes con el CLI (`npx shadcn@latest add …`); el CLI no se instala como dependencia. Alias `@/` en `tsconfig.json`. |
| GSAP + @gsap/react | ^3.15.0 / ^2.1.2 | `src/scripts/animations.ts`, `src/scripts/scroll-trigger.ts`, islas de React | Respetan `prefers-reduced-motion`. |
| Lenis | ^1.3.27 | `src/scripts/lenis.ts`, `<script>` del layout | Se desactiva con `prefers-reduced-motion`; sincronizado con ScrollTrigger. |
| React Bits (copiados) | — | `src/components/react-bits/` | Ninguno en uso: `OrbitingBalls`, `TextReveal`, `CustomCursor` y `MagneticButton` se sustituyeron el 31 oct por componentes `.astro` con `<script>` (efectos ASCII y `Cursor.astro`). También se quitó `src/components/ui/button.tsx`, que no aplicaba estilos con `asChild`. |
| three + @types/three | ^0.187.0 | `src/scripts/ascii-scene.ts`, `src/components/ascii/AsciiScene.astro` | Nudo 3D dibujado con `AsciiEffect` (`three/addons/effects/AsciiEffect.js`). Se importa con `import()` al entrar el inicio en pantalla: chunk propio (~534 KB sin comprimir); el aviso de tamaño del build es esperado. Chrome avisa de `willReadFrequently`: viene de dentro de `AsciiEffect`. |
| figlet | ^1.12.0 | `src/components/ascii/AsciiName.astro` | Solo al compilar (frontmatter): genera el nombre en ASCII con la fuente `ANSI Shadow` (`figlet/importable-fonts/ANSI Shadow.js` + `parseFont`, sin `fs`). No llega al navegador. |

`astro add` instaló `@types/react` y `@types/react-dom` en `dependencies` en vez de `devDependencies`; no afecta a la web generada. Astro recoge telemetría anónima; se desactiva con `npx astro telemetry disable` si Manuel quiere.

El 31 oct 2026 se desinstalaron paquetes sin uso: `cn` (la función `cn` está en `src/lib/utils.ts`), `@fontsource-variable/geist` (las fuentes van por la API de Astro), `@base-ui/react`, `tw-animate-css`, `lucide-react` y `shadcn` (se usa con `npx`). Si un componente de shadcn los necesita, el CLI los vuelve a instalar.
