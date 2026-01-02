import './style.css'

import { ORDEN } from './orden.js'

const IG = "https://www.instagram.com/ppm._.art/";

// Galería automática: cualquier imagen nueva en src/assets/obras aparece sola
const obraMods = import.meta.glob('./assets/obras/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  as: 'url'
});

const obrasTodas = Object.entries(obraMods).map(([path, url]) => {
  const file = path.split('/').pop();
  return { src: url, file, alt: file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') };
});

// primero las que estén en ORDEN, en ese orden
const obrasOrdenadas = ORDEN
  .map(name => obrasTodas.find(o => o.file === name))
  .filter(Boolean);

// luego el resto
const obras = [
  ...obrasOrdenadas,
  ...obrasTodas.filter(o => !ORDEN.includes(o.file))
];



// Hero (tu etiqueta/logo): pon el archivo en src/assets/branding/
const heroMods = import.meta.glob('./assets/branding/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  as: 'url'
});
// si hay varias, usa la primera; si solo hay una, perfecto
const heroUrl = Object.values(heroMods)[0];
const heroImg = { src: heroUrl, alt: "Logo ppm._.art" };


const app = document.querySelector("#app");

app.innerHTML = `
  <div class="wrap">
    <header class="top">
      <div class="brand">
        <div class="name">ppm._.art</div>
        <div class="tag">Dibujo realista · Port</div>
      </div>
      <nav class="nav">
        <a class="pill" href="#galeria">Galería</a>
        <a class="pill" href="#encargos">Encargos</a>
        <a class="pill" href="${IG}" target="_blank" rel="noreferrer">Instagram</a>
      </nav>
    </header>

    <section class="hero">
      <div class="heroCard">
        <h1>Dibujos realistas.</h1>
        <p class="lead">
          Soy <b>ppm._.art</b>. Aquí podrás encontrar todos mis dibujos.
          Si te apetece una pieza personalizada, escríbeme al DM.
        </p>
        <div class="cta">
          <a class="btn" href="${IG}" target="_blank" rel="noreferrer">Pedir encargo</a>
          <a class="btn ghost" href="#galeria">Ver galería</a>
        </div>
      </div>

      <div class="heroCard preview">
        <img src="${heroImg.src}" alt="${heroImg.alt}" loading="eager">
      </div>

    </section>

    <section id="galeria" class="section">
      <div class="sectionHead">
        <div>
          <h2>Galeria</h2>
          <p>Selección de trabajos.</p>
        </div>
      </div>
      <div class="grid">
        ${obras.map(o => `
          <figure class="piece">
            <img src="${o.src}" alt="${o.alt}" loading="lazy">
          </figure>
        `).join("")}
      </div>
    </section>

    <section id="encargos" class="section">
      <div class="sectionHead">
        <div>
          <h2>Encargos</h2>
          <p>Rápido y claro: me envías foto + tamaño y te digo precio y plazo.</p>
        </div>
      </div>
      <div class="boxes">
        <div class="box">
          <h3>Puedo hacer</h3>
          <ul><li>Paisajes</li><li>Mascotas</li><li>Siluetas</li></ul>
        </div>
        <div class="box">
          <h3>Necesito</h3>
          <ul><li>Foto de buena calidad</li><li>Tamaño</li><li>Fecha aproximada</li></ul>
        </div>
        <div class="box">
          <h3>Entrega</h3>
          <ul><li>Digital o físico</li><li>Avances</li></ul>
        </div>
      </div>
    </section>

    <a class="fab" href="${IG}" target="_blank" rel="noreferrer">Pedir encargo</a>


    <footer class="foot">
      <span>© ${new Date().getFullYear()} ppm._.art</span>
      <span>·</span>
      <a href="${IG}" target="_blank" rel="noreferrer">@ppm._.art</a>
    </footer>
  </div>
`;

// ===== Lightbox Pro (navegación + zoom rueda) =====
const thumbs = Array.from(document.querySelectorAll(".piece img"));
thumbs.forEach(img => { img.style.cursor = "zoom-in"; });

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

function abrirLightbox(startIndex){
  let i = startIndex;
  let z = 1;

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <div class="frame" style="--z:1">
      <div class="lb-counter"></div>
      <button class="lb-close" aria-label="Cerrar">✕</button>
      <button class="lb-btn lb-prev" aria-label="Anterior">‹</button>
      <img alt="">
      <button class="lb-btn lb-next" aria-label="Siguiente">›</button>
      <div class="lb-hint">Rueda: zoom · Flechas: navegar · ESC: cerrar · Doble clic: reset zoom</div>
    </div>
  `;
  document.body.appendChild(lb);

  const frame = lb.querySelector(".frame");
  const img = lb.querySelector("img");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");
  const btnClose = lb.querySelector(".lb-close");
  const counter = lb.querySelector(".lb-counter");


  function render(){
    const t = thumbs[i];

    img.style.opacity = 0;
    img.onload = () => { img.style.opacity = 1; };

    img.src = t.src;
    img.alt = t.alt || "";

    counter.textContent = `${i + 1} / ${thumbs.length}`;

    z = 1;
    frame.style.setProperty("--z", z);
    img.style.cursor = "zoom-in";

    setTimeout(() => img.style.opacity = 1, 40);
  }


  function prev(){ i = (i - 1 + thumbs.length) % thumbs.length; render(); }
  function next(){ i = (i + 1) % thumbs.length; render(); }
  function close(){ lb.remove(); window.removeEventListener("keydown", onKey); }

  function onKey(e){
    if(e.key === "Escape") close();
    if(e.key === "ArrowLeft") prev();
    if(e.key === "ArrowRight") next();
  }

  // Click fuera de la imagen = cerrar
  lb.addEventListener("click", (e) => {
    if(e.target === lb) close();
  });

  btnPrev.onclick = (e) => { e.stopPropagation(); prev(); };
  btnNext.onclick = (e) => { e.stopPropagation(); next(); };
  btnClose.onclick = (e) => { e.stopPropagation(); close(); };

  // Zoom con rueda
  frame.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    // wheel arriba = acercar
    z = clamp(z + (delta > 0 ? -0.12 : 0.12), 1, 3.5);
    frame.style.setProperty("--z", z);
    img.style.cursor = (z > 1) ? "zoom-out" : "zoom-in";
  }, { passive: false });

  // Doble clic = reset zoom
  img.ondblclick = (e) => {
    e.stopPropagation();
    z = 1;
    frame.style.setProperty("--z", z);
    img.style.cursor = "zoom-in";
  };

  window.addEventListener("keydown", onKey);
  render();
}

// Abrir al clicar miniaturas
thumbs.forEach((img, idx) => {
  img.onclick = () => abrirLightbox(idx);
});




