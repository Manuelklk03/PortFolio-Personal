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
  // Texto personal de «Sobre mí», en párrafos (borrador con lo que Manuel pidió contar: Manuel ajustará las palabras).
  aboutText: string[];
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
  aboutText: [
    "Soy Manuel, soy de Valencia y acabo de terminar el ciclo de Desarrollo de Aplicaciones Web. Me gusta hacer webs bonitas, que carguen rápido y que de verdad sirvan a quien las usa.",
    "Antes de escribir código me gusta entender lo que estoy construyendo y por qué. Trabajo paso a paso, comprobando cada cosa antes de seguir, y aprendo haciendo proyectos. Uso la IA como apoyo, pero entender cada paso y decidir es cosa mía.",
    "Ahora quiero empezar mi trayectoria profesional como desarrollador web y seguir aprendiendo en proyectos reales.",
  ],
  whatIDo: [
    "APIs REST con Java y Spring Boot",
    "Interfaces con Angular y TypeScript",
    "Vistas con Thymeleaf y persistencia con JPA",
    "Webs con React y Next.js (aprendiendo)",
  ],
};
