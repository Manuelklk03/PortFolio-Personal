// Proyectos reales de Manuel (datos confirmados en docs/PROYECTOS.md y por Manuel, nov. 2026).
export interface ProjectImage {
  // Ruta dentro de public/ (capturas de 1200x750, mejor en .webp).
  src: string;
  // Descripción de lo que se ve, para lectores de pantalla.
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  // Siglas que se dibujan en letras de bloque junto al proyecto (2-4 caracteres).
  monogram: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  image?: string;
  // Más capturas para el carrusel de la página de detalle (opcional; sin ellas no se muestra).
  gallery?: ProjectImage[];
  // Imagen para compartir en redes (JPG de 1200x630); sin ella se usa la general del sitio.
  ogImage?: string;
  repo?: string;
  demo?: string;
  personalContribution: string;
  // Funcionalidades que se listan en la página de detalle (opcional).
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "cerrajeria-noa",
    title: "Cerrajería NOA",
    monogram: "NOA",
    description:
      "Web de una cerrajería de Valencia con servicio a domicilio las 24 horas. Enseña los servicios y los trabajos realizados, está en español, valenciano e inglés, y permite llamar o escribir por WhatsApp en un toque.",
    technologies: ["Next.js", "React"],
    status: "completed",
    image: "/projects/cerrajeria-noa.webp",
    gallery: [
      {
        src: "/projects/cerrajeria-noa-servicios.webp",
        alt: "Sección de servicios de Cerrajería NOA, con tarjetas de apertura de puertas y cambio de bombín y cerradura",
      },
      {
        src: "/projects/cerrajeria-noa-trabajos.webp",
        alt: "Sección de trabajos realizados de Cerrajería NOA, con fotos de aperturas y persianas",
      },
      {
        src: "/projects/cerrajeria-noa-cobertura.webp",
        alt: "Sección de zona de cobertura de Cerrajería NOA, con el servicio a domicilio en Valencia y alrededores",
      },
    ],
    ogImage: "/projects/cerrajeria-noa-og.jpg",
    demo: "https://cerrajerianoa.es/es",
    personalContribution:
      "La hice entera para un cliente real: diseño, desarrollo, los tres idiomas, el mapa, el botón de WhatsApp y la publicación en su propio dominio (cerrajerianoa.es).",
    features: [
      "Servicios y trabajos realizados, para que el cliente vea qué se hace antes de llamar",
      "Español, valenciano e inglés",
      "Mapa de Google Maps con la ubicación",
      "Botones de llamada y de WhatsApp para contactar directamente",
    ],
  },
  {
    id: "digital-fit",
    title: "Digital Fit",
    monogram: "DF",
    description:
      "Aplicación web para organizar el entrenamiento: encontrar centros y lugares públicos donde entrenar, crear y seguir rutinas, registrar lo que haces y ver tu progreso. Fue mi proyecto final de DAW y ahora la estoy renovando como Digital-Fit 2.0.",
    technologies: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "Leaflet",
    ],
    status: "in-progress",
    image: "/projects/digital-fit.webp",
    repo: "https://github.com/Manuelklk03/Digital-Fit-Proyecto",
    personalContribution:
      "Hice la API REST con Spring Boot, la estructura del frontend en Angular y el funcionamiento de la aplicación. Para los mapas con Leaflet me apoyé en IA. Por ahora se ejecuta en local con Docker; todavía no está publicada.",
    features: [
      "Registro e inicio de sesión, con roles de usuario y de administrador",
      "Entrenamientos propios, copiados del catálogo o de la comunidad, y publicables para otros usuarios",
      "Historial de entrenamientos realizados y estadísticas de actividad",
      "Mapa con centros privados y lugares públicos (Leaflet y OpenStreetMap)",
      "Tickets de soporte con conversación, gestionados por administradores",
    ],
  },
  {
    id: "valvedex",
    title: "ValveDex",
    monogram: "VDX",
    description:
      "Enciclopedia interactiva de los videojuegos de Valve, inspirada en una Pokédex: sagas, juegos, lore, mapas, armas y personajes, cada dato con su fuente. Empiezo por Half-Life, Opposing Force y Blue Shift.",
    technologies: ["React", "Next.js", "TypeScript"],
    status: "in-progress",
    image: "/projects/valvedex.webp",
    repo: "https://github.com/Manuelklk03/ValveDex",
    personalContribution:
      "Proyecto personal que desarrollo yo para reforzar React, TypeScript y Next.js con una aplicación completa. Sigue en desarrollo.",
    features: [
      "Recorrido por niveles: universos, juegos, apartados y fichas",
      "Cada universo y cada juego con su propia paleta de color",
      "Fichas de armas, mapas y personajes con descripción y fuentes",
      "Contenido por fases: primero Half-Life, Opposing Force y Blue Shift, después el resto de sagas",
    ],
  },
];
