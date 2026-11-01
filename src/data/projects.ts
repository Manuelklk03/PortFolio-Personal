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
      "Web corporativa y catálogo de servicios para cerrajería local. Incluye formulario de contacto, galería de trabajos y sección de urgencias 24h.",
    technologies: ["Astro", "React", "Tailwind CSS", "TypeScript"],
    status: "completed",
    image: "/projects/cerrajeria-noa.svg",
    repo: "https://github.com/Manuelklk03/cerrajeria-noa",
    demo: "https://cerrajeria-noa.example.com",
    personalContribution:
      "Desarrollo completo: arquitectura, frontend, integración de formularios y despliegue.",
  },
  {
    id: "digital-fit",
    title: "Digital Fit 2.0",
    monogram: "DF2",
    description:
      "Plataforma de entrenamiento online con seguimiento de rutinas, progreso y nutrición. Incluye panel de usuario y área de administrador.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "TypeScript",
    ],
    status: "in-progress",
    image: "/projects/digital-fit.svg",
    repo: "https://github.com/Manuelklk03/digital-fit",
    personalContribution:
      "Frontend principal (React + TypeScript), diseño de componentes, integración con API REST y autenticación.",
  },
  {
    id: "valvedex",
    title: "ValveDex",
    monogram: "VDX",
    description:
      "Pokédex interactiva de válvulas industriales con filtros avanzados, comparador y fichas técnicas detalladas.",
    technologies: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Tailwind CSS",
      "TypeScript",
    ],
    status: "completed",
    image: "/projects/valvedex.svg",
    repo: "https://github.com/Manuelklk03/valvedex",
    demo: "https://valvedex.example.com",
    personalContribution:
      "Arquitectura 3D con React Three Fiber, sistema de filtros, comparador y optimización de rendimiento.",
  },
];
