// Datos personales públicos del portfolio.
interface Profile {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  // Ruta del PDF dentro de public/ cuando Manuel lo facilite, p. ej. "/cv/manuel-casinos-perez.pdf".
  cvUrl: string | null;
  // Filas de «Sobre mí» (datos confirmados en docs/PROYECTOS.md).
  about: { key: string; value: string }[];
  // Mensaje personal de «Sobre mí» (borrador: Manuel lo ajusta con sus palabras).
  aboutNote: string;
  // «¿Qué hago?»: cosas concretas de su CV, no adjetivos.
  whatIDo: string[];
  // Enfoque: cómo le gusta hacer las webs (borrador formal que Manuel ajustará).
  pillars: { title: string; text: string }[];
  // Método de trabajo, en prosa.
  method: string;
}

export const profile: Profile = {
  name: "Manuel Casinos Pérez",
  email: "manuelcp420@gmail.com",
  github: "https://github.com/Manuelklk03",
  linkedin: "https://www.linkedin.com/in/manuel-casinos-perez/",
  cvUrl: "/cv/manuel-casinos-perez.pdf",
  about: [
    { key: "ubicación", value: "Valencia" },
    {
      key: "formación",
      value: "CFGS Desarrollo de Aplicaciones Web · IES Conselleria Campanar · 2024-2026",
    },
    {
      key: "prácticas",
      value: "Bonatel (distribuidor Vodafone), prácticas del ciclo · curso 2025-2026",
    },
    {
      key: "idiomas",
      value: "Español nativo · Inglés lector y conversación sencilla",
    },
    {
      key: "base",
      value: "Java · JavaScript · TypeScript · Angular · Spring Boot",
    },
    {
      key: "aprendiendo",
      value: "React · Next.js · Astro · PostgreSQL · Express.js · Python",
    },
  ],
  aboutNote:
    "Me dedico al desarrollo web con un criterio claro: construir sitios cuidados en su diseño, optimizados en su rendimiento y útiles para quien los utiliza. Soy desarrollador web junior, recién titulado en DAW, y prefiero un proyecto acotado que funcione y que sea capaz de explicar a uno extenso que no domine.",
  whatIDo: [
    "APIs REST con Java y Spring Boot",
    "Interfaces con Angular y TypeScript",
    "Vistas con Thymeleaf y persistencia con JPA",
    "Webs con React y Next.js (aprendiendo)",
  ],
  pillars: [
    {
      title: "cuidadas",
      text: "Presto atención al diseño, a la jerarquía visual y a los detalles de interacción, procurando que el efecto nunca estorbe al contenido.",
    },
    {
      title: "optimizadas",
      text: "Cargo únicamente lo necesario, cuido el peso de las imágenes y la accesibilidad, y respeto la preferencia de movimiento reducido del usuario.",
    },
    {
      title: "útiles",
      text: "Parto de lo que necesita quien va a usar la web y compruebo que se entienda, que funcione en el móvil y que pueda manejarse con el teclado.",
    },
  ],
  method:
    "Trabajo por pasos pequeños y verificables: una rama y una pull request por cada cambio, comprobación de tipos y compilación antes de integrarlo, una segunda revisión del código y documentación de cada decisión. Utilizo asistentes de IA como apoyo, conservando siempre la decisión final y la comprensión de cada paso; cuando una parte se ha resuelto con su ayuda, lo indico.",
};
