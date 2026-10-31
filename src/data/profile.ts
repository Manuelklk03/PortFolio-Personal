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
  cvUrl: null,
  about: [
    { key: "ubicación", value: "Valencia" },
    { key: "formación", value: "Desarrollo de Aplicaciones Web (DAW)" },
    {
      key: "base",
      value: "Java · JavaScript · TypeScript · Angular · Spring Boot",
    },
    { key: "aprendiendo", value: "React · Next.js" },
  ],
  aboutNote:
    "Me interesa seguir aprendiendo, mejorar mis proyectos y empezar mi trayectoria profesional como desarrollador web.",
};
