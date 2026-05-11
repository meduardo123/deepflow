'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart, formatBRL } from '../../lib/cart/CartContext'

type Props = {
  id: string
  name: string
  price: number
  desc: string
  href?: string
  tag?: string
  tagAlt?: boolean
}

export default function ProductCard({ id, name, price, desc, href = '/produto', tag, tagAlt }: Props) {
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: 'ADD', item: { id, name, price } })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="product-card">
      <div className="product-media" onClick={() => window.location.href = href} style={{ cursor: 'pointer' }}>
        <div className="media-placeholder product-img">
          <span className="placeholder-label">[ FOTO ]</span>
        </div>
        {tag && (
          <span className={`product-tag${tagAlt ? ' product-tag--alt' : ''}`}>{tag}</span>
        )}
        <button className="product-quick-add" onClick={handleAdd} aria-label="Adicionar ao carrinho">
          {added ? '✓ adicionado' : '+ adicionar'}
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name"><Link href={href}>{name}</Link></h3>
        <p className="product-desc">{desc}</p>
        <p className="product-price">
          {formatBRL(price).replace(',00', '')}<span>,00</span>
        </p>
      </div>
    </article>
  )
}
