import Link from 'next/link';
import type { Lang } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { LangSwitch } from './bits';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div>
          <Link href={href(lang, '/')} className="serif ft-logo">peerscollective</Link>
          <p className="ft-tag">{tr(lang, 'tagline')}.</p>
        </div>
        <nav className="ft-col" aria-label="footer">
          <Link href={href(lang, '/') + '#work'}>{tr(lang, 'nav_work')}</Link>
          <Link href={href(lang, '/about/')}>{tr(lang, 'nav_about')}</Link>
          <Link href={href(lang, '/offer/')}>{tr(lang, 'nav_offer')}</Link>
          <Link href={href(lang, '/contact/')}>{tr(lang, 'nav_contact')}</Link>
        </nav>
        <div className="ft-col">
          <a href="https://www.instagram.com/thepeerscollective/" target="_blank" rel="noopener">@thepeerscollective ↗</a>
          <a href="mailto:hello@thepeerscollective.com">hello@thepeerscollective.com</a>
          <LangSwitch lang={lang} className="ft-lang" />
        </div>
      </div>
      <div className="ft-bot">
        <span>{tr(lang, 'made_remote')} · <Link href={href(lang, '/privacy/')}>{lang === 'en' ? 'privacy (no cookies)' : 'prywatność (bez ciasteczek)'}</Link></span>
        <a href="#top">{tr(lang, 'top')}</a>
      </div>
    </footer>
  );
}
