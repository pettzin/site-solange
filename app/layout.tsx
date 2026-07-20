import type { Metadata, Viewport } from 'next'
import { Great_Vibes, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
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
  icons: {
    icon: '/sol_favicon.ico',
    shortcut: '/sol_favicon.ico',
    apple: '/sol_favicon.ico',
  },
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

        {/* ── Meta Pixel (Facebook Ads) ── */}
        <Script id="facebook-pixel" strategy="afterInteractive">
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
      <body className="antialiased">{children}</body>
    </html>
  )
}