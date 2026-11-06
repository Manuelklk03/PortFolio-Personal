// Logos de la sección «Stack» (simple-icons, una sola tinta). JPA y REST / MVC son
// conceptos y no tienen logo: llevan un glifo ASCII propio. Solo se usa al compilar.
import {
  siAngular,
  siAstro,
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLeaflet,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siThymeleaf,
  siTypescript,
} from "simple-icons";

export type TechIcon =
  | { kind: "path"; path: string; brand: string }
  | { kind: "glyph"; glyph: string };

// Color de marca legible sobre fondo oscuro: si el original es muy oscuro
// (Next.js, CSS, Thymeleaf…) se mezcla con blanco hasta que se distinga.
function readableBrand(hex: string): string {
  const [r = 0, g = 0, b = 0] = [0, 2, 4].map((i) =>
    parseInt(hex.slice(i, i + 2), 16),
  );
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance >= 0.3) return `#${hex}`;
  const lift = (value: number) => Math.round(value + (255 - value) * 0.6);
  return `rgb(${lift(r)} ${lift(g)} ${lift(b)})`;
}

// `brand` fuerza el color cuando el hex de simple-icons no es el que se reconoce (Angular).
const logo = (
  icon: { path: string; hex: string },
  brand?: string,
): TechIcon => ({
  kind: "path",
  path: icon.path,
  brand: brand ?? readableBrand(icon.hex),
});

const icons: Record<string, TechIcon> = {
  HTML5: logo(siHtml5),
  CSS3: logo(siCss),
  JavaScript: logo(siJavascript),
  TypeScript: logo(siTypescript),
  Angular: logo(siAngular, "#dd0031"),
  // simple-icons ya no incluye el logo de Java: se usa el de OpenJDK, su implementación libre.
  Java: logo(siOpenjdk),
  "Spring Boot": logo(siSpringboot),
  Thymeleaf: logo(siThymeleaf),
  JPA: { kind: "glyph", glyph: "[db]" },
  "REST / MVC": { kind: "glyph", glyph: "{ }" },
  React: logo(siReact),
  "Next.js": logo(siNextdotjs),
  MySQL: logo(siMysql),
  Docker: logo(siDocker),
  Leaflet: logo(siLeaflet),
  Git: logo(siGit),
  GitHub: logo(siGithub),
  Astro: logo(siAstro),
  PostgreSQL: logo(siPostgresql),
  "Express.js": logo(siExpress),
  Python: logo(siPython),
};

// Sin icono conocido, el glifo es la inicial: la tecnología nunca queda sin marca.
export function getTechIcon(name: string): TechIcon {
  return icons[name] ?? { kind: "glyph", glyph: name.slice(0, 2) };
}
