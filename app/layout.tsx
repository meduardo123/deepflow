import type { ReactNode } from 'react'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'

import { CartProvider } from '../lib/cart/CartContext'
import AnnouncementBar from '../components/home/AnnouncementBar'
import Header from '../components/layout/Header'
import CartDrawer from '../components/layout/CartDrawer'
import MobileMenu from '../components/layout/MobileMenu'
import Footer from '../components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata = {
  title: 'DEEPFLOW — Jiu Jitsu Apparel',
  description: 'Deepflow. Vestuário e equipamento para quem entende que o jiu jitsu é mais do que esporte.',
  icons: { icon: '/icone.svg' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <MobileMenu />
        </CartProvider>
      </body>
    </html>
  )
}
