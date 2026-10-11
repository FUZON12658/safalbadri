import type { Metadata, Viewport } from 'next';
import { Archivo, Noto_Sans_Devanagari } from 'next/font/google';
import { LangProvider } from '@/lib/lang';
import { SITE_URL } from '@/content/site';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--font-archivo', display: 'swap' });
const deva = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['400', '600', '800'], variable: '--font-deva', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Badri Raj Timalsina — Journalist, media entrepreneur, philanthropist', template: '%s — Badri Raj Timalsina' },
  description: 'Twenty-four years of journalism, service and enterprise, built in Nepal and for Nepal. Lahachhap.com, Best FM 88.1, Praramva and more.',
  keywords: ['Badri Raj Timalsina', 'बद्रिराज तिमल्सिना', 'Lahachhap', 'Praramva', 'Best FM 88.1', 'Nepali journalist', 'Kavre'],
  authors: [{ name: 'Badri Raj Timalsina' }],
  openGraph: {
    type: 'website',
    siteName: 'Badri Raj Timalsina',
    locale: 'en_US',
    alternateLocale: ['ne_NP'],
    images: [{ url: '/images/badri/portrait-desk.jpg', width: 1920, height: 1104, alt: 'Portrait of Badri Raj Timalsina' }],
  },
  twitter: { card: 'summary_large_image', site: '@safalbadri' },
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#9b2f40',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${deva.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
