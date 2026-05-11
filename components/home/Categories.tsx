import Link from 'next/link'

const categories = [
  { href: '/kimono',    num: '01', label: 'Kimonos',    photo: 'Kimono 800×1000',  tall: true },
  { href: '/rashguard', num: '02', label: 'Rash Guard', photo: 'Rash Guard',       tall: false },
  { href: '/casual',    num: '03', label: 'Casual',     photo: 'Casual',           tall: false },
  { href: '/acessorios',num: '04', label: 'Acessórios', photo: 'Acessórios',       tall: true },
]

export default function Categories() {
  return (
    <section className="section section--categories">
      <header className="section-head">
        <span className="eyebrow">Categorias</span>
        <h2 className="section-title">O essencial para <em>quem treina</em></h2>
      </header>

      <div className="categories-grid">
        {categories.map(c => (
          <Link
            key={c.href}
            href={c.href}
            className={`category-card${c.tall ? ' category-card--tall' : ''}`}
          >
            <div className="media-placeholder category-img">
              <span className="placeholder-label">[ FOTO — {c.photo} ]</span>
            </div>
            <div className="category-info">
              <span className="category-num">{c.num}</span>
              <h3>{c.label}</h3>
              <span className="link-arrow">Ver linha →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
