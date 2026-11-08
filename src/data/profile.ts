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
      value:
        "Bonatel (distribuidor Vodafone), curso 2025-2026 · App Informática (Patraix), curso 2023-2024",
    },
    {
      key: "idiomas",
      value: "Español nativo · Inglés lector y conversación sencilla",
    },
  ],
  aboutText: [
    "Soy Manuel, de Valencia. Acabo de terminar el ciclo de Desarrollo de Aplicaciones Web en el IES Conselleria Campanar.",
    "Aprendo construyendo. Digital Fit (Angular y Spring Boot) y ValveDex (Next.js) son, por ahora, mis dos proyectos personales, y los dos siguen en camino. Uso la IA como apoyo, pero lo que entra en el código lo reviso y lo decido yo.",
    "Ya tengo una base con Java, Spring Boot y Angular, y ahora estoy aprendiendo React y Next.js. Me gusta innovar y aprender tecnologías distintas cada día. Busco mi primer puesto como desarrollador web.",
  ],
  whatIDo: [
    "Webs responsive, cuidadas y útiles",
    "APIs RESTful con Java y Spring Boot, con datos en JPA",
    "Interfaces con Angular y TypeScript, y vistas de servidor con Thymeleaf",
    "Webs para clientes reales, del diseño a la publicación",
    "Aprendiendo React, Next.js, PostgreSQL y Express.js",
  ],
};
