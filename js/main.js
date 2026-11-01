// Tema claro/escuro (lembra a escolha; usa a preferência do sistema na primeira visita)
const raiz = document.documentElement;
let tema = "dark";
try {
  tema = localStorage.getItem("tema") || "dark";
} catch (e) { /* sem localStorage: segue com o tema claro */ }
raiz.dataset.theme = tema;

document.getElementById("tema").addEventListener("click", () => {
  const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
  raiz.dataset.theme = novo;
  try { localStorage.setItem("tema", novo); } catch (e) {}
});

// Menu do celular
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
function fecharMenu() {
  menu.classList.remove("aberto");
  burger.setAttribute("aria-expanded", "false");
}
burger.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  burger.setAttribute("aria-expanded", String(aberto));
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", fecharMenu));

// Filtro de projetos
const chips = document.querySelectorAll(".chip");
const projetos = document.querySelectorAll(".proj[data-tech]");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("ativo"));
  chip.classList.add("ativo");
  const filtro = chip.dataset.filtro;
  projetos.forEach(p => { p.hidden = filtro !== "todos" && !p.dataset.tech.includes(filtro); });
}));

// Destaca no menu a seção que está na tela
const links = document.querySelectorAll("#menu a");
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("ativo", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => observador.observe(s));

// Ano no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Ampliar as fotos dos eventos
const zoom = document.getElementById("zoom");
if (zoom && zoom.showModal) {
  document.querySelectorAll(".foto-ev img").forEach(img => img.addEventListener("click", () => {
    zoom.querySelector("img").src = img.src;
    zoom.querySelector("img").alt = img.alt;
    zoom.showModal();
  }));
  zoom.addEventListener("click", () => zoom.close());
}

// Brilho de LED que segue o mouse nas molduras
document.querySelectorAll(".foto, .foto-ev, .print").forEach(el => {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
    el.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
  });
});