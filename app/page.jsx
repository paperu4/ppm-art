import Image from 'next/image'
import Gallery from './gallery'
import { IG, brandImage, obras } from '../src/gallery-data'

const featured = obras.slice(0, 3)

export default function Home() {
  return (
    <main className="wrap">
      <header className="top">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="name">ppm._.art</span>
          <span className="tag">Grafito, detalle y encargos</span>
        </a>
        <nav className="nav" aria-label="Navegacion principal">
          <a className="pill" href="#galeria">Galeria</a>
          <a className="pill" href="#proceso">Proceso</a>
          <a className="pill pill-dark" href={IG} target="_blank" rel="noreferrer">Instagram</a>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="heroCard hero-copy">
          <p className="eyebrow">Dibujo realista hecho a mano</p>
          <h1>Retratos y animales dibujados con paciencia de taller.</h1>
          <p className="lead">
            Soy <strong>ppm._.art</strong>. Trabajo cada encargo desde una referencia clara hasta una pieza con textura, contraste y una presencia tranquila.
          </p>
          <div className="cta">
            <a className="btn" href={IG} target="_blank" rel="noreferrer">Pedir por Instagram</a>
            <a className="btn ghost" href="#galeria">Ver obra</a>
          </div>
          <div className="stats" aria-label="Resumen del portafolio">
            <span><strong>{obras.length}</strong> obras en galeria</span>
            <span><strong>Lapiz</strong> detalle sobre papel</span>
            <span><strong>DM</strong> encargos abiertos</span>
          </div>
        </div>

        <div className="heroCard preview">
          <span className="studio-label">mesa de dibujo</span>
          <div className="brand-frame">
            <Image src={brandImage.src} alt={brandImage.alt} priority sizes="(max-width: 980px) 100vw, 40vw" />
          </div>
          <p className="margin-note">La referencia no se copia: se interpreta con luz, sombra y borde.</p>
        </div>
      </section>

      <section className="featured" aria-label="Obras destacadas">
        {featured.map((obra) => (
          <article className="featured-card" key={obra.file}>
            <Image src={obra.src} alt={obra.alt} sizes="(max-width: 760px) 33vw, 220px" />
            <span>{obra.title}</span>
          </article>
        ))}
      </section>

      <section id="galeria" className="section">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">Galeria</p>
            <h2>Una pared de estudios terminados</h2>
            <p>Abre cualquier dibujo para verlo sin distracciones y revisar el detalle.</p>
          </div>
          <a className="text-link" href={IG} target="_blank" rel="noreferrer">Ver novedades en Instagram</a>
        </div>
        <Gallery obras={obras} />
      </section>

      <section id="proceso" className="section split">
        <div>
          <p className="eyebrow">Encargos</p>
          <h2>Del mensaje a la lamina final</h2>
          <p className="lead compact">Enviame una foto con buena luz, dime el tamano que quieres y te respondo con precio, plazo y detalles.</p>
        </div>
        <div className="boxes">
          <div className="box">
            <span className="box-mark">Referencia</span>
            <h3>Foto con buena luz</h3>
            <p>Cuanto mejor sea la referencia, mas fiel sera el resultado.</p>
          </div>
          <div className="box">
            <span className="box-mark">Encuadre</span>
            <h3>Formato y composicion</h3>
            <p>Te confirmo composicion y formato antes de avanzar.</p>
          </div>
          <div className="box">
            <span className="box-mark">Cierre</span>
            <h3>Avances y entrega</h3>
            <p>Recibes avances y el dibujo final digital o fisico.</p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <span className="cta-stamp">ppm._.art</span>
        <h2>Si tienes una foto especial, puede convertirse en una pieza lenta y cuidada.</h2>
        <a className="btn" href={IG} target="_blank" rel="noreferrer">Abrir Instagram</a>
      </section>

      <a className="fab" href={IG} target="_blank" rel="noreferrer">Seguir @ppm._.art</a>

      <footer className="foot">
        <span>© {new Date().getFullYear()} ppm._.art</span>
        <span>·</span>
        <a href={IG} target="_blank" rel="noreferrer">Instagram</a>
      </footer>
    </main>
  )
}
