# Estado actual y relevo

Última actualización: 9 de noviembre de 2026.
Última sesión: favicon de Neo y corrección de la URL canónica de `manuelcasinos.dev` a `manuelcasinos.es`.

**Dominio:** `manuelcasinos.es` figura como «Valid Configuration» en Vercel y está conectado a Production. OVH conserva el DNS; el registro A de `@` apunta a `216.198.79.1`. `www` todavía apunta a OVH (`213.186.33.5`): para usarlo, añadir `www.manuelcasinos.es` al proyecto de Vercel y sustituir ese A por el CNAME exacto que muestre Vercel. La nueva URL de Astro se publicará tras el despliegue del cambio.

## Resumen del estado real

La web tiene la estructura completa de una página con diseño ASCII art y terminal elegante: cabecera con navegación, nudo 3D ASCII, partículas del nombre interactivas, sobre mí con retrato ASCII + mosaico enfocado, proyectos reales como tarjetas que enlazan a su página de detalle (`/proyectos/<id>`), stack técnico con logos flotantes que toman su color de marca al seleccionarlos, terminal interactiva ejecutable con comandos, visor de CV en PDF integrado y contacto.

**Cambio del 9 nov:** `public/favicon.svg`, `public/favicon.ico` y `public/apple-touch-icon.png` comparten un retrato vectorial de Neo simplificado para leerse a 16 px. El layout ya enlazaba los tres archivos, así que no necesitó cambios.

**Cambios del 8 nov (rama `feature/textos-que-hago-practicas`):** textos de «Sobre mí» y «ls que-hago/» nuevos; prácticas de Bonatel y App Informática (Patraix, 2023-2024) en una fila; orden final inicio, sobre mí, stack, proyectos, CV, contacto y terminal; páginas de proyecto con portada entera y carrusel de capturas a todo el ancho (solo Cerrajería NOA lo tiene relleno); portadas de Digital Fit y ValveDex; textos de proyecto nuevos y Digital Fit con PostgreSQL; `vercel.json` y `trailingSlash: "never"`.

**Nueva funcionalidad (3 nov):**
- **Morfeo en estarcido** (imagen generada por Codex para Manuel, `public/intro/morpheus.webp`, con el negro convertido en transparencia) sobre una lluvia de código de Matrix, con dos **píldoras en cápsula CSS** en las palmas: caen con rebote al abrir, flotan y laten, la que se apunta crece y la otra se atenúa, y al elegir su color inunda la pantalla antes de cambiar el tema.
- **Sin tema hasta elegir:** la web arranca en modo neutro (grises, `data-theme="neutral"`); omitir o Esc aplica la píldora azul.
- **Tema Matrix Phosphor (Píldora Roja):** activa la realidad verde fósforo de terminal (`#00FF66`, fondos `#030804`, bordes `#133a18`, brillo y luz radial verde).
- **Tema Abyss + Jade (Píldora Azul):** mantiene el tema base azul abismo y jade cian.
- **Persistencia y reactividad:** elección guardada en `localStorage`, script inline temprano en `<head>` para evitar parpadeos (FOUC), eventos reactivos para sincronizar las partículas del nombre en vivo, enlace `./pill` en la cabecera y comandos `pill`, `matrix` y `theme` en la terminal.

## Modo de trabajo

- **Modo plan:** cada paso o bloque grande se explica en texto (qué, por qué, archivos, comprobación).
- **Modo auto:** solo documentación o lo que Manuel pida expresamente.
- Terminal: **Git Bash**.
- Flujo de GitHub: ramas de feature, Conventional Commits y PR.

## Git

- Las PR #70 (`feature/textos-que-hago-practicas`) y #71 (`feature/favicon-neo`) están fusionadas en `main`. El cambio de dominio se trabaja en la PR #72 (`fix/dominio-es`).

## Comprobaciones (8-9 nov)

- `npm run check` (diagnóstico Astro y TypeScript) → 0 errores, 0 warnings, 0 hints.
- Lighthouse sobre el build (móvil / escritorio): inicio rendimiento 97 / 99, accesibilidad 100, SEO 100; Cerrajería NOA 97 / 100. LCP móvil 2,4-2,5 s (al límite). Sin desbordamiento horizontal a 1440, 768 y 390 px. Sin secretos ni vulnerabilidades (`npm audit` 0).
- `npm run build` → 5 páginas estáticas (`/`, `/404` y `/proyectos/<id>` ×3) compiladas limpiamente.
- Accesibilidad: `<dialog>` nativo, atajos de teclado (`R` roja, `A`/`B` azul, `Esc` salir), botón omitir, foco atrapado y bloqueo de scroll de fondo mientras el diálogo está abierto.
- Favicon (9 nov): inspección visual a 16, 32 y 512 px; `npm run check` sin diagnósticos; `npm run build` completo con las 6 fuentes descargadas. Persiste el aviso conocido del chunk de Three.js superior a 500 KB.

## Problemas conocidos

- `vercel.json` (cabeceras, URLs sin barra) no está probado hasta desplegar. Sin CSP: el script inline del tema en `Layout.astro` la complica.
- Sin ESLint ni SonarQube todavía.
- Chrome no está instalado en este equipo: las capturas se hacen con el Chromium de Playwright (`npx playwright install chromium`; script en el scratchpad con `chromium.launch()`).
- El proyecto no tiene tipos de Node (`@types/node`): no se puede importar `node:fs` en componentes.
- No editar archivos con `Set-Content` de PowerShell 5.1: añade BOM y puede romper el frontmatter de Astro.
- En Windows PowerShell, invocar `npm.cmd` en lugar del alias `.ps1` si las execution policies del sistema bloquean scripts locales.

## Datos o decisiones pendientes de Manuel

- ¿ValveDex usa Three.js / React Three Fiber? (solo afecta a `docs/HERRAMIENTAS.md`).

## Próximo paso concreto

1. Integrar el cambio de dominio `.es`, configurar `www` en Vercel y OVH y comprobar HTTPS, redirección a la raíz y URLs canónicas tras el despliegue.
2. Capturas por secciones de Digital Fit y ValveDex (`gallery` en `src/data/projects.ts`) cuando haya demo o capturas.
3. Dato pendiente de Manuel: nombre exacto del ciclo de las prácticas de 2023-2024.
4. ESLint + `npm run lint` y SonarQube; pasada de SEO de contenido con claude-seo.
