'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../lib/cart/CartContext'

export default function MobileMenu() {
  const { state, dispatch } = useCart()
  const { isMobileOpen } = state

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_MOBILE' })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dispatch])

  return (
    <>
      {isMobileOpen && (
        <div
          className="overlay is-visible"
          style={{ zIndex: 85 }}
          onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}
        />
      )}
      <aside className={`mobile-menu${isMobileOpen ? ' is-open' : ''}`}>
        <header className="mobile-menu-head">
          <Image src="/logo.svg" alt="Deepflow" width={100} height={16} className="mobile-menu-logo" />
          <button className="cart-close" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
        <nav className="mobile-nav">
          <Link href="/kimono" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Kimono</Link>
          <Link href="/rashguard" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Rash Guard</Link>
          <Link href="/casual" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Casual</Link>
          <Link href="/acessorios" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Acessórios</Link>
          <Link href="/raiz" className="mobile-nav-accent" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>
            Raiz — Nova Coleção
          </Link>
          <div className="mobile-nav-divider" />
          <Link href="/entrar" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Entrar / Cadastrar</Link>
          <Link href="/conta/pedidos" onClick={() => dispatch({ type: 'CLOSE_MOBILE' })}>Meus pedidos</Link>
          <a href="#">Fale conosco</a>
        </nav>
      </aside>
    </>
  )
}
