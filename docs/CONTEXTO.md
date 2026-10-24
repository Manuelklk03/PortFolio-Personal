# Contexto del portfolio

## Objetivo confirmado

Manuel quiere empezar su portfolio personal para mostrar sus proyectos. Lo desarrollará principalmente con Claude Code, aprovechando sus plugins, y quiere poder continuarlo también en ChatGPT o Codex sin perder el contexto.

El portfolio debe ayudar a explicar qué sabe hacer, qué ha desarrollado y dónde se pueden consultar sus trabajos. No hace falta subir el código de los proyectos al propio portfolio: se pueden mostrar fichas, capturas y enlaces a sus repositorios o demos.

## Alcance propuesto para la primera versión

- Inicio: nombre, presentación breve y acceso a proyectos y contacto.
- Sobre mí: formación, conocimientos y aprendizaje por cuenta propia.
- Proyectos: tarjetas con imagen, descripción, tecnologías, estado y enlaces disponibles.
- Tecnologías: separar conocimientos base de tecnologías que está aprendiendo.
- Contacto: GitHub, LinkedIn y correo cuando Manuel lo facilite.
- CV: enlace opcional cuando se disponga del archivo final que Manuel quiera publicar.

Esta estructura es una propuesta inicial, no un diseño aprobado. Se puede resolver con una sola página. Las páginas de detalle son una ampliación si aportan información útil.

## Base técnica acordada

Next.js (App Router) + React + TypeScript, con Tailwind CSS para los estilos. El proyecto se crea desde cero con `create-next-app` (código en `src/`, alias `@/*`, ESLint) dentro de un repositorio de GitHub ya creado y clonado, que solo contiene el README y la documentación. Ver `docs/DECISIONES.md`.

Gestor de paquetes propuesto: npm. Las versiones de las dependencias se toman de las que instale `create-next-app` y se registran tras revisar `package.json`. No copiar versiones de otros proyectos por suposición. Alojamiento y dominio: sin elegir.

Para la primera versión se propone un contenido estático, sin login, base de datos ni panel de administración. Los proyectos podrían mantenerse en un archivo de datos con estos campos:

`id`, `titulo`, `descripcion`, `tecnologias`, `estado`, `imagen`, `repositorio`, `demo`, `aportacionPersonal`.

Son nombres conceptuales: en el código los identificadores van en inglés (ver `AGENTS.md` y la propuesta en `docs/DECISIONES.md`).

Los enlaces o imágenes que falten deben omitirse en la interfaz publicada hasta disponer de ellos. No crear botones que no funcionen.

## Diseño

Dirección acordada: oscura y técnica, limpia, legible y adaptable a móvil. Los colores de la web de cerrajería no son los colores del portfolio.

Propuesta pendiente de aprobar al verla aplicada:

- Fondo `#0B0F14`, superficies `#121821`, bordes `#1F2937`.
- Texto `#E6EDF3`, texto secundario `#8B949E`, acento `#22D3EE`.
- Tipografía Geist para el texto y Geist Mono para detalles técnicos (etiquetas, estados), cargadas con `next/font`.
- Solo tema oscuro en la primera versión.

En la fase de diseño, Manuel quiere usar shadcn/ui, React Bits, GSAP y Lenis para componentes, animaciones y scroll suave. Detalles y criterios en `docs/HERRAMIENTAS.md`.

## Criterios para dar la primera versión por lista

- Contenido real revisado por Manuel, sin datos inventados.
- Proyectos y enlaces disponibles bien identificados.
- Uso cómodo en móvil y escritorio.
- Navegación y contacto funcionando.
- Imágenes con texto alternativo y foco visible al usar teclado.
- Sin errores conocidos en las comprobaciones disponibles del proyecto.
- Documentación actualizada y despliegue comprobado cuando se decida publicarlo.
