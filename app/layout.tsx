import type { Metadata, Viewport } from 'next'
import { Great_Vibes, Playfair_Display } from 'next/font/google'
import './globals.css'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Loiros Impecáveis — Método Profissional de Coloração',
    template: '%s | Loiros Impecáveis',
  },
  description:
    'Domine as técnicas mais avançadas de loiro. Método exclusivo para cabeleireiras que querem transformar sua carreira, lotar a agenda e multiplicar o faturamento.',
  keywords: ['curso loiro perfeito', 'coloração profissional', 'loiros impecáveis', 'técnica de loiro', 'curso cabeleireira'],
  authors: [{ name: 'Loiros Impecáveis' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Loiros Impecáveis',
    title: 'Loiros Impecáveis — Método Profissional',
    description: 'Domine as técnicas mais avançadas de loiro.',
  },
}

export const viewport: Viewport = {
  themeColor: '#F5EDE6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${greatVibes.variable} ${playfair.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/glacial-indifference-2" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
