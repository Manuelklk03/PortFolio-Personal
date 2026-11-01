# Changelog

Este archivo recoge cambios relevantes completados. Las tareas futuras están en [docs/TAREAS.md](docs/TAREAS.md).

Sigue la organización de [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), con apartados como Añadido, Cambiado y Corregido cuando tengan contenido.

## Sin publicar

### Añadido

- 2026-10-24: documentación inicial del proyecto (`AGENTS.md`, `CLAUDE.md`, `docs/`), modo de trabajo, flujo de GitHub y criterios para elegir plugins de Claude Code.
- 2026-10-24: `.claude/settings.json` con los plugins del proyecto, inventario en `docs/HERRAMIENTAS.md` y `.gitignore`.
- 2026-10-25: base del proyecto con Astro 7, React 19, Tailwind 4 y TypeScript estricto; comprobación de tipos con `npm run check`.
- 2026-10-25: reglas de código adaptadas a Astro, coordinación Claude + Codex en `CLAUDE.md` y README corregido.
- 2026-10-27: layout base `src/layouts/Layout.astro` (`lang="es"`, título, descripción, favicon y estilos de Tailwind) usado en la página de inicio.
- 2026-10-27: Prettier con `prettier-plugin-astro` para formatear los `.astro` en VS Code al guardar.
- 2026-10-27: paleta oscura como tema de Tailwind (`@theme`) y tipografía Geist / Geist Mono servida desde la propia web con la API de fuentes de Astro.
- 2026-10-28 a 2026-10-30: secciones con contenido de prueba, tarjetas de proyectos, SEO, página 404, shadcn/ui, Lenis, GSAP, componentes de React Bits y cursor personalizado (PR #12 a #26).
- 2026-10-31: inicio ASCII con un nudo 3D de Three.js dibujado con caracteres que sigue al ratón y el nombre en ASCII (figlet) que se descifra; paleta Abyss + Jade.
- 2026-10-31: el nudo 3D del fondo gira solo (ya no sigue al ratón) y tiene botón para pausarlo.
- 2026-10-31: rediseño «terminal elegante»: nombre con partículas ASCII interactivas, cursor en bloque, títulos con prompt, tarjetas tipo ventana de terminal, sección de currículum, contacto con correo, GitHub y LinkedIn, y colores más intensos.

### Corregido

- 2026-10-31: imágenes de proyectos (eran SVG con extensión `.jpg`) y paquetes sin uso eliminados.
- 2026-10-31: revisión de UI: los scripts del layout y de la página ahora se empaquetan (antes `type="module"` los dejaba sin procesar), entradas de sección sin GSAP que ya no ocultan contenido al volver hacia arriba, cabecera no fija y enlaces de 44 px en móvil, CV solo cuando hay PDF, botón de pausa más claro, sin `console.log` ni `window as any`.
- 2026-10-31: proyectos como listado `ls -l`, «Sobre mí» con datos reales en formato clave-valor, tecnologías como listado, títulos de sección tipo comando, nudo 3D a la derecha y menos brillos.
- 2026-11-01: ASCII en toda la página: franja de transición del inicio, prompt vivo y barra de scroll en la cabecera, «Sobre mí» estilo neofetch con retrato ASCII, firmas de proyecto en ANSI Shadow, hover de selección de terminal, contacto en filas, 404 de terminal y sin esquinas redondeadas.
- 2026-11-01: retrato ASCII de Manuel en «Sobre mí», generado al compilar desde su foto.
- 2026-11-01: el retrato empieza en ASCII y la foto (sin fondo y en tonos jade) se monta fila a fila al llegar a «Sobre mí».
- 2026-11-01: el retrato mezcla el color real de la foto con el tono jade y se funde con el fondo (bordes ovalados difuminados y modo de fusión «lighten»).
- 2026-11-01: el retrato muestra más torso y más color real (70 %), para que se vea como una foto y no como una cara estampada.
- 2026-11-01: currículum en PDF con visor y descarga, y sección Stack con las tecnologías reales del CV.
- 2026-11-01: vista previa del CV integrada en el diseño (pdf.js) en lugar del visor de PDF del navegador.
