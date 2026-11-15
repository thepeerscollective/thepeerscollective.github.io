import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
export const dynamic = 'force-static';
const B = 'https://thepeerscollective.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about/', '/offer/', '/contact/', ...projects.map((p) => `/work/${p.slug}/`)];
  return paths.flatMap((p) => [
    { url: B + p, alternates: { languages: { pl: B + '/pl' + p } } },
    { url: B + '/pl' + p, alternates: { languages: { en: B + p } } },
  ]);
}
