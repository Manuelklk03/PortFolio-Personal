// Cómo trabaja Manuel, para la sección «Trabajo». Cada paso describe algo que se puede ver
// en sus repositorios (ramas, pull requests, commits, documentación); no es una lista de adjetivos.
export interface WorkStep {
  title: string;
  text: string;
}

export const workflow: WorkStep[] = [
  {
    title: "planificar por pasos",
    text: "Divido el trabajo en pasos pequeños y compruebo cada uno antes de seguir con el siguiente.",
  },
  {
    title: "ramas y pull requests",
    text: "Una rama por cambio, commits en español con Conventional Commits y pull request antes de fusionar con main (GitHub Flow).",
  },
  {
    title: "comprobar",
    text: "Antes de dar un cambio por bueno ejecuto la comprobación de tipos y la compilación, y lo reviso en el navegador.",
  },
  {
    title: "revisar",
    text: "Paso una segunda revisión del cambio antes de fusionarlo, también con herramientas de análisis de código.",
  },
  {
    title: "documentar",
    text: "Dejo anotado qué se hizo, por qué y qué falta, para poder retomar el proyecto sin depender de la memoria.",
  },
];

// Postura sobre la IA: transparente, y con la decisión siempre en sus manos.
export const workNote = {
  title: "la IA, como apoyo",
  text: "Uso asistentes de IA para acelerar y revisar, pero la decisión y entender cada paso son míos. Cuando algo lo hice con su ayuda, como los mapas de Digital Fit, lo digo.",
};
