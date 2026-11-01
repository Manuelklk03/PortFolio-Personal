// Terminal escribible: el visitante teclea comandos y la web responde y navega.
// Todo se escribe con textContent o elementos creados a mano: nunca se inserta HTML del usuario.
export interface TerminalData {
  name: string;
  role: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string | null;
  about: { key: string; value: string }[];
  stack: { base: string[]; learning: string[] };
  projects: { id: string; title: string; status: string; description: string }[];
  sections: string[];
}

type Line = string | { text: string; href: string };

const COMMANDS = [
  "help",
  "whoami",
  "ls",
  "cat",
  "cd",
  "stack",
  "cv",
  "contacto",
  "clear",
  "history",
  "date",
  "echo",
  "sudo",
  "exit",
];

export function initTerminal(root: HTMLElement, data: TerminalData): void {
  const form = root.querySelector("form");
  const input = root.querySelector("input");
  const output = root.querySelector<HTMLElement>("[data-terminal-output]");
  if (!form || !input || !output) return;

  const history: string[] = [];
  let historyIndex = 0;

  const print = (lines: Line[], className = "text-muted") => {
    for (const line of lines) {
      const item = document.createElement("li");
      item.className = className;
      if (typeof line === "string") {
        item.textContent = line;
      } else {
        const link = document.createElement("a");
        link.href = line.href;
        link.textContent = line.text;
        link.className = "term-select -mx-1 px-1 text-accent";
        if (line.href.startsWith("http")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        item.append(link);
      }
      output.append(item);
    }
    output.scrollTop = output.scrollHeight;
  };

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openProject = (id: string) => {
    const details = root.ownerDocument.querySelector<HTMLDetailsElement>(
      `details[data-project="${CSS.escape(id)}"]`,
    );
    if (!details) return false;
    details.open = true;
    details.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  };

  const run = (raw: string) => {
    const [command = "", ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");

    switch (command) {
      case "":
        return;
      case "help":
        print([
          "help          esta ayuda",
          "whoami        quién soy",
          "ls            proyectos",
          "cat <id>      abre un proyecto (p. ej. cat " +
            (data.projects[0]?.id ?? "proyecto") +
            ")",
          "stack         tecnologías",
          "cd <sección>  ir a sobre-mi, proyectos, stack, cv, contacto o ~",
          "cv            abrir el currículum",
          "contacto      correo, GitHub y LinkedIn",
          "clear         limpiar la pantalla",
        ]);
        return;
      case "whoami":
        print([`${data.name} · ${data.role}`]);
        print(data.about.map((row) => `${row.key.padEnd(12)} ${row.value}`));
        return;
      case "ls":
        print(
          data.projects.map(
            (project) => `${project.id.padEnd(18)} [${project.status}]`,
          ),
        );
        return;
      case "cat": {
        if (!arg) return print(["uso: cat <proyecto>  (prueba 'ls')"]);
        if (arg === "cv" || arg === "curriculum.pdf") return run("cv");
        const project = data.projects.find((p) => p.id === arg);
        if (!project || !openProject(project.id)) {
          return print([`cat: ${arg}: no existe el archivo o directorio`]);
        }
        print([`${project.title}: ${project.description}`]);
        return;
      }
      case "stack":
        print([`base         ${data.stack.base.join(" · ")}`]);
        print([`aprendiendo  ${data.stack.learning.join(" · ")}`]);
        return;
      case "cd": {
        const target = arg.replace(/^~?\/?/, "").replace(/\/$/, "");
        if (!target) {
          goTo("inicio");
          return;
        }
        if (!data.sections.includes(target)) {
          return print([`cd: ${arg}: no existe el directorio`]);
        }
        goTo(target);
        return;
      }
      case "cv":
        if (!data.cvUrl) return print(["cv: todavía no hay currículum publicado"]);
        print([{ text: "↗ abrir curriculum.pdf", href: data.cvUrl }]);
        window.open(data.cvUrl, "_blank", "noopener");
        return;
      case "contacto":
        print([
          { text: data.email, href: `mailto:${data.email}` },
          { text: "github", href: data.github },
          { text: "linkedin", href: data.linkedin },
        ]);
        return;
      case "clear":
        output.replaceChildren();
        return;
      case "history":
        print(history.map((entry, index) => `${String(index + 1).padStart(3)}  ${entry}`));
        return;
      case "date":
        print([new Date().toLocaleString("es-ES")]);
        return;
      case "echo":
        print([arg]);
        return;
      // Easter eggs
      case "sudo":
        print(
          [`${data.name.split(" ")[0]?.toLowerCase()} no está en el archivo sudoers. Este incidente será reportado.`],
          "text-accent",
        );
        return;
      case "rm":
        print(["buen intento. Aquí no se borra nada."], "text-accent");
        return;
      case "exit":
        print(["no hay salida: ya estás dentro del portfolio."], "text-accent");
        return;
      case "vim":
      case "nano":
        print(["mejor no: nadie sabe cómo salir de ahí. Prueba 'help'."], "text-accent");
        return;
      default:
        print([`bash: ${command}: orden no encontrada. Prueba 'help'.`]);
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value;
    print([`$ ${value}`], "text-foreground");
    if (value.trim()) history.push(value.trim());
    historyIndex = history.length;
    input.value = "";
    run(value.toLowerCase());
  });

  // Flechas para el historial y Tab para autocompletar, como en una terminal de verdad.
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] ?? "";
    } else if (event.key === "ArrowDown" && history.length) {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] ?? "";
    } else if (event.key === "Tab" && input.value.trim()) {
      const [command = "", ...rest] = input.value.trimStart().split(/\s+/);
      const options = rest.length
        ? (command === "cat" ? data.projects.map((p) => p.id) : command === "cd" ? data.sections : [])
            .filter((option) => option.startsWith(rest.join(" ")))
            .map((option) => `${command} ${option}`)
        : COMMANDS.filter((option) => option.startsWith(command));
      if (options.length === 1) {
        event.preventDefault();
        input.value = `${options[0]} `;
      }
    }
  });

  // Clic en cualquier parte de la terminal: el cursor va al campo de texto.
  root.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) input.focus({ preventScroll: true });
  });
}
