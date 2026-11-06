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
  aboutNote: string;
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
    "Me interesa seguir aprendiendo, mejorar mis proyectos y empezar mi trayectoria profesional como desarrollador web.",
};
