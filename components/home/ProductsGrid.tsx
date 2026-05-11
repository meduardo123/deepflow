import Link from 'next/link'
import ProductCard from '../shop/ProductCard'

type Product = {
  id: string
  name: string
  price: number
  desc: string
  href?: string
  tag?: string
  tagAlt?: boolean
}

type Props = {
  eyebrow: string
  title: string
  seeAllHref: string
  products: Product[]
}

export default function ProductsGrid({ eyebrow, title, seeAllHref, products }: Props) {
  return (
    <section className="section section--products">
      <header className="section-head section-head--row">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
        </div>
        <Link href={seeAllHref} className="link-arrow link-arrow--lg">Ver tudo →</Link>
      </header>

      <div className="products-grid">
        {products.map(p => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  )
}
