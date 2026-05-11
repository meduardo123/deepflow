'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../lib/cart/CartContext'

export default function Header() {
  const { state, dispatch } = useCart()
  const totalQty = state.items.reduce((acc, i) => acc + i.qty, 0)
  const headerRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return
      headerRef.current.classList.toggle('scrolled', window.scrollY > 12)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showMega = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    megaRef.current?.classList.add('is-open')
  }
  const hideMega = () => {
    timerRef.current = setTimeout(() => megaRef.current?.classList.remove('is-open'), 120)
  }

  return (
    <header className="header" id="header" ref={headerRef}>
      <div className="header-inner">
        <div className="header-left">
          <button
            className="hamburger"
            aria-label="Menu"
            onClick={() => dispatch({ type: 'OPEN_MOBILE' })}
          >
            <span /><span /><span />
          </button>
          <nav className="nav-desktop">
            <Link href="/kimono" className="nav-link" onMouseEnter={showMega} onMouseLeave={hideMega}>KIMONO</Link>
            <Link href="/rashguard" className="nav-link" onMouseEnter={showMega} onMouseLeave={hideMega}>RASH GUARD</Link>
            <Link href="/casual" className="nav-link" onMouseEnter={showMega} onMouseLeave={hideMega}>CASUAL</Link>
            <Link href="/acessorios" className="nav-link" onMouseEnter={showMega} onMouseLeave={hideMega}>ACESSÓRIOS</Link>
            <Link href="/raiz" className="nav-link nav-link--accent">RAIZ</Link>
          </nav>
        </div>

        <Link href="/" className="logo" aria-label="Deepflow">
          <Image src="/logo.svg" alt="Deepflow" width={120} height={18} priority />
        </Link>

        <div className="header-right">
          <button className="header-btn" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <Link href="/entrar" className="header-btn header-btn--label" aria-label="Conta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
            <span>Entrar</span>
          </Link>
          <button
            className={`header-btn header-btn--cart${totalQty > 0 ? ' has-items' : ''}`}
            aria-label="Carrinho"
            onClick={() => dispatch({ type: 'OPEN_CART' })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 7h14l-1.5 11.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 7z" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="cart-count">{totalQty}</span>
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        className="mega-menu"
        id="megaMenu"
        ref={megaRef}
        onMouseEnter={showMega}
        onMouseLeave={hideMega}
      >
        <div className="mega-menu-inner">
          <div className="mega-col">
            <h4>Kimonos</h4>
            <ul>
              <li><a href="#">Linha Pro Competition</a></li>
              <li><a href="#">Linha Training</a></li>
              <li><a href="#">Linha Light</a></li>
              <li><a href="#">Kimono Infantil</a></li>
              <li><a href="#">Faixas Oficiais</a></li>
            </ul>
          </div>
          <div className="mega-col">
            <h4>Por Cor</h4>
            <ul>
              <li><a href="#">Branco</a></li>
              <li><a href="#">Preto</a></li>
              <li><a href="#">Azul</a></li>
              <li><a href="#">Cinza Estonado</a></li>
            </ul>
          </div>
          <div className="mega-col">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Guia de Tamanhos</a></li>
              <li><a href="#">Cuidados e Lavagem</a></li>
              <li><a href="#">Sobre Tecidos</a></li>
            </ul>
          </div>
          <div className="mega-col mega-col--feature">
            <div className="mega-feature">
              <div className="mega-feature-img" />
              <div className="mega-feature-text">
                <span className="eyebrow">Destaque</span>
                <p>Kimono Raiz — edição limitada em algodão pearl weave 550gsm.</p>
                <a href="/raiz" className="link-arrow">Ver coleção →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
