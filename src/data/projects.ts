// Proyectos reales de Manuel (datos confirmados en docs/PROYECTOS.md y por Manuel, nov. 2026).
export interface Project {
  id: string;
  title: string;
  // Siglas que se dibujan en letras de bloque junto al proyecto (2-4 caracteres).
  monogram: string;
  description: string;
  technologies: string[];
  status: "completed" | "in-progress" | "planned";
  image?: string;
  repo?: string;
  demo?: string;
  personalContribution: string;
}

export const projects: Project[] = [
  {
    id: "cerrajeria-noa",
    title: "Cerrajería NOA",
    monogram: "NOA",
    description:
      "Web para una cerrajería de Valencia: servicios, trabajos, contacto, tres idiomas (español, valenciano e inglés), mapa de Google Maps y acceso directo a WhatsApp.",
    technologies: ["Next.js", "React"],
    status: "completed",
    image: "/projects/cerrajeria-noa.webp",
    demo: "https://cerrajerianoa.es/es",
    personalContribution:
      "La hice entera: diseño, desarrollo, idiomas, mapa, WhatsApp y publicación.",
  },
  {
    id: "digital-fit",
    title: "Digital Fit",
    monogram: "DF",
    description:
      "Proyecto final de DAW: aplicación web de entrenamiento con usuarios y roles, entrenamientos, comunidad, estadísticas, historial y lugares de entrenamiento.",
    technologies: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "MySQL",
      "Docker",
    ],
    status: "in-progress",
    repo: "https://github.com/Manuelklk03/Digital-Fit-Proyecto",
    personalContribution:
      "API REST con Spring Boot, estructura del frontend en Angular y funcionamiento de la aplicación. Para los mapas con Leaflet me apoyé en IA.",
  },
  {
    id: "valvedex",
    title: "ValveDex",
    monogram: "VDX",
    description:
      "Enciclopedia interactiva de los videojuegos de Valve, empezando por Half-Life y sus expansiones: armas, mapas y personajes.",
    technologies: ["React", "Next.js", "TypeScript"],
    status: "in-progress",
    repo: "https://github.com/Manuelklk03/ValveDex",
    personalContribution: "Proyecto personal que estoy desarrollando yo.",
  },
];
