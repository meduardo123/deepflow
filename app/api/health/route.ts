import { NextResponse } from 'next/server'

import { createClient } from '../../../lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    if (error) {
      throw error
    }

    return NextResponse.json({ ok: true, count: count ?? 0 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
