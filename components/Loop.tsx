'use client';
import { useEffect, useState } from 'react';

/** 3-second loops of each trick, built from the sites' own pictures */
function useTick(ms: number, n: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [ms, n]);
  return i;
}

const Img = ({ src, on, fit = 'cover', style }: { src: string; on: boolean; fit?: 'cover' | 'contain'; style?: React.CSSProperties }) => (
  <img src={src} alt="" className={'lp-f' + (on ? ' on' : '')} style={{ objectFit: fit, ...style }} />
);

function Sleep() {
  const i = useTick(1500, 2);
  return (
    <div className="lp" style={{ background: i ? '#2b0b12' : '#ffe3ea', transition: 'background .8s' }}>
      <Img src="/a/l/hc-day.webp" on={i === 0} fit="contain" />
      <Img src="/a/l/hc-night.webp" on={i === 1} fit="contain" />
      <span className="lp-tag" style={{ background: i ? '#ffe3ea' : '#a30f1a', color: i ? '#a30f1a' : '#ffe3ea' }}>{i ? '18:01 · zzz' : '09:12 · open'}</span>
    </div>
  );
}
function Cake() {
  return (
    <div className="lp" style={{ background: '#ffd6e0' }}>
      <img src="/a/l/hc-cake.webp" alt="" className="lp-f on" style={{ objectFit: 'cover' }} />
      <span className="lp-write">happy bday mo</span>
      <img src="/a/l/hc-bag.webp" alt="" className="lp-bag" />
    </div>
  );
}
function Fresh() {
  const m = useTick(1000, 5);
  return (
    <div className="lp" style={{ background: '#ffe3ea' }}>
      <img src="/a/l/hc-almond.webp" alt="" className="lp-f on" style={{ objectFit: 'cover' }} />
      <span className="lp-pill"><i />out {m + 1} min ago</span>
    </div>
  );
}
function Tiramisu() {
  const i = useTick(380, 8);
  return (
    <div className="lp" style={{ background: '#fff3e3' }}>
      {Array.from({ length: 8 }, (_, k) => <Img key={k} src={`/a/l/gn-t${k + 1}.webp`} on={i === k} fit="contain" style={{ transition: 'none' }} />)}
    </div>
  );
}
function Ticket() {
  const n = useTick(1200, 99);
  return (
    <div className="lp" style={{ background: '#fff3e3' }}>
      <img src="/a/l/gn-disp.webp" alt="" className="lp-f on" style={{ objectFit: 'contain' }} />
      <span key={n} className="lp-ticket">nº {String(n + 12).padStart(2, '0')}</span>
    </div>
  );
}
function Rail() {
  return (
    <div className="lp lp-rail" style={{ background: '#fff3e3' }}>
      <b />
      {['MENU', 'PRENOTA', 'STORIA', 'DOVE'].map((t, k) => <span key={t} style={{ animationDelay: `${k * 0.18}s` }}><small>COMANDA Nº 0{k + 1}</small>{t}</span>)}
    </div>
  );
}
const SAUCES: [string, string, string][] = [['SOY GARLIC', '#7a4a1f', '#f5b300'], ['YANGNYEOM', '#d7261e', '#0b0a09'], ['SNOW CHEESE', '#efe6d6', '#0b0a09']];
function Sauce() {
  const i = useTick(1000, 3);
  const [n, bg, fg] = SAUCES[i];
  return (
    <div className="lp" style={{ background: bg, transition: 'background .5s' }}>
      <img src="/a/l/dk-wing.webp" alt="" className="lp-f on" style={{ objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.85 }} />
      <span className="lp-sauce" style={{ color: fg, borderColor: fg }}>{n}</span>
    </div>
  );
}
function Counter() {
  const n = useTick(700, 30);
  return (
    <div className="lp lp-counter">
      <small>NOW SERVING</small>
      <b key={n}>{String(412 + n).padStart(4, '0')}</b>
      <small>PICK-UP AT THE COUNTER</small>
    </div>
  );
}
function Booth() {
  return (
    <div className="lp lp-booth">
      <div>{[1, 2, 3, 4].map((k) => <img key={k} src={`/a/l/dk-b${k}.webp`} alt="" style={{ animationDelay: `${k * 0.5}s` }} />)}</div>
    </div>
  );
}
function Fringe() {
  const i = useTick(1000, 3);
  return (
    <div className="lp" style={{ background: '#de2a59' }}>
      {['before', 'oops', 'after'].map((s, k) => <Img key={s} src={`/a/l/gz-${s}.webp`} on={i === k} />)}
      <span className="lp-tag" style={{ background: '#111', color: '#fff' }}>{['✂ cut it yourself', 'oh no.', 'we fixed it ✓'][i]}</span>
    </div>
  );
}
function Lookbook() {
  const i = useTick(600, 6);
  return (
    <div className="lp lp-book" style={{ background: '#ffe6ee' }}>
      {Array.from({ length: 6 }, (_, k) => <img key={k} src={`/a/l/gz-lb${k + 1}.webp`} alt="" className={k === i ? 'on' : k === (i + 5) % 6 ? 'off' : ''} />)}
    </div>
  );
}
function Burst() {
  return (
    <div className="lp" style={{ background: '#de2a59' }}>
      <img src="/a/l/gz-after.webp" alt="" className="lp-f on" style={{ objectFit: 'cover' }} />
      <span className="lp-burst">10 NEW<br />CUTS!</span>
      <span className="lp-bar">||| || ||| | |||| || |<small>AW26 · 49 ZŁ</small></span>
    </div>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  'heavy-cream-0': Sleep, 'heavy-cream-1': Cake, 'heavy-cream-2': Fresh,
  'gnam-0': Tiramisu, 'gnam-1': Ticket, 'gnam-2': Rail,
  'dakdak-0': Sauce, 'dakdak-1': Counter, 'dakdak-2': Booth,
  'grzywka-0': Fringe, 'grzywka-1': Lookbook, 'grzywka-2': Burst,
};

export default function Loop({ slug, i }: { slug: string; i: number }) {
  const C = MAP[`${slug}-${i}`];
  return C ? <C /> : null;
}

/** steal window: plays the three loops one after another, 3 s each */
export function LoopCycle({ slug }: { slug: string }) {
  const i = useTick(3000, 3);
  return <Loop key={i} slug={slug} i={i} />;
}
