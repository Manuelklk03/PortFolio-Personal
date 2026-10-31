import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

// Duración del giro automático de entrada; después el nudo solo se mueve con el ratón.
const INTRO_MS = 5000;

// Dibuja un nudo 3D con caracteres ASCII dentro de `container`.
export function startAsciiScene(container: HTMLElement): void {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer();
  } catch {
    // Sin WebGL el inicio se queda sin fondo; el contenido no depende de él.
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
  camera.position.z = 260;

  // La luz decide qué carácter sale en cada zona: más luz, carácter más denso.
  const light = new THREE.PointLight(0xffffff, 3, 0, 0);
  light.position.set(300, 300, 300);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.15));

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(70, 22, 160, 24),
    new THREE.MeshPhongMaterial({ flatShading: true }),
  );
  knot.rotation.set(0.4, 0.6, 0);
  scene.add(knot);

  const effect = new AsciiEffect(renderer, " .:-=+*#%@", {
    invert: true,
    resolution: 0.18,
  });
  // Hereda el color del contenedor (text-accent) y deja ver el fondo.
  effect.domElement.style.color = "inherit";
  effect.domElement.style.backgroundColor = "transparent";
  container.appendChild(effect.domElement);

  const render = () => effect.render(scene, camera);

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    effect.setSize(width, height);
    render();
  };
  resize();
  window.addEventListener("resize", resize);

  // El ratón inclina el nudo; `current` lo sigue con suavidad.
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    target.x = (event.clientY / window.innerHeight - 0.5) * 1.2;
    target.y = (event.clientX / window.innerWidth - 0.5) * 1.2;
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const start = performance.now();
  const spin = { x: 0.4, y: 0.6 };
  let frameId: number | null = null;
  let last = 0;
  let visible = true;

  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick);
    // Unos 30 fotogramas por segundo bastan y ahorran batería.
    if (now - last < 33) return;
    last = now;

    // El giro automático se frena hasta pararse a los INTRO_MS.
    const intro = Math.max(0, 1 - (now - start) / INTRO_MS);
    spin.x += 0.006 * intro;
    spin.y += 0.009 * intro;
    current.x += (target.x - current.x) * 0.05;
    current.y += (target.y - current.y) * 0.05;
    knot.rotation.x = spin.x + current.x;
    knot.rotation.y = spin.y + current.y;
    render();
  };

  const play = () => {
    if (frameId === null && visible && !reducedMotion.matches) {
      frameId = requestAnimationFrame(tick);
    }
  };
  const stop = () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  };

  // Fuera de pantalla o con movimiento reducido, el bucle se detiene del todo.
  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    if (visible) play();
    else stop();
  }).observe(container);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) stop();
    else play();
  });

  play();
}
