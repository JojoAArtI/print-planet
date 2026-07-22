import type { Metadata, Viewport } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { headers } from 'next/headers';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const BASE_URL = 'https://printplanet.in'; // Assuming Indian country code based on number format

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Print Planet — Premium Custom Printing & Corporate Merchandise',
    template: '%s | Print Planet',
  },

  description:
    'Print Planet is your premier printing destination. We turn your memories and creative visions into reality with high-quality custom apparel, personalized mugs, photo frames, school uniforms, and bespoke corporate merchandise.',

  keywords: [
    'Print Planet',
    'custom printing',
    'customized t-shirts',
    'personalized mugs',
    'custom caps',
    'photo frames customization',
    'water bottle printing',
    'school uniform shirts',
    'school uniform dress',
    'student ID cards',
    'corporate merchandise printing',
    'custom keychains',
    'printed mouse pads',
    'mobile back covers customization',
    'custom gift items',
    'premium business printing',
    'DTF printing garments',
    'sublimation printing cups',
    'embroidery caps and sweatshirts',
    'printing shop online',
  ],

  authors: [{ name: 'Print Planet', url: BASE_URL }],
  creator: 'Print Planet',
  publisher: 'Print Planet',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
    ],
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Print Planet',
    title: 'Print Planet — Premium Custom Printing & Corporate Merchandise',
    description:
      'Turn your memories into reality. Print Planet specializes in high-quality custom apparel, drinkware, photo frames, tech accessories, school dress, and custom corporate gifts.',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Print Planet — Premium Custom Printing & Corporate Merchandise',
    description:
      'Premium custom printing for apparel, mugs, photo frames, and corporate merchandise. Fast delivery, superior quality, and competitive bulk pricing.',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'business',

  other: {
    'theme-color': '#0A0A0A',
    'msapplication-TileColor': '#0A0A0A',
    'application-name': 'Print Planet',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

/* ── Structured data — single @graph so every entity cross-references ── */

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Print Planet',
  image: `${BASE_URL}/logo_white.png`,
  url: BASE_URL,
  telephone: '+918292349048',
  email: 'onezero1solutions@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  description:
    'Print Planet is a premier customized printing business dedicated to transforming your creative visions into tangible reality. We personalize custom t-shirts, sweatshirts, caps, mugs, bottles, photo frames, keychains, mouse pads, ID cards, and school uniforms.',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/printplanet',
    'https://www.instagram.com/printplanet',
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <html lang="en" className={instrumentSerif.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
