import Hero from '../components/home/Hero'
import ManifestoTicker from '../components/home/ManifestoTicker'
import Categories from '../components/home/Categories'
import ProductsGrid from '../components/home/ProductsGrid'
import Editorial from '../components/home/Editorial'
import Pillars from '../components/home/Pillars'
import Newsletter from '../components/home/Newsletter'

const lancamentos = [
  { id: 'prod-1', name: 'Kimono Raiz Pearl Weave', price: 1290, desc: 'Branco · 550gsm', href: '/produto/kimono-raiz-pearl-weave', tag: 'NOVO' },
  { id: 'prod-2', name: 'Rash Guard Profundo M/L', price: 349,  desc: 'Compressão técnica · UV50+', href: '/produto/rashguard-profundo' },
  { id: 'prod-3', name: 'Faixa Oficial Deepflow',  price: 259,  desc: 'Preta · ponta bordada', href: '/produto/faixa-oficial' },
  { id: 'prod-4', name: 'Camiseta Fluir',          price: 189,  desc: 'Off-white · algodão pima', href: '/produto/camiseta-fluir', tag: 'EDIÇÃO', tagAlt: true },
]

const destaques = [
  { id: 'prod-5', name: 'Kimono Training',  price: 890, desc: 'Azul · 450gsm',       href: '/produto/kimono-training' },
  { id: 'prod-6', name: 'Mochila Multibag', price: 479, desc: 'Preta · 50L',          href: '/produto/mochila-multibag' },
  { id: 'prod-7', name: 'Shorts Grappling', price: 249, desc: 'Preto · elastano',     href: '/produto/shorts-grappling' },
  { id: 'prod-8', name: 'Camiseta Triangle',price: 179, desc: 'Marinho · algodão pima', href: '/produto/camiseta-triangle' },
]

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ManifestoTicker />
      <Categories />
      <ProductsGrid
        eyebrow="Lançamentos"
        title="Acabaram de chegar"
        seeAllHref="/kimono"
        products={lancamentos}
      />
      <Editorial />
      <ProductsGrid
        eyebrow="Destaques"
        title="Mais procurados"
        seeAllHref="/kimono"
        products={destaques}
      />
      <Pillars />
      <Newsletter />
    </main>
  )
}
