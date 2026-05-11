'use client'

import { useEffect } from 'react'
import { useCart, formatBRL } from '../../lib/cart/CartContext'

export default function CartDrawer() {
  const { state, dispatch } = useCart()
  const { items, isCartOpen } = state
  const totalQty = items.reduce((acc, i) => acc + i.qty, 0)
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  useEffect(() => {
    document.body.style.overflow = (isCartOpen || state.isMobileOpen) ? 'hidden' : ''
  }, [isCartOpen, state.isMobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE_CART' })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dispatch])

  return (
    <>
      <div
        className={`overlay${isCartOpen ? ' is-visible' : ''}`}
        onClick={() => dispatch({ type: 'CLOSE_CART' })}
      />

      <aside className={`cart-drawer${isCartOpen ? ' is-open' : ''}`}>
        <header className="cart-head">
          <h3>Seu carrinho <span>({totalQty})</span></h3>
          <button className="cart-close" onClick={() => dispatch({ type: 'CLOSE_CART' })} aria-label="Fechar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 7h14l-1.5 11.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 7z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              <p>Seu carrinho está vazio.</p>
              <button className="btn btn-ghost" onClick={() => dispatch({ type: 'CLOSE_CART' })}>
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="cart-items">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>Tamanho: A2 · Branco</p>
                    <div className="cart-item-qty">
                      <button
                        aria-label="Diminuir"
                        onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}
                      >−</button>
                      <span>{item.qty}</span>
                      <button
                        aria-label="Aumentar"
                        onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}
                      >+</button>
                    </div>
                  </div>
                  <div className="cart-item-side">
                    <span className="cart-item-price">{formatBRL(item.price * item.qty)}</span>
                    <button
                      className="cart-item-remove"
                      onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                    >Remover</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-foot is-visible">
            <div className="cart-row">
              <span>Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <p className="cart-note">Frete e cupons calculados no checkout.</p>
            <a href="/checkout" className="btn btn-primary btn-block">Finalizar compra</a>
          </footer>
        )}
      </aside>
    </>
  )
}
