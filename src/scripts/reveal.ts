// Muestra con una transición suave los elementos [data-reveal] al entrar en pantalla.
// La transición está en global.css; sin JavaScript todo se ve desde el principio.
export function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!items.length) return;

  // Los hermanos se escalonan: cada uno entra 80 ms después del anterior.
  items.forEach((item) => {
    const siblings = item.parentElement?.querySelectorAll(
      ":scope > [data-reveal]",
    );
    const index = siblings ? Array.from(siblings).indexOf(item) : 0;
    item.style.setProperty("--reveal-delay", `${index * 80}ms`);
  });

  document.documentElement.classList.add("js-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  items.forEach((item) => observer.observe(item));
}
