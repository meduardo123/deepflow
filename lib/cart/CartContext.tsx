'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

type State = {
  items: CartItem[]
  isCartOpen: boolean
  isMobileOpen: boolean
}

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'OPEN_MOBILE' }
  | { type: 'CLOSE_MOBILE' }
  | { type: 'HYDRATE'; items: CartItem[] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items }
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      const items = existing
        ? state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.item, qty: 1 }]
      return { ...state, items, isCartOpen: true }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY': {
      if (action.qty <= 0) return { ...state, items: state.items.filter(i => i.id !== action.id) }
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i) }
    }
    case 'OPEN_CART':    return { ...state, isCartOpen: true }
    case 'CLOSE_CART':   return { ...state, isCartOpen: false }
    case 'OPEN_MOBILE':  return { ...state, isMobileOpen: true }
    case 'CLOSE_MOBILE': return { ...state, isMobileOpen: false }
    default:             return state
  }
}

const CartContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    isCartOpen: false,
    isMobileOpen: false,
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('deepflow_cart')
      if (saved) dispatch({ type: 'HYDRATE', items: JSON.parse(saved) as CartItem[] })
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('deepflow_cart', JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

export function formatBRL(n: number) {
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
