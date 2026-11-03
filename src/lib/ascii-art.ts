// Arte ASCII generado al compilar (se usa en el frontmatter; no llega al navegador como código).
import sharp from "sharp";
import figlet from "figlet";
import ansiShadow from "figlet/importable-fonts/ANSI Shadow.js";

figlet.parseFont("ANSI Shadow", ansiShadow);

// Texto en letras de bloque (ANSI Shadow, la misma fuente que el nombre del inicio).
export function blockLetters(text: string): string {
  return figlet.textSync(text, { font: "ANSI Shadow" }).trimEnd();
}

// Convierte una foto en caracteres: las zonas claras usan caracteres densos (la web es oscura)
// y el fondo casi blanco de la foto se deja vacío. Devuelve null si la foto todavía no existe.
// `crop` recorta la foto en fracciones (0–1) para quedarse con la cabeza y los hombros.
export async function imageAscii(
  path: string,
  columns: number,
  rows: number,
  crop = { left: 0, top: 0, width: 1, height: 1 },
): Promise<string | null> {
  const ramp = " .:-=+*#%@";
  // Los caracteres son el doble de altos que de anchos: se leen dos filas de píxeles por línea.
  let data: Uint8Array;
  try {
    const { width = 1, height = 1 } = await sharp(path).metadata();
    ({ data } = await sharp(path)
      .extract({
        left: Math.round(width * crop.left),
        top: Math.round(height * crop.top),
        width: Math.round(width * crop.width),
        height: Math.round(height * crop.height),
      })
      .grayscale()
      .normalise()
      .resize(columns, rows * 2, { fit: "fill" })
      .sharpen()
      .raw()
      .toBuffer({ resolveWithObject: true }));
  } catch {
    return null;
  }

  const lines: string[] = [];
  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < columns; col++) {
      const top = data[row * 2 * columns + col] ?? 0;
      const bottom = data[(row * 2 + 1) * columns + col] ?? 0;
      const brightness = (top + bottom) / 2 / 255;
      line +=
        brightness > 0.93
          ? " "
          : ramp[
              Math.min(ramp.length - 1, Math.floor(brightness * ramp.length))
            ];
    }
    lines.push(line.trimEnd());
  }
  return lines.join("\n");
}

// Foto lista para el fondo oscuro: mismo recorte que el ASCII, fondo blanco transparente
// y tono jade. Se devuelve como data URI WebP; null si la foto no existe.
export async function tintedPhoto(
  path: string,
  outputWidth: number,
  crop = { left: 0, top: 0, width: 1, height: 1 },
): Promise<string | null> {
  try {
    const { width = 1, height = 1 } = await sharp(path).metadata();
    const region = {
      left: Math.round(width * crop.left),
      top: Math.round(height * crop.top),
      width: Math.round(width * crop.width),
      height: Math.round(height * crop.height),
    };
    const { data: gray, info } = await sharp(path)
      .extract(region)
      .resize({ width: outputWidth })
      .grayscale()
      .extractChannel(0)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info;
    if (info.channels !== 1) return null;
    const pixels = w * h;

    // Fondo: zona casi blanca conectada con los bordes (así los brillos de la cara no se borran).
    const background = new Uint8Array(pixels);
    const queue: number[] = [];
    const isLight = (i: number) => (gray[i] ?? 0) > 225;
    for (let x = 0; x < w; x++) queue.push(x, (h - 1) * w + x);
    for (let y = 0; y < h; y++) queue.push(y * w, y * w + w - 1);
    while (queue.length) {
      const i = queue.pop() ?? 0;
      if (background[i] || !isLight(i)) continue;
      background[i] = 1;
      const x = i % w;
      if (x > 0) queue.push(i - 1);
      if (x < w - 1) queue.push(i + 1);
      if (i >= w) queue.push(i - w);
      if (i < pixels - w) queue.push(i + w);
    }

    // Borde suave del recorte.
    const mask = new Uint8Array(pixels);
    for (let i = 0; i < pixels; i++) mask[i] = background[i] ? 0 : 255;
    const softMask = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
      .blur(2)
      .extractChannel(0)
      .raw()
      .toBuffer();

    // Duotono de la paleta: sombras del color de las superficies, medios en teal y luces en jade claro.
    const stops: [number, number[]][] = [
      [0, [10, 22, 38]],
      [0.45, [15, 157, 154]],
      [0.8, [62, 230, 193]],
      [1, [221, 247, 240]],
    ];
    const toneOf = (value: number) => {
      for (let s = 1; s < stops.length; s++) {
        const [end, to] = stops[s] ?? [1, [0, 0, 0]];
        const [start, from] = stops[s - 1] ?? [0, [0, 0, 0]];
        if (value <= end) {
          const t = (value - start) / (end - start);
          return from.map((c, k) => Math.round(c + ((to[k] ?? c) - c) * t));
        }
      }
      return [221, 247, 240];
    };

    // Se estira el contraste usando solo la persona, no el fondo.
    let min = 255;
    let max = 0;
    for (let i = 0; i < pixels; i++) {
      if (background[i]) continue;
      min = Math.min(min, gray[i] ?? 255);
      max = Math.max(max, gray[i] ?? 0);
    }

    // Color real de la foto, que se mezcla con el duotono para que no quede todo jade.
    const { data: original, info: originalInfo } = await sharp(path)
      .extract(region)
      .resize({ width: outputWidth })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const channels = originalInfo.channels;
    const realColor = 0.7;

    const rgba = new Uint8Array(pixels * 4);
    for (let i = 0; i < pixels; i++) {
      const value = Math.min(1, Math.max(0, ((gray[i] ?? 0) - min) / (max - min || 1)));
      const tone = toneOf(value);
      const [r = 0, g = 0, b = 0] = tone.map((c, k) => {
        const real = original[i * channels + (channels >= 3 ? k : 0)] ?? c;
        return Math.round(c * (1 - realColor) + real * realColor);
      });
      rgba.set([r, g, b, softMask[i] ?? 0], i * 4);
    }

    const webp = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
      .webp({ quality: 82, alphaQuality: 90 })
      .toBuffer();
    return `data:image/webp;base64,${webp.toString("base64")}`;
  } catch {
    return null;
  }
}

// Franja de caracteres que se apagan hacia abajo (▓▒░·); con semilla para que salga siempre igual.
export function dissolveBand(columns: number, rows: number, seed = 7): string {
  let state = seed;
  const random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const lines: string[] = [];
  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < columns; col++) {
      // Más denso arriba y con huecos al azar, para que parezca que se deshace.
      const density = (1 - row / rows) * random() * 1.1;
      line +=
        density > 0.75
          ? "▓"
          : density > 0.55
            ? "▒"
            : density > 0.35
              ? "░"
              : density > 0.2
                ? "·"
                : " ";
    }
    lines.push(line);
  }
  return lines.join("\n");
}
