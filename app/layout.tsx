import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Montserrat, Great_Vibes } from 'next/font/google'

// Configura a Montserrat para textos e botões
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

// Configura a Great Vibes para os títulos e detalhes elegantes
const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

export const metadata: Metadata = {
  // ── Alterado para a versão com WWW ─────────────────────────────────────────
  metadataBase: new URL('https://www.solangejesusacademy.com.br'),

  title: {
    default: 'Mechas Sem Medo | Solange Jesus Academy',
    template: '%s | Solange Jesus Academy',
  },
  description:
    'Aprenda uma técnica de mechas sem usar pó descolorante e elimine de uma vez o medo do corte químico e manchas. Torne-se especialista e lote sua agenda!',
  keywords: ['curso loiro perfeito', 'coloração profissional', 'loiros impecáveis', 'técnica de loiro', 'curso cabeleireira'],
  authors: [{ name: 'Solange Jesus Academy' }],

  // ── Canonical alinhado com a URL atual (com www) ───────────────────────────
  alternates: {
    canonical: 'https://www.solangejesusacademy.com.br',
  },

  robots: { index: true, follow: true },

  icons: {
    icon: '/sol_favicon.ico',
    shortcut: '/sol_favicon.ico',
    apple: '/sol_favicon.ico',
  },

  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Solange Jesus Academy',
    title: 'Mechas Sem Medo | Solange Jesus Academy',
    description:
      'Aprenda uma técnica de mechas sem usar pó descolorante e elimine de uma vez o medo do corte químico e manchas. Torne-se especialista e lote sua agenda!',
    url: 'https://www.solangejesusacademy.com.br',
    images: [
      {
        url: 'https://www.solangejesusacademy.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Solange Jesus Academy',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mechas Sem Medo | Solange Jesus Academy',
    description:
      'Aprenda uma técnica de mechas sem usar pó descolorante e elimine de uma vez o medo do corte químico e manchas. Torne-se especialista e lote sua agenda!',
    images: ['https://www.solangejesusacademy.com.br/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#4A3628',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${greatVibes.variable} ${montserrat.variable}`}>
      <head>
        {/* ── Meta Pixel (Facebook Ads) ── */}
        <Script id="facebook-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1861368957871560');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Fallback para navegadores sem JavaScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1861368957871560&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`antialiased ${montserrat.className}`}>{children}</body>
    </html>
  )
}