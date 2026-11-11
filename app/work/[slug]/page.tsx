import { ProjectPage } from '@/components/Pages';
import { projects, bySlug } from '@/lib/projects';
export const dynamicParams = false;
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const p = bySlug((await params).slug); return { title: p.name + ' · peerscollective', description: p.meta.en }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <ProjectPage lang="en" slug={(await params).slug} />; }
