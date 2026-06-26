import Script from 'next/script'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://ppm-art.vercel.app'),
  title: {
    default: 'ppm._.art | Dibujos realistas y encargos personalizados',
    template: '%s | ppm._.art',
  },
  description:
    'Portafolio de dibujos realistas de ppm._.art. Galeria de obras a lapiz y encargos personalizados por Instagram.',
  keywords: [
    'ppm art',
    'dibujos realistas',
    'encargos de dibujos',
    'retratos a lapiz',
    'arte personalizado',
  ],
  openGraph: {
    title: 'ppm._.art | Dibujos realistas',
    description: 'Galeria de dibujos realistas y encargos personalizados.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L9NY76QLBV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L9NY76QLBV');
          `}
        </Script>
      </body>
    </html>
  )
}
