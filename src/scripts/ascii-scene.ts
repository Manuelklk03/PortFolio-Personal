import * as THREE from "three";
import { AsciiEffect } from "three/addons/effects/AsciiEffect.js";

export interface AsciiSceneControls {
  setPaused: (paused: boolean) => void;
}

// Dibuja un nudo 3D con caracteres ASCII que gira solo dentro de `container`.
export function startAsciiScene(
  container: HTMLElement,
): AsciiSceneControls | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer();
  } catch {
    // Sin WebGL el inicio se queda sin fondo; el contenido no depende de él.
    return null;
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
    // El nudo se coloca en la mitad derecha para dejar libre el texto del inicio.
    const visibleHeight =
      2 *
      camera.position.z *
      Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    knot.position.x = visibleHeight * camera.aspect * 0.22;
    effect.setSize(width, height);
    render();
  };
  resize();
  window.addEventListener("resize", resize);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let visible = true;
  let frameId: number | null = null;
  let time = 0;
  let last = 0;

  const tick = (now: number) => {
    frameId = requestAnimationFrame(tick);
    // Unos 30 fotogramas por segundo bastan y ahorran batería.
    const delta = now - last;
    if (delta < 33) return;
    last = now;
    // El tiempo solo avanza mientras se anima, así al reanudar no da saltos.
    time += Math.min(delta, 100) / 1000;

    // Giro continuo con un ligero balanceo para que no parezca mecánico.
    knot.rotation.x = 0.4 + time * 0.25;
    knot.rotation.y = 0.6 + time * 0.35;
    knot.rotation.z = Math.sin(time * 0.6) * 0.3;
    knot.position.y = Math.sin(time * 0.8) * 8;
    render();
  };

  const update = () => {
    const shouldRun = visible && !paused && !reducedMotion.matches;
    if (shouldRun && frameId === null) {
      last = performance.now();
      frameId = requestAnimationFrame(tick);
    } else if (!shouldRun && frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  // Fuera de pantalla, en pausa o con movimiento reducido, el bucle se detiene del todo.
  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    update();
  }).observe(container);
  reducedMotion.addEventListener("change", update);

  update();

  return {
    setPaused: (value) => {
      paused = value;
      update();
    },
  };
}
