// Retrato de «Sobre mí»: los caracteres del ASCII salen dispersos, vuelan cada uno a su sitio
// (primero los de la cara) y al encajar se convierten en el bloque de color de la foto.
// Después el mosaico se enfoca (bloques grandes → pequeños → foto nítida).
const SPREAD_MS = 1700; // cuánto tarda en salir el último carácter
const FLIGHT_MS = 850; // duración del vuelo de cada carácter
const FLIGHT_PADDING = 90; // margen (px CSS) por fuera de la foto por el que pueden volar
const SHARPEN_STEPS = [2, 4, 8];
const SHARPEN_STEP_MS = 220;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface Particle {
  char: string;
  // Posición final (centro de la celda) y de partida, en píxeles del lienzo de vuelo.
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  cellX: number;
  cellY: number;
  delay: number;
  landed: boolean;
}

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

  const lines = (pre.textContent ?? "").split("\n");
  const columns = Math.max(...lines.map((line) => line.length));
  const rows = lines.length;
  const rect = root.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio, 2);

  // Lienzo de aterrizaje: encima del ASCII, con la misma máscara que la foto.
  const landed = document.createElement("canvas");
  landed.setAttribute("aria-hidden", "true");
  landed.className = img.className;
  landed.width = Math.round(rect.width * dpr);
  landed.height = Math.round(rect.height * dpr);
  root.appendChild(landed);
  const landedCtx = landed.getContext("2d");
  if (!landedCtx) throw new Error("sin canvas 2D");
  landedCtx.imageSmoothingEnabled = false;

  // Lienzo de vuelo: más grande que la foto, sin máscara ni filtro, para que se vean llegar de fuera.
  const pad = Math.round(FLIGHT_PADDING * dpr);
  const flight = document.createElement("canvas");
  flight.setAttribute("aria-hidden", "true");
  flight.width = landed.width + pad * 2;
  flight.height = landed.height + pad * 2;
  flight.style.cssText = `position:absolute;left:${-FLIGHT_PADDING}px;top:${-FLIGHT_PADDING}px;width:${flight.width / dpr}px;height:${flight.height / dpr}px;pointer-events:none;filter:none;-webkit-mask-image:none;mask-image:none;`;
  root.appendChild(flight);
  const flightCtx = flight.getContext("2d");
  if (!flightCtx) throw new Error("sin canvas 2D");

  // La foto reducida a una celda por carácter: el color medio de cada carácter.
  const cells = document.createElement("canvas");
  cells.width = columns;
  cells.height = rows;
  cells.getContext("2d")?.drawImage(img, 0, 0, columns, rows);

  const cellWidth = landed.width / columns;
  const cellHeight = landed.height / rows;

  // Orden de llegada: desde la cara (centro, un poco arriba) hacia fuera, con algo de azar.
  const ranked: { x: number; y: number; score: number }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const dx = (x / columns - 0.5) * 1.2;
      const dy = y / rows - 0.38;
      ranked.push({ x, y, score: Math.hypot(dx, dy) + Math.random() * 0.12 });
    }
  }
  ranked.sort((a, b) => a.score - b.score);

  const particles: Particle[] = ranked.map(({ x, y }, rank) => {
    const targetX = pad + (x + 0.5) * cellWidth;
    const targetY = pad + (y + 0.5) * cellHeight;
    // Sale de una zona alrededor de la foto, de lejos, algo más por arriba y por los lados.
    const angle = Math.random() * Math.PI * 2;
    const distance = (140 + Math.random() * 260) * dpr;
    return {
      char: lines[y]?.[x] ?? " ",
      targetX,
      targetY,
      startX: Math.min(flight.width, Math.max(0, targetX + Math.cos(angle) * distance)),
      startY: Math.min(flight.height, Math.max(0, targetY + Math.sin(angle) * distance * 0.8)),
      cellX: x,
      cellY: y,
      delay: (rank / ranked.length) * SPREAD_MS,
      landed: false,
    };
  });

  const computed = getComputedStyle(pre);
  const fontSize = parseFloat(computed.fontSize) * dpr;
  const charColor = computed.color;
  flightCtx.font = `${computed.fontWeight} ${fontSize}px ${computed.fontFamily}`;
  flightCtx.textAlign = "center";
  flightCtx.textBaseline = "middle";
  flightCtx.fillStyle = charColor;

  // 1. El ASCII fijo se apaga y sus caracteres salen volando a su sitio.
  pre.style.transition = "opacity 0.3s";
  pre.style.opacity = "0";

  await new Promise<void>((resolve) => {
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      flightCtx.clearRect(0, 0, flight.width, flight.height);
      let pending = 0;

      for (const p of particles) {
        if (p.landed) continue;
        const local = (elapsed - p.delay) / FLIGHT_MS;

        if (local >= 1) {
          // Encaja: el carácter se convierte en el bloque de color de la foto.
          landedCtx.drawImage(
            cells,
            p.cellX,
            p.cellY,
            1,
            1,
            p.cellX * cellWidth,
            p.cellY * cellHeight,
            Math.ceil(cellWidth),
            Math.ceil(cellHeight),
          );
          p.landed = true;
          continue;
        }

        pending++;
        if (p.char === " ") continue;
        // Antes de salir flota casi invisible; en vuelo gana opacidad y se acerca con frenado suave.
        const progress = local <= 0 ? 0 : easeOutCubic(local);
        flightCtx.globalAlpha = local <= 0 ? 0.22 : 0.3 + 0.7 * progress;
        flightCtx.fillText(
          p.char,
          p.startX + (p.targetX - p.startX) * progress,
          p.startY + (p.targetY - p.startY) * progress,
        );
      }
      flightCtx.globalAlpha = 1;

      if (pending > 0) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
  flight.remove();

  // 2. El mosaico se enfoca: cada paso dobla la resolución.
  const buffer = document.createElement("canvas");
  for (const factor of SHARPEN_STEPS) {
    await wait(SHARPEN_STEP_MS);
    buffer.width = columns * factor;
    buffer.height = rows * factor;
    const bufferCtx = buffer.getContext("2d");
    bufferCtx?.clearRect(0, 0, buffer.width, buffer.height);
    bufferCtx?.drawImage(img, 0, 0, buffer.width, buffer.height);
    landedCtx.clearRect(0, 0, landed.width, landed.height);
    landedCtx.drawImage(buffer, 0, 0, landed.width, landed.height);
  }
  await wait(SHARPEN_STEP_MS);

  // 3. Aparece la foto nítida y se retira el lienzo.
  root.classList.add("mosaic-done");
  await wait(450);
  landed.remove();
}
