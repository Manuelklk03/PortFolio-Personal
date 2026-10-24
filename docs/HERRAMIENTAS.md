# Herramientas, plugins y librerías

Este archivo lo mantiene la IA que trabaje en el proyecto. Recoge qué herramientas hay, para qué fase sirven y cómo quedaron integradas. Se actualiza conforme avanza el proyecto.

## Plugins, skills y MCP de Claude Code

Inventario del 24 de octubre de 2026, aprobado por Manuel. Se aplica en `.claude/settings.json`: los valores del proyecto mandan sobre la configuración global de Manuel, así que lo desactivado aquí sigue activo en sus otros proyectos.

| Nombre | Tipo | Para qué sirve aquí y cuándo usarlo | Fase | Estado |
| --- | --- | --- | --- | --- |
| codex (`openai-codex`) | plugin + agente | Segunda opinión de Codex: `/codex:review` o `/codex:adversarial-review` sobre planes y diffs antes de cada PR; `/codex:rescue` para diagnósticos. Solo revisa o investiga; no implementa por su cuenta. | Todas | activo |
| grill-me | skill | Preguntas antes de decidir estructura o datos (una página o varias, campos de proyectos). | Todas | activo |
| andrej-karpathy-skills | skill | Cambios pequeños, sin extras ni refactorizaciones no pedidas. | Todas | activo |
| claude-code-setup | skill | Revisar esta configuración de Claude Code. Sus propuestas requieren aprobación. | Al cambiar de fase | activo |
| caveman | plugin (hooks) | Recorta las explicaciones; choca con el modo plan. | — | desactivado |
| ponytail | plugin (hooks) | Respuestas muy escuetas; karpathy ya cubre «no añadir lo no pedido». | — | desactivado |
| claude-mem | plugin (memoria) | Memoria propia que compite con `docs/` como punto de relevo. | — | desactivado |
| superpowers | plugin (skills de proceso) | Impone su flujo (subagentes que implementan, worktrees, TDD, commits); incompatible con el modo plan. | — | desactivado |
| frontend-stack | skill router | Decide qué skill de diseño lidera cada parte. | 3b (y paleta en 1) | desactivado hasta esa fase |
| frontend-design | skill | Lidera la dirección visual y la tipografía. | 3b | desactivado hasta esa fase |
| impeccable | skill + agentes | Auditoría de accesibilidad y pulido de la UI. | 3b y 4 | desactivado hasta esa fase |
| emil-design-eng | skill | Lidera el movimiento (GSAP, Lenis) y su revisión. | 3b | desactivado hasta esa fase |
| ui-ux-pro-max | skill | Apoyo para shadcn/ui y tokens de color. | 3b | desactivado hasta esa fase |
| taste | skill | Se solapa con frontend-design. | — | desactivado |
| imagegen-skills | skill | No hace falta; si se necesita una imagen, Codex tiene la skill `imagegen`. | — | desactivado |
| antislop | skill | Revisión de textos visibles y de UI genérica. | 2 y 4 | desactivado hasta esa fase |
| headroom | plugin | Ya desactivado globalmente; no aporta aquí. | — | desactivado |

Estados posibles: activo, desactivado, desactivado hasta esa fase, por instalar, no aplica.

Reparto en la fase de diseño: frontend-stack decide quién lidera cada parte; frontend-design lleva la dirección visual y la tipografía, emil-design-eng el movimiento, ui-ux-pro-max apoya con shadcn/ui y el color, e impeccable audita.

Skills de Codex útiles para revisar (en `~/.agents/skills`, las usa Codex): `vercel-react-best-practices` (Next.js), `web-design-guidelines` (accesibilidad y UX), `playwright` y `agent-browser` (comprobar en el navegador). Codex: CLI 0.164.0, sesión con ChatGPT; la «review gate» de `/codex:setup` está desactivada.

## Librerías previstas para la fase de diseño

Manuel quiere usar estas librerías cuando se llegue a la fase de diseño y animación. Cada una se instala en el paso en que se usa por primera vez, explicando para qué sirve; nada «por si acaso». Antes de instalar, consultar la documentación oficial actual y confirmar con Manuel; registrar después la versión real y cómo se integró.

| Librería | Para qué | Notas de integración |
| --- | --- | --- |
| shadcn/ui | Componentes accesibles (botones, diálogos, menús…) que se copian al proyecto y se estilan con Tailwind. | Se inicializa con su CLI. Su tema usa variables CSS: adaptarlas a la paleta del portfolio en lugar de mantener dos sistemas de colores. Añadir solo los componentes que se usen. |
| React Bits | Componentes animados y efectos de texto/fondo para dar personalidad. | Elegir la variante TypeScript + Tailwind. Se copian componentes concretos (se pueden añadir con el CLI de shadcn). Usar pocos y con intención; revisar sus dependencias antes de añadir cada uno. |
| GSAP | Animaciones (entrada de secciones, scroll con ScrollTrigger, texto). | En React usar el paquete `@gsap/react` y su hook `useGSAP` para limpiar animaciones. Los componentes con GSAP son de cliente (`"use client"`). Registrar los plugins de GSAP que se usen. |
| Three.js + React Three Fiber (+ drei) | Escenas 3D. Su uso en ValveDex está pendiente de confirmar; aquí solo si Manuel lo decide. | Pesadas: cargar solo donde se usen. |
| Lenis | Scroll suave. | Integración React disponible en el propio paquete. Si se usa con GSAP ScrollTrigger, sincronizarlos (Lenis debe avisar a ScrollTrigger en cada scroll). Comprobar que los enlaces a secciones (`#proyectos`…) siguen funcionando. |

Criterios comunes:

- Respetar `prefers-reduced-motion`: sin scroll suave ni animaciones grandes si el usuario lo pide.
- El contenido debe verse y funcionar aunque falle una animación (no ocultar texto que solo aparezca con JavaScript sin alternativa).
- Comprobar rendimiento en móvil tras añadir cada librería.
- Mantener las animaciones al servicio del contenido: el portfolio es para mostrar proyectos.

## Integraciones realizadas

_(Vacío. Al instalar algo, anotar aquí la versión, archivos donde se configura y cualquier detalle o problema que la siguiente IA deba conocer.)_
