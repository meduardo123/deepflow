'use client'

import { FormEvent, useState } from 'react'

type CreateProductResponse = {
  ok: boolean
  error?: string
  warning?: string | null
  product?: {
    id?: string
    slug?: string
    name?: string
    base_price?: number
  }
}

export default function NewProductPage() {
  const [name, setName] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          base_price: Number(basePrice),
          slug: slug || undefined,
          description,
          image_url: imageUrl
        })
      })

      const result = (await response.json()) as CreateProductResponse

      if (!response.ok || !result.ok) {
        setIsError(true)
        setMessage(result.error ?? 'Não foi possível salvar o produto.')
        return
      }

      setMessage(result.warning ?? `Produto "${result.product?.name}" cadastrado (slug: ${result.product?.slug}).`)
      setIsError(Boolean(result.warning))
      setName('')
      setBasePrice('')
      setSlug('')
      setDescription('')
      setImageUrl('')
    } catch (error) {
      setIsError(true)
      setMessage(error instanceof Error ? error.message : 'Erro inesperado ao enviar formulário.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: 8 }}>Novo produto</h1>
      <p style={{ marginTop: 0, color: '#444' }}>
        Slug é gerado automaticamente a partir do nome se deixado em branco.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Nome *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ex: Kimono Raiz Pearl Weave"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Preço base (R$) *
          <input
            type="number"
            min="0"
            step="0.01"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
            placeholder="Ex: 890.00"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Slug (opcional)
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="kimono-raiz-pearl-weave"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Descrição curta do produto"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          URL da imagem
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="/produtos/agasalho_01.png ou https://..."
            style={{ padding: 10 }}
          />
        </label>

        <button type="submit" disabled={isSubmitting} style={{ padding: '10px 14px', cursor: 'pointer' }}>
          {isSubmitting ? 'Salvando...' : 'Salvar produto'}
        </button>
      </form>

      {message ? (
        <p style={{ marginTop: 16, color: isError ? '#b00020' : '#116329' }}>
          {message}
        </p>
      ) : null}
    </main>
  )
}
