// Retrato de «Sobre mí»: cada carácter del ASCII se convierte en un bloque de color de la foto,
// empezando por la cara, y luego el mosaico se enfoca (bloques grandes → pequeños → foto nítida).
const REVEAL_MS = 1500;
const SHARPEN_STEPS = [2, 4, 8];
const SHARPEN_STEP_MS = 220;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function initPortraitMosaic(root: HTMLElement): void {
  const pre = root.querySelector("pre");
  const img = root.querySelector("img");
  if (!pre || !img) return;

  const finish = () => root.classList.add("mosaic-done");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      // Un instante de ASCII antes de empezar, para que se entienda de dónde sale la foto.
      setTimeout(() => {
        run(root, pre, img).catch(finish);
      }, 600);
    },
    { threshold: 0.4 },
  );
  observer.observe(root);
}

async function run(
  root: HTMLElement,
  pre: HTMLElement,
  img: HTMLImageElement,
): Promise<void> {
  await img.decode();

  const columns = Math.max(
    ...(pre.textContent ?? "").split("\n").map((line) => line.length),
  );
  const rows = (pre.textContent ?? "").split("\n").length;
  const rect = root.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio, 2);

  // El lienzo se coloca encima del ASCII, con la misma máscara que la foto.
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.className = img.className;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  root.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("sin canvas 2D");
  ctx.imageSmoothingEnabled = false;

  // La foto reducida a una celda por carácter: el color medio de cada carácter.
  const cells = document.createElement("canvas");
  cells.width = columns;
  cells.height = rows;
  cells.getContext("2d")?.drawImage(img, 0, 0, columns, rows);

  const cellWidth = canvas.width / columns;
  const cellHeight = canvas.height / rows;

  // Orden: desde la cara (centro, un poco arriba) hacia fuera, con algo de azar.
  const order: [number, number, number][] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const dx = (x / columns - 0.5) * 1.2;
      const dy = y / rows - 0.38;
      order.push([x, y, Math.hypot(dx, dy) + Math.random() * 0.12]);
    }
  }
  order.sort((a, b) => a[2] - b[2]);

  // 1. Los caracteres se convierten en bloques de color.
  await new Promise<void>((resolve) => {
    const start = performance.now();
    let drawn = 0;
    const frame = (now: number) => {
      const target = Math.min(
        order.length,
        Math.floor(((now - start) / REVEAL_MS) * order.length),
      );
      for (; drawn < target; drawn++) {
        const [x, y] = order[drawn] ?? [0, 0];
        ctx.drawImage(
          cells,
          x,
          y,
          1,
          1,
          x * cellWidth,
          y * cellHeight,
          Math.ceil(cellWidth),
          Math.ceil(cellHeight),
        );
      }
      if (drawn < order.length) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });

  // 2. El mosaico se enfoca: cada paso dobla la resolución.
  const buffer = document.createElement("canvas");
  for (const factor of SHARPEN_STEPS) {
    await wait(SHARPEN_STEP_MS);
    buffer.width = columns * factor;
    buffer.height = rows * factor;
    const bufferCtx = buffer.getContext("2d");
    bufferCtx?.clearRect(0, 0, buffer.width, buffer.height);
    bufferCtx?.drawImage(img, 0, 0, buffer.width, buffer.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
  }
  await wait(SHARPEN_STEP_MS);

  // 3. Aparece la foto nítida y se retira el lienzo.
  root.classList.add("mosaic-done");
  await wait(450);
  canvas.remove();
}
