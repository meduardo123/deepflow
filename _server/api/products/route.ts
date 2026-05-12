import { NextResponse } from 'next/server'

import { createClient } from '../../../lib/supabase/server'

type ProductPayload = {
  name?: string
  base_price?: number
  description?: string
  image_url?: string
  slug?: string
  category_id?: string
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function isValidImageUrl(value: string) {
  return value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductPayload

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const base_price = typeof body.base_price === 'number' ? body.base_price : Number(body.base_price)
    const description = typeof body.description === 'string' ? body.description.trim() : ''
    const imageUrl = typeof body.image_url === 'string' ? body.image_url.trim() : ''
    const slug = typeof body.slug === 'string' && body.slug.trim() ? body.slug.trim() : toSlug(name)
    const category_id = typeof body.category_id === 'string' ? body.category_id : null

    if (!name) {
      return NextResponse.json({ ok: false, error: 'Nome do produto é obrigatório.' }, { status: 400 })
    }

    if (!Number.isFinite(base_price) || base_price < 0) {
      return NextResponse.json({ ok: false, error: 'Preço inválido.' }, { status: 400 })
    }

    if (imageUrl && !isValidImageUrl(imageUrl)) {
      return NextResponse.json(
        { ok: false, error: 'URL da imagem inválida. Use /caminho ou http(s)://...' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .insert([{
        name,
        slug,
        base_price,
        ...(description ? { description } : {}),
        ...(category_id ? { category_id } : {})
      }])
      .select('*')
      .single()

    if (error) {
      const isDuplicate = error.code === '23505'
      return NextResponse.json(
        { ok: false, error: isDuplicate ? `Slug "${slug}" já existe. Envie um slug diferente.` : error.message },
        { status: isDuplicate ? 409 : 500 }
      )
    }

    let warning: string | null = null

    if (imageUrl && data?.id) {
      const { error: imgError } = await supabase
        .from('product_images')
        .insert([{ product_id: data.id, url: imageUrl, position: 0 }])

      if (imgError) {
        warning = imgError.message
      }
    }

    return NextResponse.json({ ok: true, product: data, warning }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
