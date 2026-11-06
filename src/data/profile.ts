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
    "Soy desarrollador web junior, recién titulado en DAW. Prefiero un proyecto pequeño que funcione y que sepa explicar a uno enorme que no entienda. Aprendo construyendo: ramas, revisiones y documentación en cada cambio, y la IA como apoyo, sin dejar de decidir yo.",
  whatIDo: [
    "APIs REST con Java y Spring Boot",
    "Interfaces con Angular y TypeScript",
    "Vistas con Thymeleaf y persistencia con JPA",
    "Webs con React y Next.js (aprendiendo)",
  ],
};
