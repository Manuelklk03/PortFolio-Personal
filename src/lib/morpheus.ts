// Silueta de Morfeo: calvo, gafas oscuras, abrigo largo de cuello ancho y las dos manos abiertas
// hacia fuera con las palmas hacia arriba. Dibujo propio en SVG (sombra negra con borde de luz verde);
// las manos reciben algo de luz, como en la escena. PALMS indica dónde van las píldoras (en %).
export const PALMS = {
  left: { x: 23, y: 55 },
  right: { x: 77, y: 55 },
};

// Mano izquierda: palma hacia arriba, dedos hacia fuera y pulgar arriba. La derecha es su reflejo.
const HAND =
  "M234 328 C206 318 176 316 150 322 L104 314 C91 312 89 327 102 329 L140 335 L92 350 C79 354 84 369 96 366 L140 357 L100 376 C87 382 94 395 106 390 L148 373 L120 394 C109 402 118 414 129 407 L166 385 C192 381 216 373 234 361 Z";

export const MORPHEUS_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 620" style="width:100%;height:auto">
  <defs>
    <filter id="rim" x="-10%" y="-10%" width="120%" height="120%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="grow"/>
      <feFlood flood-color="#00ff66" flood-opacity="0.6"/>
      <feComposite in2="grow" operator="in" result="edge"/>
      <feGaussianBlur in="edge" stdDeviation="3" result="glow"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="hand-light" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a6b51"/>
      <stop offset="1" stop-color="#101a12"/>
    </linearGradient>
  </defs>
  <g fill="#010301" filter="url(#rim)">
    <!-- Abrigo largo; sigue por debajo del dibujo -->
    <path d="M198 218 Q238 190 318 182 L442 182 Q522 190 562 218 L586 335 L580 660 L180 660 L174 335 Z"/>
    <!-- Cuello ancho del abrigo -->
    <path d="M326 146 L434 146 L478 206 L282 206 Z"/>
    <!-- Orejas -->
    <ellipse cx="335" cy="98" rx="10" ry="18"/>
    <ellipse cx="425" cy="98" rx="10" ry="18"/>
    <!-- Cabeza calva y mandíbula -->
    <path d="M380 30 C414 30 430 58 430 92 C430 122 418 142 400 152 L390 162 L370 162 L360 152 C342 142 330 122 330 92 C330 58 346 30 380 30 Z"/>
  </g>
  <!-- Manos abiertas a los lados, delante del abrigo -->
  <g fill="url(#hand-light)" filter="url(#rim)">
    <path d="${HAND}"/>
    <path d="${HAND}" transform="translate(760 0) scale(-1 1)"/>
  </g>
  <!-- Gafas oscuras: solo el reflejo verde de los cristales -->
  <g fill="#00ff66" opacity="0.4">
    <ellipse cx="363" cy="96" rx="16" ry="9"/>
    <ellipse cx="397" cy="96" rx="16" ry="9"/>
  </g>
  <g fill="none" stroke="#00ff66" stroke-width="2" opacity="0.8">
    <ellipse cx="363" cy="96" rx="16" ry="9"/>
    <ellipse cx="397" cy="96" rx="16" ry="9"/>
  </g>
  <g fill="#d6ffe0" opacity="0.85">
    <ellipse cx="356" cy="92" rx="5" ry="2" transform="rotate(-15 356 92)"/>
    <ellipse cx="390" cy="92" rx="5" ry="2" transform="rotate(-15 390 92)"/>
  </g>
</svg>`;
