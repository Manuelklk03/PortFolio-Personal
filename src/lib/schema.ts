// Datos estructurados (schema.org) para buscadores. Solo hechos ya publicados en la web:
// no se añaden fechas, métricas ni valoraciones. La URL base sale de `site` (astro.config.mjs).
import { profile } from "@/data/profile";
import { techStack } from "@/data/tech";
import type { Project } from "@/data/projects";

const url = (path: string, site: URL | undefined) =>
  site ? new URL(path, site).href : undefined;

export function personSchema(site: URL | undefined) {
  return {
    "@type": "Person",
    name: profile.name,
    jobTitle: "Desarrollador web",
    url: url("/", site),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressCountry: "ES",
    },
    sameAs: [profile.github, profile.linkedin],
    knowsAbout: techStack.base,
  };
}

// Home: una página de perfil cuya entidad principal es la persona.
export function profilePageSchema(site: URL | undefined) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: personSchema(site),
  };
}

// Página de proyecto: migas de pan y el proyecto (código si hay repositorio, obra si no).
export function projectSchema(project: Project, site: URL | undefined) {
  const pageUrl = url(`/proyectos/${project.id}`, site);
  const author = {
    "@type": "Person",
    name: profile.name,
    url: url("/", site),
  };
  const shared = {
    name: project.title,
    description: project.description,
    url: pageUrl,
    keywords: project.technologies.join(", "),
    author,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: url("/", site) },
          {
            "@type": "ListItem",
            position: 2,
            name: "Proyectos",
            item: url("/#proyectos", site),
          },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
      project.repo
        ? {
            "@type": "SoftwareSourceCode",
            ...shared,
            codeRepository: project.repo,
          }
        : {
            "@type": "CreativeWork",
            ...shared,
            sameAs: project.demo ? [project.demo] : undefined,
          },
    ],
  };
}
