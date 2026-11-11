'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, type CSSProperties, type ReactNode } from 'react';
import type { Lang } from '@/lib/projects';
import { u } from '@/lib/u';

export function Cursor({ x, y, color, label, bubble, f = u, style, bubbleBg }: { x: number; y: number; color: string; label: string; bubble?: string; f?: (n: number) => string; style?: CSSProperties; bubbleBg?: string }) {
  return (
    <div className="cur abs" style={{ left: f(x), top: f(y), ...style }} aria-hidden>
      <svg viewBox="0 0 14 21">
        <path d="M1 1 L1 17 L5 13 L8 20 L11 19 L8 12 L13 12 Z" fill={color} stroke="#170507" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className="tag" style={{ background: color }}>{label}</span>
      {bubble && <span className="bub" style={bubbleBg ? { background: bubbleBg } : undefined}>{bubble}</span>}
    </div>
  );
}

export function Rulers({ color = '#24090e', corner = '#170507' }: { color?: string; corner?: string }) {
  return (
    <>
      <div className="ruler-top abs" style={{ backgroundColor: color }} aria-hidden />
      <div className="ruler-left abs" style={{ backgroundColor: color }} aria-hidden />
      <div className="ruler-corner abs" style={{ background: corner }} aria-hidden />
    </>
  );
}

export const COLS = [104, 211, 317, 424, 531, 637, 744, 851, 957, 1064, 1171, 1277];
export function Grid12({ rows = 0, faint = false }: { rows?: number; faint?: boolean }) {
  return (
    <div className={'grid12 abs' + (faint ? ' faint' : '')} aria-hidden>
      {COLS.map((x) => <i key={x} style={{ left: u(x) }} />)}
      {Array.from({ length: rows }, (_, i) => <u key={i} style={{ top: u(88 + i * 64) }} />)}
    </div>
  );
}

export function swapLangPath(path: string, to: Lang) {
  const clean = path.replace(/^\/pl(?=\/|$)/, '') || '/';
  return to === 'pl' ? '/pl' + (clean === '/' ? '/' : clean) : clean;
}

export function LangSwitch({ lang, className = 'langsw abs', style, color }: { lang: Lang; className?: string; style?: CSSProperties; color?: string }) {
  const path = usePathname() || '/';
  const other: Lang = lang === 'en' ? 'pl' : 'en';
  return (
    <Link
      href={swapLangPath(path, other)}
      className={className}
      style={{ ...style, ...(color ? { color } : {}) }}
      onClick={() => { try { localStorage.setItem('pc-lang', other); } catch {} }}
      aria-label={lang === 'en' ? 'Polski' : 'English'}
      hrefLang={other}
    >
      {lang === 'en' ? <>EN / <span style={{ opacity: 0.55 }}>PL</span></> : <>PL / <span style={{ opacity: 0.55 }}>EN</span></>}
    </Link>
  );
}

/** sets <html lang> and does a one-time redirect for polish browsers */
export function LangBoot({ lang }: { lang: Lang }) {
  const path = usePathname() || '/';
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang !== 'en') return;
    try {
      const saved = localStorage.getItem('pc-lang');
      if (!saved && navigator.language?.toLowerCase().startsWith('pl')) {
        localStorage.setItem('pc-lang', 'pl');
        location.replace(swapLangPath(path, 'pl'));
      }
    } catch {}
  }, [lang, path]);
  return null;
}

const CONF = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: 180 + r(1) * 1120, y: 100 + r(2) * 590, s: [4, 6, 8][i % 3], c: ['#ff4fa0', '#fff4e2', '#7cc4ff', '#ff3b30'][i % 4], rot: r(3) * 90, d: r(4) * 0.35 };
});
export function Confetti({ on, f = u, scaleX = 1 }: { on: boolean; f?: (n: number) => string; scaleX?: number }) {
  if (!on) return null;
  return (
    <div className="confetti abs" aria-hidden>
      {CONF.map((c, i) => (
        <i key={i} style={{ left: f(c.x * scaleX), top: f(c.y), width: f(c.s), height: f(c.s), background: c.c, ['--r' as string]: `${c.rot}deg`, animationDelay: `${c.d}s` }} />
      ))}
    </div>
  );
}

export function Hand({ x, y, r = 0, size, children, color, w, f = u, className = '' }: { x: number; y: number; r?: number; size: number; children: ReactNode; color?: string; w?: number; f?: (n: number) => string; className?: string }) {
  return (
    <div className={'hand abs ' + className} style={{ left: f(x), top: f(y), fontSize: f(size), transform: `rotate(${r}deg)`, transformOrigin: '0 0', color, width: w ? f(w) : undefined }}>
      {children}
    </div>
  );
}
