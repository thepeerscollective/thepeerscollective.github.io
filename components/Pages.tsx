import Link from 'next/link';
import type { Lang } from '@/lib/projects';
import { bySlug } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { LangBoot } from './bits';
import Hero from './Hero';
import Work from './Work';
import Footer from './Footer';
import ProjectView from './ProjectView';
import CaseStudy from './CaseStudy';
import About from './About';
import Offer from './Offer';
import Contact from './Contact';
import SiteBar from './SiteBar';

function TabBar({ lang, on }: { lang: Lang; on: string }) {
  return (
    <nav className="tabbar mob-only" aria-label="menu">
      <Link className={on === 'work' ? 'on' : ''} href={href(lang, '/') + '#work'}>{tr(lang, 'nav_work')}</Link>
      <Link className={on === 'about' ? 'on' : ''} href={href(lang, '/about/')}>{tr(lang, 'nav_about')}</Link>
      <Link className={on === 'offer' ? 'on' : ''} href={href(lang, '/offer/')}>{tr(lang, 'nav_offer')}</Link>
      <Link className={on === 'contact' ? 'on' : ''} href={href(lang, '/contact/')}>{tr(lang, 'nav_contact')}</Link>
    </nav>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  return (<><LangBoot lang={lang} /><main id="top"><Hero lang={lang} /><Work lang={lang} /></main><Footer lang={lang} /><TabBar lang={lang} on="work" /></>);
}
export function ProjectPage({ lang, slug }: { lang: Lang; slug: string }) {
  const p = bySlug(slug);
  return (<><LangBoot lang={lang} /><SiteBar lang={lang} on="work" /><main id="top"><ProjectView p={p} lang={lang} /><CaseStudy p={p} lang={lang} /></main><Footer lang={lang} /></>);
}
export function AboutPage({ lang }: { lang: Lang }) {
  return (<><LangBoot lang={lang} /><SiteBar lang={lang} on="about" /><About lang={lang} /><Footer lang={lang} /><TabBar lang={lang} on="about" /></>);
}
export function OfferPage({ lang }: { lang: Lang }) {
  return (<><LangBoot lang={lang} /><Offer lang={lang} /><Footer lang={lang} /><TabBar lang={lang} on="offer" /></>);
}
export function ContactPage({ lang }: { lang: Lang }) {
  return (<><LangBoot lang={lang} /><Contact lang={lang} /><Footer lang={lang} /><TabBar lang={lang} on="contact" /></>);
}
