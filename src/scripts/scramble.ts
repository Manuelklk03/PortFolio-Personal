// Al pasar el ratón (o con el foco del teclado) por un [data-scramble-trigger], el texto
// de sus [data-scramble] se mezcla con caracteres ASCII y se recompone de izquierda a derecha.
// Esos textos llevan aria-hidden: el lector de pantalla usa una copia fija.
const GLYPHS = "▓▒░#%@*+=-:.";

function scramble(element: HTMLElement): void {
  if (element.dataset.scrambling) return;
  const final = element.dataset.text ?? element.textContent ?? "";
  element.dataset.text = final;
  element.dataset.scrambling = "1";

  const totalFrames = 18;
  let frame = 0;
  const step = () => {
    const progress = frame / totalFrames;
    element.textContent = [...final]
      .map((char, index) =>
        char === " " || index / final.length < progress
          ? char
          : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? char),
      )
      .join("");
    frame++;
    if (frame <= totalFrames) {
      requestAnimationFrame(step);
    } else {
      element.textContent = final;
      delete element.dataset.scrambling;
    }
  };
  step();
}

export function initScramble(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document
    .querySelectorAll<HTMLElement>("[data-scramble-trigger]")
    .forEach((trigger) => {
      const run = () =>
        trigger
          .querySelectorAll<HTMLElement>("[data-scramble]")
          .forEach(scramble);
      trigger.addEventListener("pointerenter", run);
      trigger.addEventListener("focus", run);
    });
}
