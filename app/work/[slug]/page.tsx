import { ProjectPage } from '@/components/Pages';
import { projects, bySlug } from '@/lib/projects';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const p = bySlug((await params).slug); return { title: p.name + ' · peerscollective', description: p.outcome.en, openGraph: { title: p.name + ' · peerscollective', description: p.outcome.en, images: [{ url: `/og/${p.slug}.jpg`, width: 1200, height: 630 }] }, twitter: { card: 'summary_large_image', images: [`/og/${p.slug}.jpg`] } }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <ProjectPage lang="en" slug={(await params).slug} />; }
