'use client'

import { useState, type FormEvent } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setDone(true)
    setEmail('')
  }

  return (
    <section className="section section--newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <span className="eyebrow eyebrow--light">Receba antes</span>
          <h2 className="newsletter-title">
            Drops, edições limitadas <em>e nada mais.</em>
          </h2>
          <p>Cadastre-se para receber lançamentos e acessos antecipados. Sem spam, prometido.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrap">
            <input
              type="email"
              placeholder="seu@email.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">
              Cadastrar
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {done && (
            <p className="newsletter-success is-visible">Pronto — você está na lista.</p>
          )}
        </form>
      </div>
    </section>
  )
}
