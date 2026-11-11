'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { projects, type Lang } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { u } from '@/lib/u';
import { Cursor, LangSwitch } from './bits';

const POS = [[300, 140], [880, 140], [300, 520], [880, 520]];
const NIGHT = { bg: '#170507', panel: '#1f080c', ink: '#fff4e2', dim: '#9e8a86', sel: 'transparent', ruler: '#24090e' };

export default function Work({ lang }: { lang: Lang }) {
  const [hov, setHov] = useState<number | null>(null);
  const p = hov === null ? null : projects[hov];
  const k = p ? { bg: p.c.bg, panel: p.c.panel, ink: p.c.ink, dim: p.c.dim, sel: p.c.ink, ruler: p.c.panel } : NIGHT;
  if (p?.slug === 'grzywka') k.sel = '#a6d8f5';

  return (
    <section id="work" className="work" aria-label={tr(lang, 'nav_work')} style={{ background: k.bg, transition: 'background .45s' }}>
      <div className="stage fit work-d desk-only" style={{ height: u(900), background: k.bg, color: k.ink }}>
        <div className="ruler-top abs" style={{ backgroundColor: k.ruler }} aria-hidden />
        <div className="ruler-left abs" style={{ backgroundColor: k.ruler }} aria-hidden />
        <LangSwitch lang={lang} color={k.ink === '#ffffff' ? '#fff' : hov === null ? undefined : k.ink} />
        <div className="abs layers" style={{ left: u(24), top: u(24), width: u(232), height: u(876), background: k.panel }}>
          <p className="lh" style={{ color: k.ink }}>{tr(lang, 'layers')}</p>
          <ul>
            <li style={{ color: k.ink }}>▾ {tr(lang, 'nav_work')}<span style={{ color: k.dim }}>👁</span></li>
            {projects.map((q, i) => (
              <li key={q.slug} style={{ color: k.ink, background: hov === i ? hexA(k.ink, 0.15) : undefined }}>
                <Link href={href(lang, `/work/${q.slug}/`)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(i)} onBlur={() => setHov(null)}>
                  &nbsp;&nbsp;◻ {q.name}
                </Link>
                <span style={{ color: k.dim }}>👁</span>
              </li>
            ))}
            <li style={{ color: k.ink }}><Link href={href(lang, '/about/')}>▸ {tr(lang, 'nav_about')}</Link><span style={{ color: k.dim }}>👁</span></li>
            <li style={{ color: k.ink }}><Link href={href(lang, '/offer/')}>▸ {tr(lang, 'nav_offer')}</Link><span style={{ color: k.dim }}>👁</span></li>
            <li style={{ color: k.ink }}><Link href={href(lang, '/contact/')}>▸ {tr(lang, 'nav_contact')}</Link><span style={{ color: k.dim }}>👁</span></li>
          </ul>
        </div>

        {p && <div key={p.slug} className="hand abs" style={{ left: u(300), top: u(40), fontSize: u(26), transform: 'rotate(-2deg)', color: p.slug === 'grzywka' ? '#fff' : '#ff3b30', zIndex: 6 }}>{p.hoverNote[lang]}</div>}

        {projects.map((q, i) => {
          const [x, y] = POS[i];
          const on = hov === i;
          return (
            <div key={q.slug}>
              <p className="abs tlabel" style={{ left: u(x), top: u(y - 20), color: hov === null || on ? (hov === null ? '#9e8a86' : k.ink) : k.dim }}>
                {q.name} — {q.where[lang]}
              </p>
              <Link
                href={href(lang, `/work/${q.slug}/`)}
                className={'abs thumb' + (on ? ' on' : '')}
                style={{ left: u(x), top: u(y), width: u(520), height: u(325), outlineColor: k.sel === 'transparent' ? k.ink : k.sel }}
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(i)} onBlur={() => setHov(null)}
                aria-label={`${q.name} — ${q.where[lang]}`}
              >
                <img src={q.shot.replace('.webp', '-t.webp')} alt="" loading="lazy" />
              </Link>
            </div>
          );
        })}

        {hov === null && (
          <svg className="abs proto" style={{ left: 0, top: 0, width: '100%', height: '100%' }} viewBox="0 0 1440 900" aria-hidden>
            <path d="M822 230 C 850 230, 850 300, 878 300" /><circle cx="822" cy="230" r="5" />
            <path d="M1140 467 C 1140 500, 560 480, 560 518" /><circle cx="1140" cy="467" r="5" />
            <path d="M822 690 C 850 690, 850 760, 878 760" /><circle cx="822" cy="690" r="5" />
          </svg>
        )}

        <Cursor x={1010} y={384} color="#7cc4ff" label={tr(lang, 'warsaw')} style={{ animation: 'drift 8s ease-in-out infinite alternate' }} />
        <Cursor x={640} y={824} color="#ff4fa0" label={tr(lang, 'you')} />
        <p className="abs hint" style={{ left: u(300), top: u(868), color: k.dim }}>{p ? p.hoverLine[lang] : ''}</p>
        <span className="abs zoom" style={{ left: u(1360), top: u(860), background: k.panel, color: k.ink }}>24%</span>
      </div>

      <WorkMobile lang={lang} />
    </section>
  );
}

function WorkMobile({ lang }: { lang: Lang }) {
  const [act, setAct] = useState(0);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setAct(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const p = projects[act];
  return (
    <div className="work-m mob-only" style={{ background: p.c.bg, color: p.c.ink }}>
      <p className="wm-h">peerscollective</p>
      <p className="wm-c" style={{ color: p.c.dim }}>{tr(lang, 'work_count')}</p>
      {projects.map((q, i) => (
        <Link key={q.slug} href={href(lang, `/work/${q.slug}/`)} data-i={i} ref={(el) => { refs.current[i] = el; }} className={'wm-card' + (act === i ? ' on' : '')}>
          <span style={{ color: act === i ? q.c.ink : p.c.dim }}>{q.name} — {q.where[lang]}</span>
          <img src={q.shot.replace('.webp', '-t.webp')} alt="" loading="lazy" style={{ outlineColor: q.c.ink }} />
        </Link>
      ))}
    </div>
  );
}

function hexA(h: string, a: number) {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
