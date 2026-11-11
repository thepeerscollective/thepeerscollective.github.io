'use client';
import { useState } from 'react';
import type { Lang } from '@/lib/projects';
import { tr, L } from '@/lib/i18n';
import { u } from '@/lib/u';
import { Grid12, LangSwitch, Rulers } from './bits';
import Link from 'next/link';
import { href } from '@/lib/i18n';

const PINS = [
  { px: 376, py: 331, ty: 110, en: 'frames: red. reading your kerning', pl: 'oprawki: czerwone. czytają twój kerning' },
  { px: 602, py: 353, ty: 250, en: "times square? i'd pick your café", pl: 'times square? wolę twoją kawiarnię' },
  { px: 432, py: 487, ty: 390, en: 'nails: done. your website next', pl: 'paznokcie: zrobione. strona następna' },
  { px: 312, py: 526, ty: 530, en: 'rings: 6. opinions: more', pl: 'pierścionki: 6. opinii: więcej' },
  { px: 357, py: 599, ty: 670, en: 'necklace: colour palette, approved', pl: 'naszyjnik: paleta kolorów, zatwierdzona' },
];

const BIO = {
  en: "web designer and creative director. i design websites, brands and photo shoots for small places with character.\n\ni've been designing websites for a few years and coding them for a shorter while. it started with designing for myself and ended with me not being able to walk into a café without judging its menu.\n\npretty isn't enough. there are a million pretty websites, and the one you remember is the one that did something weird.\n\npeerscollective is me + people i trust: a photographer and others, picked for each project.",
  pl: 'web designerka i creative directorka. projektuję strony, marki i sesje zdjęciowe dla małych miejsc z charakterem.\n\nstrony projektuję od kilku lat, koduję od niedawna. zaczęło się od projektowania dla siebie, a skończyło na tym, że już nie umiem wejść do kawiarni i nie ocenić jej menu.\n\nładne to za mało. ładnych stron jest milion, a zapamiętujesz tę, która zrobiła coś dziwnego.\n\npeerscollective to ja + ludzie, którym ufam: fotograf i inni, dobierani pod projekt.',
};

export default function About({ lang }: { lang: Lang }) {
  const [pins, setPins] = useState(true);
  const groups = [
    { h: L(lang, 'what i do', 'co robię'), items: ['creative direction', L(lang, 'websites (figma → code)', 'strony (figma → kod)'), L(lang, 'branding + packaging', 'branding + opakowania'), L(lang, 'photo shoots + art direction', 'sesje zdjęciowe + art direction')] },
    { h: L(lang, 'how i work', 'jak pracuję'), items: [L(lang, 'figma → you approve → code', 'figma → akceptujesz → kod')] },
    { h: L(lang, 'tools', 'narzędzia'), items: ['figma · photoshop · lightroom · next.js', 'higgsfield · meta ads'] },
    { h: L(lang, 'the crew', 'ekipa'), items: [L(lang, 'photographer + people picked per project', 'fotograf + ludzie dobierani pod projekt')] },
    { h: L(lang, 'languages: polish, english', 'języki: polski, angielski'), items: [] },
  ];
  const [open, setOpen] = useState<boolean[]>([true, true, true, true, false]);
  const Fig = (
    <div className="fig">
      <div className="fig-bar">about.fig</div>
      <ul>
        {groups.map((g, i) => (
          <li key={i}>
            <button onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))} aria-expanded={open[i]} disabled={!g.items.length}>
              <span className="fig-car">{open[i] && g.items.length ? '▾' : '▸'}</span>{g.h}
            </button>
            {open[i] && g.items.length > 0 && <ul>{g.items.map((it) => <li key={it}><span className="fig-sq">▫</span>{it}</li>)}</ul>}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="about" id="top">
      <div className="stage desk-only" style={{ height: u(1016) }}>
        <Rulers />
        <Grid12 faint />
        <div className="abs ab-photo" style={{ left: u(118), top: u(72), width: u(520), height: u(640) }}>
          <img src="/a/karina.webp" alt={L(lang, 'karina beers in times square, yellow top, red glasses', 'karina beers na times square, żółta bluzka, czerwone okulary')} />
        </div>
        <button className={'abs pv-tog ab-tog' + (pins ? ' on' : '')} style={{ left: u(118), top: u(730), ['--k' as string]: '#ff4fa0', color: '#fff4e2' }} onClick={() => setPins((v) => !v)} aria-pressed={pins}>
          <i aria-hidden><b /></i>{tr(lang, 'inspect_me')}
        </button>
        {pins && (
          <>
            <svg className="abs ab-lines" style={{ left: 0, top: 0, width: '100%', height: u(1016) }} viewBox="0 0 1440 1016" aria-hidden>
              {PINS.map((p, i) => <g key={i}><path d={`M${p.px} ${p.py} C ${p.px + 120} ${p.py}, 560 ${p.ty + 10}, 660 ${p.ty + 10}`} /><circle cx={p.px} cy={p.py} r="5" /></g>)}
            </svg>
            {PINS.map((p, i) => <span key={i} className="abs chip num ab-pin" style={{ left: u(660), top: u(p.ty), animationDelay: `${i * 0.08}s` }}>{lang === 'en' ? p.en : p.pl}</span>)}
          </>
        )}
        <h1 className="abs serif ab-h" style={{ left: u(900), top: u(80), width: u(500), fontSize: u(lang === 'en' ? 48 : 42) }}>{tr(lang, 'hi')}</h1>
        <p className="abs ab-bio pre" style={{ left: u(904), top: u(200), width: u(460) }}>{BIO[lang]}</p>
        <div className="abs" style={{ left: u(900), top: u(464), width: u(460) }}>{Fig}</div>
      </div>

      <div className="ab-m mob-only">
        <h1 className="serif">{tr(lang, 'hi')}</h1>
        <div className="ab-mphoto">
          <img src="/a/karina.webp" alt="karina beers" />
          {PINS.map((p, i) => <span key={i} className="ab-dot" style={{ left: `${((p.px - 118) / 520) * 100}%`, top: `${((p.py - 72) / 640) * 100}%` }}>{i + 1}</span>)}
        </div>
        <ol className="ab-mpins">{PINS.map((p, i) => <li key={i}><span className="ab-dot">{i + 1}</span>{lang === 'en' ? p.en : p.pl}</li>)}</ol>
        <p className="pre ab-bio">{BIO[lang]}</p>
        {Fig}
      </div>
    </main>
  );
}
