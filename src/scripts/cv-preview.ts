// Dibuja la primera página del CV en un canvas con pdf.js (sin la barra del visor del navegador).
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = workerUrl;

export async function renderCvPreview(
  canvas: HTMLCanvasElement,
  url: string,
): Promise<boolean> {
  try {
    const pdf = await getDocument({ url }).promise;
    const page = await pdf.getPage(1);

    // Escala para el ancho del contenedor y la densidad de la pantalla (nítido en retina).
    // Ancho útil del contenedor, sin su relleno.
    const parent = canvas.parentElement;
    const padding = parent
      ? parseFloat(getComputedStyle(parent).paddingLeft) +
        parseFloat(getComputedStyle(parent).paddingRight)
      : 0;
    const cssWidth = (parent?.clientWidth ?? 800) - padding;
    const baseViewport = page.getViewport({ scale: 1 });
    const dpr = Math.min(window.devicePixelRatio, 2);
    const viewport = page.getViewport({
      scale: (cssWidth / baseViewport.width) * dpr,
    });

    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${viewport.height / dpr}px`;

    await page.render({ canvas, viewport }).promise;
    return true;
  } catch {
    return false;
  }
}
