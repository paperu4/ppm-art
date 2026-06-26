'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Gallery({ obras }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoom, setZoom] = useState(1)
  const active = activeIndex === null ? null : obras[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return

    function onKey(event) {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + obras.length) % obras.length)
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % obras.length)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, obras.length])

  function open(index) {
    setActiveIndex(index)
    setZoom(1)
  }

  function move(step) {
    if (activeIndex === null) return
    setActiveIndex((activeIndex + step + obras.length) % obras.length)
    setZoom(1)
  }

  function onWheel(event) {
    event.preventDefault()
    const nextZoom = zoom + (event.deltaY > 0 ? -0.12 : 0.12)
    setZoom(Math.max(1, Math.min(3.5, nextZoom)))
  }

  return (
    <>
      <div className="grid">
        {obras.map((obra, index) => (
          <figure className="piece" key={obra.file}>
            <button type="button" onClick={() => open(index)} aria-label={`Abrir ${obra.title}`}>
              <Image src={obra.src} alt={obra.alt} sizes="(max-width: 520px) 100vw, (max-width: 980px) 50vw, 33vw" />
            </button>
            <figcaption>{obra.title}</figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActiveIndex(null)}>
          <div className="frame" onClick={(event) => event.stopPropagation()} onWheel={onWheel}>
            <div className="lb-counter">{activeIndex + 1} / {obras.length}</div>
            <button className="lb-close" type="button" aria-label="Cerrar" onClick={() => setActiveIndex(null)}>x</button>
            <button className="lb-btn lb-prev" type="button" aria-label="Anterior" onClick={() => move(-1)}>‹</button>
            <Image
              src={active.src}
              alt={active.alt}
              className="lightbox-image"
              sizes="100vw"
              style={{ transform: `scale(${zoom})` }}
              onDoubleClick={() => setZoom(1)}
            />
            <button className="lb-btn lb-next" type="button" aria-label="Siguiente" onClick={() => move(1)}>›</button>
            <div className="lb-hint">Rueda: zoom · Flechas: navegar · ESC: cerrar · Doble clic: reset zoom</div>
          </div>
        </div>
      )}
    </>
  )
}
