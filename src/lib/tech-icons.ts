// Logos de la sección «Stack» (simple-icons, una sola tinta). JPA y REST / MVC son
// conceptos y no tienen logo: llevan un glifo ASCII propio. Solo se usa al compilar.
import {
  siAngular,
  siCss,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siOpenjdk,
  siReact,
  siSpringboot,
  siThymeleaf,
  siTypescript,
} from "simple-icons";

export type TechIcon =
  | { kind: "path"; path: string }
  | { kind: "glyph"; glyph: string };

const logo = (icon: { path: string }): TechIcon => ({
  kind: "path",
  path: icon.path,
});

const icons: Record<string, TechIcon> = {
  HTML5: logo(siHtml5),
  CSS3: logo(siCss),
  JavaScript: logo(siJavascript),
  TypeScript: logo(siTypescript),
  Angular: logo(siAngular),
  // simple-icons ya no incluye el logo de Java: se usa el de OpenJDK, su implementación libre.
  Java: logo(siOpenjdk),
  "Spring Boot": logo(siSpringboot),
  Thymeleaf: logo(siThymeleaf),
  JPA: { kind: "glyph", glyph: "[db]" },
  "REST / MVC": { kind: "glyph", glyph: "{ }" },
  React: logo(siReact),
  "Next.js": logo(siNextdotjs),
};

// Sin icono conocido, el glifo es la inicial: la tecnología nunca queda sin marca.
export function getTechIcon(name: string): TechIcon {
  return icons[name] ?? { kind: "glyph", glyph: name.slice(0, 2) };
}
