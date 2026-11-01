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
export async function imageAscii(
  path: string,
  columns: number,
  rows: number,
): Promise<string | null> {
  const ramp = " .:-=+*#%@";
  // Los caracteres son el doble de altos que de anchos: se leen dos filas de píxeles por línea.
  let data: Uint8Array;
  try {
    ({ data } = await sharp(path)
      .resize(columns, rows * 2, { fit: "cover", position: "top" })
      .grayscale()
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
        brightness > 0.9
          ? " "
          : ramp[
              Math.min(ramp.length - 1, Math.floor(brightness * ramp.length))
            ];
    }
    lines.push(line.trimEnd());
  }
  return lines.join("\n");
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
