# Tareas del portfolio

`[x]` significa completado y comprobado; `[ ]` significa pendiente. Los bloques son un plan propuesto y pueden ajustarse al acordar el alcance.

## 0. Continuidad

- [x] Preparar las instrucciones y los documentos iniciales.
- [x] Crear el repositorio en GitHub y clonarlo (con README creado desde GitHub).
- [x] Subir la documentación por la rama `docs/initial-docs` y PR a `main`.
- [x] `gh` instalado y autenticado (comprobado: 2.96.0, cuenta `Manuelklk03`).
- [x] Inventariar y analizar plugins y skills, rellenar `docs/HERRAMIENTAS.md` y crear `.claude/settings.json` con lo que apruebe Manuel.
- [x] Añadir `.claude/settings.local.json` al `.gitignore`.

## 1. Base y diseño

- [x] Comprobar si ya hay código (confirmado: se empieza de cero).
- [x] Acordar stack: Astro + React + TypeScript + Tailwind (sustituye a Next.js, 25 oct 2026).
- [x] Confirmar gestor de paquetes: npm.
- [ ] Acordar estructura de páginas (propuesta: una página con secciones).
- [x] Acordar dirección visual: oscura y técnica.
- [ ] Aprobar paleta y tipografía propuestas al verlas aplicadas.
- [x] Crear la base Astro + React + Tailwind en `chore/project-setup`, combinando el `.gitignore` (verificado: `astro check` y `build` sin errores).
- [x] Corregir `README.md` en esa misma rama (restos de chat, formato, enlaces, stack acordado).
- [x] Crear el layout base (`src/layouts/Layout.astro`) con `lang="es"`, metadatos y la importación de `global.css` (verificado: `check`, `build` y clase de Tailwind en el CSS generado).
- [x] Registrar comandos reales y decisiones acordadas.

## 2. Contenido

- [ ] Revisar la presentación personal con Manuel.
- [ ] Elegir los proyectos de la primera versión.
- [ ] Confirmar tecnologías, aportación y estado de cada proyecto.
- [ ] Reunir capturas y verificar los enlaces disponibles.
- [ ] Confirmar si se publicarán correo y CV, y obtener los archivos necesarios.

## 3. Primera versión

- [ ] Crear navegación y presentación de inicio.
- [ ] Crear sección sobre mí.
- [ ] Crear sección de proyectos a partir de datos locales (depende de aprobar esa propuesta en `docs/DECISIONES.md`).
- [ ] Crear sección de tecnologías con niveles descritos de forma honesta.
- [ ] Crear contacto y pie de página.
- [ ] Adaptar el diseño a móvil, tablet y escritorio.

## 3b. Diseño y animación

- [ ] Revisar el inventario de herramientas y activar las de diseño.
- [ ] Instalar e integrar shadcn/ui adaptando su tema a la paleta.
- [ ] Integrar Lenis (scroll suave) respetando `prefers-reduced-motion`.
- [ ] Integrar GSAP para animaciones de secciones (en `<script>` de Astro o en islas de React, según el caso).
- [ ] Elegir y adaptar componentes de React Bits con intención.
- [ ] Comprobar rendimiento, accesibilidad y enlaces internos tras las animaciones.

## 4. Revisión y publicación

- [ ] Revisar textos, imágenes y estados de proyectos.
- [ ] Comprobar enlaces y navegación con teclado.
- [ ] Revisar contraste, foco, estructura semántica y textos alternativos.
- [ ] Configurar título, descripción e icono de la web.
- [ ] Ejecutar los scripts de comprobación disponibles y resolver errores.
- [ ] Elegir alojamiento y publicar cuando Manuel lo indique.
- [ ] Comprobar la URL publicada y actualizar la documentación.

## Posibles ampliaciones, fuera de la primera versión

- Páginas de detalle para proyectos.
- Segundo idioma.
- Tema claro y oscuro.
- Formulario de contacto con envío real, si se decide que hace falta.

Estas ampliaciones no están aprobadas ni deben retrasar la primera versión.
