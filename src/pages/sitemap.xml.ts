// Sitemap generado al compilar: la home y una página por proyecto. Sin dependencias extra.
import type { APIRoute } from "astro";
import { projects } from "@/data/projects";

export const GET: APIRoute = ({ site }) => {
  const paths = ["/", ...projects.map((project) => `/proyectos/${project.id}`)];
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
