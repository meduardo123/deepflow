import Link from 'next/link'

export default function Editorial() {
  return (
    <section className="section section--editorial">
      <div className="editorial-grid">
        <div className="editorial-text">
          <span className="eyebrow eyebrow--light">Coleção Raiz</span>
          <h2 className="editorial-title">
            Antes da <em>técnica</em>,<br />
            o silêncio.
          </h2>
          <p className="editorial-body">
            A coleção Raiz é uma homenagem ao começo de tudo. Linhas sóbrias, gramaturas honestas,
            costuras à vista. O kimono é uma peça de identidade — Raiz devolve a ele a gravidade que merece.
          </p>
          <Link href="/raiz" className="btn btn-primary btn-primary--invert">Explorar Raiz</Link>
        </div>
        <div className="editorial-media">
          <div className="media-placeholder editorial-img-main">
            <span className="placeholder-label">[ FOTO EDITORIAL — 800×1100 ]</span>
          </div>
          <div className="media-placeholder editorial-img-small">
            <span className="placeholder-label">[ FOTO — 400×400 ]</span>
          </div>
        </div>
      </div>
    </section>
  )
}
