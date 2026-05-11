import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media">
        <div className="media-placeholder hero-placeholder">
          <span className="placeholder-label">[ BANNER HERO — 1920×1080 / vídeo loop ]</span>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-dot" />
          <span>COLEÇÃO 2026 — RAIZ</span>
        </div>
        <h1 className="hero-title">
          <span className="hero-title-line">A profundidade</span>
          <span className="hero-title-line hero-title-line--italic">do gentil</span>
          <span className="hero-title-line">é o que vence.</span>
        </h1>
        <p className="hero-sub">
          Vestuário e equipamento de jiu jitsu construído para quem entende o ritual do tatame.
        </p>
        <div className="hero-cta">
          <Link href="/raiz" className="btn btn-primary">Comprar Raiz</Link>
          <Link href="/kimono" className="btn btn-ghost">Explorar a marca</Link>
        </div>
      </div>

      <div className="hero-meta">
        <div className="hero-meta-item">
          <span className="meta-num">01</span>
          <span className="meta-label">Edição limitada · 480 peças</span>
        </div>
        <div className="hero-meta-item">
          <span className="meta-num">02</span>
          <span className="meta-label">Algodão pearl weave · 550gsm</span>
        </div>
        <div className="hero-meta-item">
          <span className="meta-num">03</span>
          <span className="meta-label">Costura reforçada IBJJF</span>
        </div>
      </div>
    </section>
  )
}
