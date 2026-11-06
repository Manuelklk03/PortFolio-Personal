// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // URL pública del sitio: PROVISIONAL hasta elegir dominio. Es el único sitio donde se cambia
  // (canonical, Open Graph, robots.txt, sitemap y datos estructurados la leen de aquí).
  site: "https://manuelcasinos.dev",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  // Astro descarga estas fuentes al compilar y las sirve desde la propia web.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
});
