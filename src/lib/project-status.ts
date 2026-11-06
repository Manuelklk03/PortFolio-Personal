// Texto y color de cada estado de proyecto. Lo usan la tarjeta y la página de detalle.
import type { Project } from "@/data/projects";

export const statusLabel: Record<Project["status"], string> = {
  completed: "completado",
  "in-progress": "en desarrollo",
  planned: "planificado",
};

export const statusColor: Record<Project["status"], string> = {
  completed: "text-accent",
  "in-progress": "text-accent-2",
  planned: "text-muted",
};
