import type { Metadata, Viewport } from 'next';
import '@fontsource/pixelify-sans/400.css';
import '@fontsource/instrument-sans/400.css';
import '@fontsource/instrument-sans/600.css';
import './globals.css';
import { BASE } from '@/lib/sites';

export const metadata: Metadata = {
  metadataBase: new URL('https://thepeerscollective.github.io'),
  title: 'the peers collective · peers os',
  description: 'websites + photos for places people actually go to: bakeries, trattorias, chicken shops, salons, nail shops, tattoo studios.',
  icons: { icon: `${BASE}/favicon.svg` },
  openGraph: { title: 'the peers collective', description: 'log in. no password.', images: [`${BASE}/og.jpg`] },
};
export const viewport: Viewport = { themeColor: '#e8e6df', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
