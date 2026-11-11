import type { Metadata, Viewport } from 'next';
import '@fontsource/bodoni-moda/400-italic.css';
import '@fontsource/bodoni-moda/500-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/caveat/700.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://thepeerscollective.com'),
  title: 'peerscollective · web design & creative direction',
  description: 'karina beers · web design, branding and creative direction for small places with character: bakeries, trattorias, chicken shops, salons.',
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'peerscollective', description: 'web design & creative direction. made by karina.', url: 'https://thepeerscollective.com', siteName: 'peerscollective', type: 'website', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'peerscollective · web design & creative direction' }] },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
};
export const viewport: Viewport = { themeColor: '#170507', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
