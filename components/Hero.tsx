'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { u, m } from '@/lib/u';
import { Confetti, Cursor, Grid12, LangSwitch, Rulers } from './bits';

type P = { x: number; y: number };
const BROKEN: P = { x: 2, y: -26 };
const ROT = -9;

function useDrag(start: P, snap: number, onSnap: () => void, scaleVar: '--u' | '--m') {
  const [pos, setPos] = useState<P>(start);
  const [done, setDone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<{ sx: number; sy: number; px: number; py: number; k: number } | null>(null);
  const finish = useCallback(() => { setPos({ x: 0, y: 0 }); setDone(true); onSnap(); }, [onSnap]);
  const onDown = (e: React.PointerEvent) => {
    if (done) return;
    const k = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(scaleVar)) || 1;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    ref.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y, k: 1 / k };
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const r = ref.current; if (!r) return;
    setPos({ x: r.px + (e.clientX - r.sx) * r.k, y: r.py + (e.clientY - r.sy) * r.k });
  };
  const onUp = () => {
    const r = ref.current; if (!r) return; ref.current = null; setDragging(false);
    setPos((p) => {
      const moved = Math.hypot(p.x - r.px, p.y - r.py) > 2;
      const n = moved ? p : { x: p.x * 0.45, y: p.y * 0.45 }; // a tap nudges it halfway
      if (Math.hypot(n.x, n.y) < snap) setTimeout(finish, 0);
      return n;
    });
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (done) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); return; }
    const step = e.shiftKey ? 10 : 2;
    const d: Record<string, P> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } };
    if (d[e.key]) { e.preventDefault(); setPos((p) => { const n = { x: p.x + d[e.key].x, y: p.y + d[e.key].y }; if (Math.hypot(n.x, n.y) < 3) setTimeout(finish, 0); return n; }); }
  };
  return { pos, done, dragging, finish, bind: { onPointerDown: onDown, onPointerMove: onMove, onPointerUp: onUp, onPointerCancel: onUp, onKeyDown: onKey } };
}

/** hero is cropped to one screen: top stays, middle moves up half the crop, bottom moves up the whole crop */
const vy = (y: number) => (y < 150 ? u(y) : y > 780 ? `calc(var(--u) * ${y} - var(--crop))` : `calc(var(--u) * ${y} - var(--crop) / 2)`);

export default function Hero({ lang }: { lang: Lang }) {
  const [phase, setPhase] = useState(0); // 0 broken · 1 c fixed · 2 dot round · 3 all done
  const [boom, setBoom] = useState(0);
  const onC = useCallback(() => { setPhase(1); setBoom((b) => b + 1); }, []);
  const c = useDrag(BROKEN, 12, onC, '--u');
  const cm = useDrag({ x: -8, y: 18 }, 10, onC, '--m');

  useEffect(() => { if (phase >= 1) { if (!c.done) c.finish(); if (!cm.done) cm.finish(); } }, [phase]); // eslint-disable-line

  const fixed = phase >= 1;
  const rotOf = (p: P, base: P) => ROT * Math.min(1, Math.hypot(p.x, p.y) / Math.hypot(base.x, base.y));
  const toast = tr(lang, 'perfect');

  return (
    <section className="hero" aria-label="peerscollective">
      <h1 className="sr">peerscollective · {tr(lang, 'tagline')}</h1>
      {/* ---------- desktop ---------- */}
      <div className="stage hero-d desk-only">
        <Rulers />
        <Grid12 rows={13} />
        <div className="abs guide-x" style={{ left: u(412), top: vy(24), height: u(876) }} aria-hidden />
        <div className="abs guide-y" style={{ left: u(24), top: vy(188), width: u(1416) }} aria-hidden />
        <div className="abs pinkmark" style={{ left: u(411), top: 0, width: u(2), height: u(24) }} aria-hidden />
        <div className="abs pinkmark" style={{ left: 0, top: vy(187), width: u(24), height: u(2) }} aria-hidden />
        <div className="abs coord" style={{ left: u(420), top: vy(196) }} aria-hidden>x 412 · y 188</div>
        <TopNav lang={lang} />

        <div className="abs word" style={{ left: u(150), top: vy(300) }} aria-hidden>peer<span className="kern-s">s</span></div>
        <div
          className={'abs word cdrag' + (c.done ? ' ok' : '') + (c.dragging ? ' drag' : '')}
          style={{ left: u(590), top: vy(300), transform: `translate(${u(c.pos.x)}, ${u(c.pos.y)}) rotate(${c.done ? 0 : rotOf(c.pos, BROKEN)}deg)` }}
          role="button" tabIndex={0}
          aria-label={lang === 'en' ? 'the c is crooked. drag it into place, or press enter to fix it' : 'c jest krzywe. przeciągnij je na miejsce albo naciśnij enter'}
          {...c.bind}
        >
          c
          {!c.done && (
            <span className="sel" aria-hidden>
              {[[0, 0], [50, 0], [100, 0], [0, 50], [100, 50], [0, 100], [50, 100], [100, 100]].map(([x, y]) => <i key={x + '-' + y} style={{ left: x + '%', top: y + '%' }} />)}
              <b className="ctag">{tr(lang, 'ctag')}</b>
            </span>
          )}
        </div>
        <div className="abs word" style={{ left: u(fixed ? 678 : 682), top: vy(300), transition: 'left .4s' }} aria-hidden>ollective</div>

        {!fixed && (
          <>
            <div className="hand abs bug" style={{ left: u(733), top: vy(635), fontSize: u(40), transform: 'rotate(-4deg)' }}>{tr(lang, 'bugging')}</div>
            <svg className="abs" style={{ left: u(676), top: vy(554), width: u(72), height: u(82), overflow: 'visible' }} viewBox="0 0 72 82" aria-hidden>
              <path d="M66 78 C 50 50, 30 30, 6 6" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6 6 L 8 22 M6 6 L 21 9" fill="none" stroke="#ff3b30" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <Cursor fy={vy} x={505} y={600} color="#ff4fa0" label="karina" />
            <Cursor fy={vy} x={1080} y={600} color="#ffd84f" label={tr(lang, 'salon')} style={{ animation: 'drift 7s ease-in-out infinite alternate' }} />
            <Cursor fy={vy} x={1210} y={250} color="#fff4e2" label={tr(lang, 'competitor')} style={{ animation: 'drift 9s ease-in-out -3s infinite alternate' }} />
          </>
        )}
        <Cursor fy={vy} x={fixed ? 311 : 240} y={fixed ? 717 : 640} color="#7cc4ff" label={tr(lang, 'warsaw')} bubble={fixed ? tr(lang, 'satisfying') : tr(lang, 'love')} style={{ transition: 'left 1.2s, top 1.2s' }} />

        {fixed && (
          <>
            <div key={boom} className="abs toast" style={{ left: '50%', top: vy(232), transform: 'translateX(-50%)' }} role="status">{toast}</div>
            <Confetti on key={'c' + boom} />
            <p className="abs subline" style={{ left: 0, width: '100%', top: vy(560) }}>
              {tr(lang, 'tagline')}
              .
            </p>
            <p className="abs madeby" style={{ left: 0, width: '100%', top: vy(622) }}>{tr(lang, 'made_by')}</p>
          </>
        )}
        {!fixed && (
          <>
            <p className="abs small dimtxt" style={{ left: u(48), top: vy(840) }}>{tr(lang, 'drag')}</p>
            <p className="abs small dimtxt" style={{ left: u(1330), top: vy(840) }}>{tr(lang, 'now')}</p>
          </>
        )}
      </div>

      {/* ---------- phone ---------- */}
      <div className="mstage hero-m mob-only">
        <div className="abs mruler" aria-hidden />
        <div className="abs mgrid" aria-hidden>{[16, 112, 208, 304].map((x) => <i key={x} style={{ left: m(x) }} />)}</div>
        <LangSwitch lang={lang} className="abs mlang" />
        <p className="abs mtop" style={{ left: m(20), top: m(36) }}>karina · peerscollective</p>
        <MobMenu lang={lang} />
        <div className="abs mword" style={{ left: m(24), top: m(280) }} aria-hidden>peer<span className="kern-s">s</span></div>
        <div
          className={'abs mword cdrag' + (cm.done ? ' ok' : '')}
          style={{ left: m(20), top: m(372), transform: `translate(${m(cm.pos.x)}, ${m(cm.pos.y)}) rotate(${cm.done ? 0 : rotOf(cm.pos, { x: -8, y: 18 }) * 1.6}deg)` }}
          role="button" tabIndex={0} aria-label={lang === 'en' ? 'the c is crooked. drag it, or press enter' : 'c jest krzywe. przeciągnij je albo naciśnij enter'}
          {...cm.bind}
        >
          c
          {!cm.done && <span className="sel" aria-hidden>{[[0, 0], [50, 0], [100, 0], [0, 50], [100, 50], [0, 100], [50, 100], [100, 100]].map(([x, y]) => <i key={x + '-' + y} style={{ left: x + '%', top: y + '%' }} />)}</span>}
        </div>
        <div className="abs mword" style={{ left: m(56), top: m(372) }} aria-hidden>ollective</div>
        {!fixed ? (
          <>
            <div className="hand abs" style={{ left: m(150), top: m(520), fontSize: m(26), transform: 'rotate(-4deg)' }}>{tr(lang, 'bugging')}</div>
            <p className="abs mdim" style={{ left: m(20), top: m(780) }}>{tr(lang, 'drag_m')}</p>
          </>
        ) : (
          <>
            <div key={'m' + boom} className="abs toast mtoast" style={{ left: '50%', top: m(210), transform: 'translateX(-50%)' }} role="status">{tr(lang, 'perfect')}</div>
            <Confetti on f={m} scaleX={0.27} key={'mc' + boom} />
            <p className="abs msub" style={{ left: 0, width: '100%', top: m(560) }}>{tr(lang, 'tagline')}.</p>
            <p className="abs mmade" style={{ left: m(30), width: m(330), top: m(620) }}>{tr(lang, 'made_by')}</p>
          </>
        )}
      </div>
    </section>
  );
}

function TopNav({ lang }: { lang: Lang }) {
  return (
    <>
      <p className="abs topline" style={{ left: u(48), top: u(40) }}>{tr(lang, 'topline')}</p>
      <nav className="abs topnav" style={{ right: u(48), top: u(40) }} aria-label="menu">
        <a href="#work">{tr(lang, 'nav_work')}</a>
        <Link href={href(lang, '/about/')}>{tr(lang, 'nav_about')}</Link>
        <Link href={href(lang, '/offer/')}>{tr(lang, 'nav_export')}</Link>
        <LangSwitch lang={lang} className="" />
      </nav>
    </>
  );
}

export function MobMenu({ lang, color }: { lang: Lang; color?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="abs mmenu" style={{ right: m(20), top: m(32), color }} onClick={() => setOpen(true)} aria-expanded={open}>menu</button>
      {open && (
        <div className="msheet" role="dialog" aria-label="menu">
          <button className="mclose" onClick={() => setOpen(false)}>{tr(lang, 'close')} ×</button>
          <Link href={href(lang, '/') + '#work'} onClick={() => setOpen(false)}>{tr(lang, 'nav_work')}</Link>
          <Link href={href(lang, '/about/')}>{tr(lang, 'nav_about')}</Link>
          <Link href={href(lang, '/offer/')}>{tr(lang, 'nav_offer')}</Link>
          <Link href={href(lang, '/contact/')}>{tr(lang, 'nav_contact')}</Link>
          <LangSwitch lang={lang} className="mlang2" />
        </div>
      )}
    </>
  );
}
