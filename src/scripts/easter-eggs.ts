// Detalles escondidos: el código Konami y copiar los colores de la paleta.
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Mensaje breve en la esquina, también anunciado a lectores de pantalla.
function toast(text: string): void {
  const element = document.querySelector<HTMLElement>("[data-toast]");
  if (!element) return;
  element.textContent = text;
  element.classList.remove("opacity-0");
  window.setTimeout(() => element.classList.add("opacity-0"), 2400);
}

export function initEasterEggs(): void {
  let position = 0;
  window.addEventListener("keydown", (event) => {
    const expected = KONAMI[position];
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    position = key === expected ? position + 1 : key === KONAMI[0] ? 1 : 0;
    if (position === KONAMI.length) {
      position = 0;
      window.dispatchEvent(new CustomEvent("konami"));
      toast("↑↑↓↓←→←→BA · modo konami activado");
    }
  });

  document
    .querySelectorAll<HTMLButtonElement>("[data-copy-color]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const color = button.dataset.copyColor ?? "";
        try {
          await navigator.clipboard.writeText(color);
          toast(`copiado ${color}`);
        } catch {
          toast(color);
        }
      });
    });
}
