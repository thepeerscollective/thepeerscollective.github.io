'use client';
import Link from 'next/link';
import { useState } from 'react';
import { projects, type Lang } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { u } from '@/lib/u';
import { Cursor, LangSwitch } from './bits';

/* 4 × 3 grid, figma frame coordinates; the 12th slot is yours. fits one laptop screen */
const TW = 248, TH = 155;
const POS = Array.from({ length: 12 }, (_, i) => [300 + (i % 4) * 284, 168 + Math.floor(i / 4) * 200]);
export const CATS: [string, string, string][] = [['eat', 'eat', 'zjeść'], ['out', 'go out', 'wyjść wieczorem'], ['look', 'look good', 'dobrze wyglądać'], ['calm', 'peace of mind', 'mieć spokój'], ['home', 'home', 'mieszkać']];
const NIGHT = { bg: '#170507', panel: '#1f080c', ink: '#fff4e2', dim: '#9e8a86', sel: 'transparent', ruler: '#24090e' };

export default function Work({ lang }: { lang: Lang }) {
  const [hov, setHov] = useState<number | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const p = hov === null ? null : projects[hov];
  const k = p ? { bg: p.c.bg, panel: p.c.panel, ink: p.c.ink, dim: p.c.dim, sel: p.c.ink, ruler: p.c.panel } : NIGHT;
  if (p?.slug === 'grzywka') k.sel = '#a6d8f5';

  return (
    <section id="work" className="work" aria-label={tr(lang, 'nav_work')} style={{ background: k.bg, transition: 'background .45s' }}>
      <div className="stage work-d desk-only" style={{ height: u(780), background: k.bg, color: k.ink }}>
        <div className="ruler-top abs" style={{ backgroundColor: k.ruler }} aria-hidden />
        <div className="ruler-left abs" style={{ backgroundColor: k.ruler }} aria-hidden />
        <LangSwitch lang={lang} color={k.ink === '#ffffff' ? '#fff' : hov === null ? undefined : k.ink} />
        <div className="abs layers" style={{ left: u(24), top: u(24), width: u(232), height: u(756), background: k.panel }}>
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
            <li style={{ color: k.ink, opacity: .6 }}><Link href={href(lang, '/contact/')}>&nbsp;&nbsp;◻ {lang === 'pl' ? 'twój projekt' : 'your project'}</Link><span style={{ color: k.dim }}>👁</span></li>
            <li style={{ color: k.ink }}><Link href={href(lang, '/about/')}>▸ {tr(lang, 'nav_about')}</Link><span style={{ color: k.dim }}>👁</span></li>
            <li style={{ color: k.ink }}><Link href={href(lang, '/offer/')}>▸ {tr(lang, 'nav_offer')}</Link><span style={{ color: k.dim }}>👁</span></li>
            <li style={{ color: k.ink }}><Link href={href(lang, '/contact/')}>▸ {tr(lang, 'nav_contact')}</Link><span style={{ color: k.dim }}>👁</span></li>
          </ul>
        </div>

        {p && <div key={p.slug} className="hand abs" style={{ left: u(300), top: u(40), fontSize: u(26), transform: 'rotate(-2deg)', color: p.slug === 'grzywka' ? '#fff' : '#ff3b30', zIndex: 6 }}>{p.hoverNote[lang]}</div>}

        <div className="abs wfilter" role="group" aria-label={lang === 'pl' ? 'filtr' : 'filter'} style={{ left: u(300), top: u(104) }}>
          <span style={{ color: k.dim }}>{lang === 'pl' ? 'strony, na których można…' : 'sites where you can…'}</span>
          {CATS.map(([id, en, pl]) => (
            <button key={id} type="button" aria-pressed={cat === id} onClick={() => setCat(cat === id ? null : id)} style={{ color: cat === id ? k.bg : k.ink, background: cat === id ? k.ink : 'transparent', borderColor: cat === id ? k.ink : k.dim }}>{lang === 'pl' ? pl : en}</button>
          ))}
          {cat && <button type="button" className="wf-x" onClick={() => setCat(null)} style={{ color: k.dim, borderColor: 'transparent' }}>× {lang === 'pl' ? 'wszystkie' : 'all'}</button>}
        </div>

        {projects.map((q, i) => {
          const [x, y] = POS[i];
          const on = hov === i;
          const off = !!cat && !q.cats.includes(cat);
          return (
            <div key={q.slug}>
              <p className="abs tlabel" style={{ left: u(x), top: u(y - 20), width: u(TW), color: hov === null || on ? (hov === null ? '#9e8a86' : k.ink) : k.dim, opacity: off ? 0.25 : 1 }}>
                {q.name} · {q.where[lang]}
              </p>
              <Link
                href={href(lang, `/work/${q.slug}/`)}
                className={'abs thumb' + (on ? ' on' : '') + (cat && !off ? ' hit' : '') + (off ? ' off' : '')}
                style={{ left: u(x), top: u(y), width: u(TW), height: u(TH), outlineColor: k.sel === 'transparent' ? k.ink : k.sel }}
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(i)} onBlur={() => setHov(null)}
                aria-label={`${q.name} · ${q.where[lang]}`}
              >
                <img src={q.shot.replace('.webp', '-t.webp')} alt="" loading="lazy" />
              </Link>
            </div>
          );
        })}

        {(() => { const [x, y] = POS[projects.length] ?? POS[11]; return (
          <div>
            <p className="abs tlabel" style={{ left: u(x), top: u(y - 20), color: hov === null ? '#9e8a86' : k.dim }}>{lang === 'pl' ? 'twój projekt · ?' : 'your project · ?'}</p>
            <Link href={href(lang, '/contact/')} className="abs thumb yours" style={{ left: u(x), top: u(y), width: u(TW), height: u(TH), borderColor: hov === null ? '#9e8a86' : k.dim, color: hov === null ? '#9e8a86' : k.dim }}>[ + {lang === 'pl' ? 'twój projekt tutaj' : 'your project here'} ]</Link>
          </div>
        ); })()}



        <Cursor x={760} y={432} color="#7cc4ff" label={tr(lang, 'warsaw')} style={{ animation: 'drift 8s ease-in-out infinite alternate' }} />
        <Cursor x={1196} y={640} color="#ff4fa0" label={tr(lang, 'you')} />
        <p className="abs hint" style={{ left: u(300), top: u(748), color: k.dim }}>{p ? p.hoverLine[lang] : ''}</p>
        <span className="abs zoom" style={{ left: u(1360), top: u(740), background: k.panel, color: k.ink }}>24%</span>
      </div>

      <WorkMobile lang={lang} />
    </section>
  );
}

function WorkMobile({ lang }: { lang: Lang }) {
  const [cat, setCat] = useState<string | null>(null);
  const list = projects.filter((q) => !cat || q.cats.includes(cat));
  return (
    <div className="work-m mob-only">
      <p className="wm-h">peerscollective</p>
      <p className="wm-c">{tr(lang, 'work_count')}</p>
      <div className="wm-f" role="group" aria-label={lang === 'pl' ? 'filtr' : 'filter'}>
        {CATS.map(([id, en, pl]) => (
          <button key={id} type="button" aria-pressed={cat === id} onClick={() => setCat(cat === id ? null : id)}>{lang === 'pl' ? pl : en}</button>
        ))}
      </div>
      <div className="wm-grid">
        {list.map((q) => (
          <Link key={q.slug} href={href(lang, `/work/${q.slug}/`)} className="wm-card" style={{ background: q.c.bg, color: q.c.ink }}>
            <img src={q.shot.replace('.webp', '-t.webp')} alt="" loading="lazy" />
            <b>{q.name}</b>
            <span style={{ color: q.c.dim }}>{q.where[lang]}</span>
          </Link>
        ))}
        {!cat && (
          <Link href={href(lang, '/contact/')} className="wm-card wm-yours">[ + {lang === 'pl' ? 'twój projekt' : 'your project'} ]</Link>
        )}
      </div>
    </div>
  );
}

function hexA(h: string, a: number) {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
