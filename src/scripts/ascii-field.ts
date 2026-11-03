// Fondo de toda la página: una rejilla muy tenue de caracteres que se "despiertan" cerca del ratón
// (cambian a caracteres más densos y brillan) y se apagan poco a poco al alejarse.
const CELL = 18;
const RADIUS = 150;
const RAMP = " .:-=+*#%@";

export function initAsciiField(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  let columns = 0;
  let rows = 0;
  let energy = new Float32Array(0);
  let base: HTMLCanvasElement | null = null;
  let color = "#3ee6c1";
  const pointer = { x: -9999, y: -9999 };
  let frameId: number | null = null;

  const readColor = () => {
    color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || color;
  };

  // La rejilla quieta se dibuja una sola vez en un lienzo aparte.
  const drawBase = () => {
    base = document.createElement("canvas");
    base.width = canvas.width;
    base.height = canvas.height;
    const baseCtx = base.getContext("2d");
    if (!baseCtx) return;
    baseCtx.font = `12px monospace`;
    baseCtx.fillStyle = color;
    baseCtx.globalAlpha = 0.07;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        baseCtx.fillText(
          (x * 7 + y * 13) % 11 === 0 ? ":" : ".",
          x * CELL,
          y * CELL + 12,
        );
      }
    }
  };

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.ceil(canvas.width / CELL);
    rows = Math.ceil(canvas.height / CELL);
    energy = new Float32Array(columns * rows);
    drawBase();
    render();
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (base) ctx.drawImage(base, 0, 0);
  };

  const tick = () => {
    let active = false;
    // Las celdas cercanas al ratón ganan energía; todas la pierden poco a poco.
    const minX = Math.max(0, Math.floor((pointer.x - RADIUS) / CELL));
    const maxX = Math.min(columns - 1, Math.ceil((pointer.x + RADIUS) / CELL));
    const minY = Math.max(0, Math.floor((pointer.y - RADIUS) / CELL));
    const maxY = Math.min(rows - 1, Math.ceil((pointer.y + RADIUS) / CELL));
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const distance = Math.hypot(
          x * CELL + CELL / 2 - pointer.x,
          y * CELL + CELL / 2 - pointer.y,
        );
        const heat = Math.max(0, 1 - distance / RADIUS);
        const index = y * columns + x;
        energy[index] = Math.max(energy[index] ?? 0, heat);
      }
    }

    render();
    ctx.font = `12px monospace`;
    ctx.fillStyle = color;
    for (let i = 0; i < energy.length; i++) {
      const value = energy[i] ?? 0;
      if (value < 0.02) continue;
      active = true;
      const char =
        RAMP[Math.min(RAMP.length - 1, Math.floor(value * RAMP.length))] ?? ".";
      // Un poco de azar en los caracteres para que parezca código vivo.
      const shown =
        value > 0.5 && Math.random() < 0.08
          ? (RAMP[Math.floor(Math.random() * RAMP.length)] ?? char)
          : char;
      ctx.globalAlpha = Math.min(0.55, value * 0.6);
      ctx.fillText(
        shown,
        (i % columns) * CELL,
        Math.floor(i / columns) * CELL + 12,
      );
      energy[i] = value * 0.92;
    }
    ctx.globalAlpha = 1;

    // Sin actividad el bucle se detiene hasta que el ratón vuelva a moverse.
    frameId = active ? requestAnimationFrame(tick) : null;
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (frameId === null) frameId = requestAnimationFrame(tick);
  };

  const enable = () => {
    if (!reducedMotion.matches && finePointer.matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
    } else {
      window.removeEventListener("pointermove", onMove);
    }
  };

  readColor();
  resize();
  enable();
  window.addEventListener("resize", resize);
  reducedMotion.addEventListener("change", enable);
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.x = -9999;
    pointer.y = -9999;
  });
  // Al cambiar de píldora la rejilla toma el color del nuevo tema.
  window.addEventListener("themechange", () => {
    readColor();
    drawBase();
    render();
  });
}
