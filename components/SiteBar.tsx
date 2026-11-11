import Link from 'next/link';
import type { Lang } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { LangSwitch } from './bits';

/** top bar on every sub-page: a figma-style home button + the menu */
export default function SiteBar({ lang, on, tint }: { lang: Lang; on?: string; tint?: { bg: string; ink: string } }) {
  const st = tint ? { background: tint.bg, color: tint.ink, borderColor: 'transparent' } : undefined;
  return (
    <header className="sbar" style={st}>
      <Link href={href(lang, '/')} className="sbar-home" aria-label={lang === 'en' ? 'home' : 'strona główna'}>
        <svg viewBox="0 0 24 24" aria-hidden><path d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5.2v-6.2H9.2V21H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        <span className="serif">peerscollective</span>
      </Link>
      <nav>
        <Link className={on === 'work' ? 'on' : ''} href={href(lang, '/') + '#work'}>{tr(lang, 'nav_work')}</Link>
        <Link className={on === 'about' ? 'on' : ''} href={href(lang, '/about/')}>{tr(lang, 'nav_about')}</Link>
        <Link className={on === 'offer' ? 'on' : ''} href={href(lang, '/offer/')}>{tr(lang, 'nav_offer')}</Link>
        <Link className={on === 'contact' ? 'on' : ''} href={href(lang, '/contact/')}>{tr(lang, 'nav_contact')}</Link>
        <LangSwitch lang={lang} className="sbar-lang" />
      </nav>
    </header>
  );
}
