'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SITES, Site, img } from '@/lib/sites';
import { SHOOTS } from '@/lib/photos';

/** fill these in before sending it out. placeholders show until then. */
const CONTACT = { email: '', instagram: '' };

/* ================= shared ================= */

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => { setNow(new Date()); const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  return now;
}
const hhmm = (d: Date | null) => d ? d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Warsaw' }) : '--:--';
const dayline = (d: Date | null) => d ? d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Warsaw' }).toLowerCase() : '';
const ago = (t: number) => {
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 2) return 'just now';
  if (m < 60) return `${m} minutes ago`;
  const h = Math.round(m / 60); if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`;
  const d = Math.round(h / 24); return `${d} day${d > 1 ? 's' : ''} ago`;
};

function Lock() {
  return <svg viewBox="0 0 16 16" className="lock" aria-hidden><path d="M4 7V5a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="2" y="7" width="12" height="8" fill="currentColor" /></svg>;
}
function SiteIcon({ s }: { s: Site }) {
  return s.soon
    ? <span className="ico soon" style={{ background: s.tint }}><Lock /><b>soon</b></span>
    : <span className="ico"><img src={img('icon-' + s.id)} alt="" draggable={false} /></span>;
}
type AppKind = 'websites' | 'photos' | 'messages' | 'readme' | 'trash';
function AppIcon({ k }: { k: AppKind }) {
  if (k === 'websites') return (
    <span className="ico folder" aria-hidden>
      <span className="tab" />
      <span className="peek">{SITES.filter((s) => !s.soon).slice(0, 3).map((s) => <img key={s.id} src={img('icon-' + s.id)} alt="" draggable={false} />)}</span>
    </span>
  );
  if (k === 'photos') return <span className="ico photos" aria-hidden><i /><i /><i /></span>;
  if (k === 'messages') return <span className="ico msg" aria-hidden><i>hi</i></span>;
  if (k === 'readme') return <span className="ico doc" aria-hidden><i /><i /><i /><i /></span>;
  return <span className="ico trash" aria-hidden><i /></span>;
}
const APPS: { k: AppKind; label: string }[] = [
  { k: 'websites', label: 'websites' },
  { k: 'photos', label: 'photos' },
  { k: 'messages', label: 'messages' },
  { k: 'readme', label: 'read me.txt' },
  { k: 'trash', label: 'trash' },
];

/** a live site, rendered at desktop width and scaled to fit */
function Preview({ url, title, width = 1440 }: { url: string; title: string; width?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(900);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const ro = new ResizeObserver(() => { const s = Math.min(1, el.clientWidth / width); setScale(s); setH(el.clientHeight / s); });
    ro.observe(el); return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={box} className="preview">
      {!loaded && <div className="preview-loading"><span className="bar"><i /></span><span>loading {title}…</span></div>}
      <iframe src={url} title={`${title}, live site`} style={{ width: scale < 1 ? width : '100%', height: h, transform: `scale(${scale})` }} onLoad={() => setLoaded(true)} />
    </div>
  );
}

/* ================= the chat (contact) ================= */

type Msg = { from: 'us' | 'you'; text: string; links?: { label: string; href?: string; site?: Site }[] };
type Opt = { label: string; reply: Msg[]; next?: string[] };
const SHOW = (id: string) => SITES.find((s) => s.id === id)!;
const contactLinks = () => [
  { label: CONTACT.email || '[ email ]', href: CONTACT.email ? `mailto:${CONTACT.email}?subject=${encodeURIComponent('a website for my place')}` : undefined },
  { label: CONTACT.instagram ? '@' + CONTACT.instagram : '[ instagram ]', href: CONTACT.instagram ? `https://instagram.com/${CONTACT.instagram}` : undefined },
];
const OPTS: Record<string, Opt> = {
  place: { label: 'i have a place, i want a site', reply: [{ from: 'us', text: 'love that. what kind of place?' }], next: ['food', 'beauty', 'ink', 'shop', 'other'] },
  food: { label: 'restaurant / café / bakery', reply: [{ from: 'us', text: 'our favourite. three of these are open on the desktop:', links: [{ label: 'heavy cream', site: SHOW('heavy-cream') }, { label: 'gnam', site: SHOW('gnam') }, { label: 'dakdak', site: SHOW('dakdak') }] }, { from: 'us', text: 'send us 2–3 lines about your place and your instagram. we come back with an idea, not a quote.', links: contactLinks() }], next: ['price', 'time', 'photos'] },
  beauty: { label: 'salon / nails / beauty', reply: [{ from: 'us', text: 'cut a fringe on this one, then come back:', links: [{ label: 'grzywka', site: SHOW('grzywka') }] }, { from: 'us', text: 'a nail shop is in the oven too. tell us about yours:', links: contactLinks() }], next: ['price', 'time', 'photos'] },
  ink: { label: 'tattoo / studio', reply: [{ from: 'us', text: 'dziara, a tattoo studio, is coming soon. artists can’t have boring sites.' }, { from: 'us', text: 'send us your instagram, we’ll start from your flash.', links: contactLinks() }], next: ['price', 'time', 'photos'] },
  shop: { label: 'a shop', reply: [{ from: 'us', text: 'tipsy, a press-on nail shop, is coming soon. a basket that feels like a bar tab.' }, { from: 'us', text: 'tell us what you sell:', links: contactLinks() }], next: ['price', 'time', 'photos'] },
  other: { label: 'something else', reply: [{ from: 'us', text: 'even better. tell us:', links: contactLinks() }], next: ['price', 'time', 'photos'] },
  price: { label: 'how much?', reply: [{ from: 'us', text: 'depends on pages and photos. one page is small, a full site with a photoshoot is more.' }, { from: 'us', text: 'tell us what you need and you get a real number within a day. no packages, no tiers.' }], next: ['time', 'photos', 'contact'] },
  time: { label: 'how long does it take?', reply: [{ from: 'us', text: 'usually 2–4 weeks. figma first, so you see and change everything before we build it.' }], next: ['price', 'photos', 'contact'] },
  photos: { label: 'do you do photos too?', reply: [{ from: 'us', text: 'yes. creative direction and the shoot, so the site doesn’t run on stock photos. open photos on the desktop.' }], next: ['price', 'time', 'contact'] },
  contact: { label: 'just give me your contact', reply: [{ from: 'us', text: 'here:', links: contactLinks() }], next: ['place', 'price'] },
};

function Chat({ openSite }: { openSite: (s: Site) => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'us', text: 'hey. you found the chat. what brings you here?' }]);
  const [opts, setOpts] = useState<string[]>(['place', 'price', 'time', 'photos']);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [msgs, typing]);
  const pick = (id: string) => {
    const o = OPTS[id]; if (typing) return;
    setMsgs((m) => [...m, { from: 'you', text: o.label }]);
    setOpts([]);
    o.reply.forEach((r, i) => {
      setTimeout(() => setTyping(true), 250 + i * 1100);
      setTimeout(() => { setTyping(false); setMsgs((m) => [...m, r]); if (i === o.reply.length - 1) setOpts(o.next ?? []); }, 950 + i * 1100);
    });
  };
  return (
    <div className="chat">
      <div className="chat-head"><span className="dot" /> the peers collective <span className="dim">· online, warszawa</span></div>
      <div className="chat-log" aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            <p>{m.text}</p>
            {m.links && <div className="chips">{m.links.map((l) => l.site
              ? <button key={l.label} className="chip" onClick={() => openSite(l.site!)}>{l.label} ↗</button>
              : l.href ? <a key={l.label} className="chip" href={l.href} target="_blank" rel="noreferrer">{l.label}</a> : <span key={l.label} className="chip off">{l.label}</span>)}</div>}
          </div>
        ))}
        {typing && <div className="bubble us typing" aria-label="typing"><i /><i /><i /></div>}
        <div ref={end} />
      </div>
      <div className="chat-opts" role="group" aria-label="pick a reply">
        {opts.map((id) => <button key={id} className="opt" onClick={() => pick(id)}>{OPTS[id].label}</button>)}
      </div>
    </div>
  );
}

/* ================= photos ================= */

function Photos({ compact = false }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  const sh = SHOOTS[0];
  const p = sh.photos[i];
  return (
    <div className={`photos-app ${compact ? 'compact' : ''}`}>
      <div className="ph-main">
        {p.file ? <img src={img(p.file)} alt={p.alt} /> : <div className="ph-slot">[ {p.alt} ]</div>}
        <button className="ph-nav l" onClick={() => setI((i - 1 + sh.photos.length) % sh.photos.length)} aria-label="previous photo">‹</button>
        <button className="ph-nav r" onClick={() => setI((i + 1) % sh.photos.length)} aria-label="next photo">›</button>
      </div>
      <div className="ph-side">
        <p className="ph-title">{sh.title}</p>
        <p>{sh.line}</p>
        <p className="dim small">{sh.credits}</p>
        <div className="ph-strip">
          {sh.photos.map((x, k) => (
            <button key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={x.alt}>
              {x.file ? <img src={img(x.file)} alt="" /> : <span>{String(k + 1).padStart(2, '0')}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const README = (
  <>
    <p className="big">hi. we’re the peers collective.</p>
    <p>we make websites and photos for places people actually go to: bakeries, trattorias, chicken shops, salons, nail shops, tattoo studios.</p>
    <p>every brand gets its own look, its own shoot and one thing people remember. a croissant that falls asleep at 18:00. a fringe you cut yourself. a site that changes colour with your sauce.</p>
    <p>how we work: <b>creative direction → figma → real code</b>. fast on phones, easy to read, and the fun never gets in the way of booking a table.</p>
  </>
);

/* ================= login ================= */

function Login({ onIn, last }: { onIn: () => void; last: number | null }) {
  const [boot, setBoot] = useState(-1);
  const now = useClock();
  const live = SITES.filter((s) => !s.soon);
  const go = useCallback(() => {
    setBoot((b) => {
      if (b >= 0) return b;
      live.forEach((_, i) => setTimeout(() => setBoot(i + 1), 240 * (i + 1)));
      setTimeout(onIn, 240 * (live.length + 1) + 150);
      return 0;
    });
  }, [live, onIn]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Enter' && go(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [go]);
  return (
    <div className="login">
      <div className="login-card">
        <div className="monitor" aria-hidden>
          <div className="screen">{live.map((s) => <img key={s.id} src={img('icon-' + s.id)} alt="" />)}</div>
          <div className="stand" />
        </div>
        <h1 className="who">the peers collective</h1>
        <p className="sub">{last ? `welcome back. last login: ${ago(last)}` : 'websites + photos for places people actually go to'}</p>
        {boot < 0 ? (
          <>
            <button className="btn blue big" onClick={go} autoFocus>log in</button>
            <p className="hint">no password. just come in.</p>
          </>
        ) : (
          <div className="boot" role="status">
            <span className="bar"><i style={{ width: `${(boot / live.length) * 100}%` }} /></span>
            <span>{boot < live.length ? `waking up ${live[boot].name}…` : 'starting peers os…'}</span>
          </div>
        )}
      </div>
      <p className="login-foot">peers os 1.0 · {hhmm(now)} warszawa</p>
    </div>
  );
}

/* ================= desktop ================= */

type Win = { key: string; kind: 'site' | 'soon' | AppKind; site?: Site; x: number; y: number; w: number; h: number; z: number; max?: boolean };
const WALLS = [null, 'heavy-cream', 'gnam', 'dakdak', 'grzywka'] as const;

function Desktop({ onOut }: { onOut: () => void }) {
  const [wins, setWins] = useState<Win[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [ctx, setCtx] = useState<null | { x: number; y: number }>(null);
  const [wallPick, setWallPick] = useState(0);
  const [saver, setSaver] = useState(false);
  const z = useRef(10);
  const now = useClock();

  const open = useCallback((kind: Win['kind'], site?: Site, at?: { x: number; y: number }) => {
    const key = kind + (site ? ':' + site.id : '');
    setWins((ws) => {
      const top = ++z.current;
      if (ws.some((w) => w.key === key)) return ws.map((w) => (w.key === key ? { ...w, z: top } : w));
      const vw = window.innerWidth, vh = window.innerHeight, n = ws.length;
      const size = kind === 'site' ? { w: Math.min(1100, vw - 230), h: Math.min(740, vh - 80) }
        : kind === 'soon' ? { w: 400, h: 210 }
        : kind === 'photos' ? { w: Math.min(980, vw - 230), h: Math.min(640, vh - 90) }
        : kind === 'messages' ? { w: 400, h: Math.min(560, vh - 90) }
        : kind === 'websites' ? { w: 560, h: 330 }
        : kind === 'readme' ? { w: 480, h: 420 }
        : { w: 380, h: 260 };
      const x = kind === 'soon' ? (vw - size.w) / 2 : kind === 'messages' ? vw - size.w - 150 : Math.max(16, Math.min(vw - size.w - 140, 36 + n * 30));
      const y = kind === 'soon' ? (vh - size.h) / 2.4 : Math.max(36, Math.min(vh - size.h - 14, 42 + n * 26));
      return [...ws, { key, kind, site, ...size, x: at?.x ?? x, y: at?.y ?? y, z: top }];
    });
  }, []);
  const openSite = useCallback((s: Site) => (s.soon ? open('soon', s) : open('site', s)), [open]);
  const close = (key: string) => setWins((ws) => ws.filter((w) => w.key !== key));
  const focus = (key: string) => setWins((ws) => ws.map((w) => (w.key === key ? { ...w, z: ++z.current } : w)));
  const patch = (key: string, p: Partial<Win>) => setWins((ws) => ws.map((w) => (w.key === key ? { ...w, ...p } : w)));

  // first time in: the read me + the websites folder
  useEffect(() => {
    const vw = window.innerWidth;
    open('readme', undefined, { x: Math.max(24, vw * .06), y: 64 });
    setTimeout(() => open('websites', undefined, { x: Math.max(60, vw * .06 + 420), y: 230 }), 250);
  }, [open]);

  // the desktop takes on the look of whichever site is in front
  const front = useMemo(() => wins.filter((w) => w.kind === 'site').sort((a, b) => b.z - a.z)[0]?.site ?? null, [wins]);
  const theme = front?.id ?? WALLS[wallPick];

  // screensaver after 40s doing nothing
  useEffect(() => {
    let t = setTimeout(() => setSaver(true), 40000);
    const wake = () => { setSaver(false); clearTimeout(t); t = setTimeout(() => setSaver(true), 40000); };
    const ev = ['pointermove', 'pointerdown', 'keydown', 'wheel'];
    ev.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => { clearTimeout(t); ev.forEach((e) => window.removeEventListener(e, wake)); };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenu(null); setCtx(null);
      setWins((ws) => { if (!ws.length) return ws; const top = ws.reduce((a, b) => (a.z > b.z ? a : b)); return ws.filter((w) => w !== top); });
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, []);

  const MENUS: Record<string, [string, () => void][]> = {
    '✺ peers': [['about peers os', () => open('readme')], ['messages', () => open('messages')], ['log out', onOut]],
    file: [['open websites', () => open('websites')], ['open photos', () => open('photos')], ...SITES.filter((s) => !s.soon).map((s) => [`open ${s.name}`, () => openSite(s)] as [string, () => void])],
    view: [['change wallpaper', () => setWallPick((w) => (w + 1) % WALLS.length)], ['screensaver', () => setTimeout(() => setSaver(true), 300)]],
    special: [['close all windows', () => setWins([])], ['restart', onOut]],
  };

  return (
    <div
      className="desktop"
      data-theme={theme ?? 'none'}
      onPointerDown={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('wall')) { setSel(null); setMenu(null); setCtx(null); } }}
      onContextMenu={(e) => { if ((e.target as HTMLElement).closest('.win,.menubar')) return; e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
    >
      {WALLS.filter(Boolean).map((w) => <div key={w} className={`wall ${theme === w ? 'on' : ''}`} style={{ backgroundImage: `url(${img('wall-' + w)})` }} aria-hidden />)}

      <header className="menubar">
        <nav aria-label="menu">
          {Object.keys(MENUS).map((m) => (
            <div key={m} className="mb-item">
              <button className={menu === m ? 'on' : ''} aria-expanded={menu === m} onClick={() => setMenu(menu === m ? null : m)} onPointerEnter={() => menu && setMenu(m)}>{m}</button>
              {menu === m && (
                <ul className="dropdown" role="menu">
                  {MENUS[m].map(([l, f]) => <li key={l}><button role="menuitem" onClick={() => { setMenu(null); f(); }}>{l}</button></li>)}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <div className="mb-right">
          {front && <span className="now-viewing">viewing: {front.name}</span>}
          <button onClick={() => open('messages')}>messages <span className="badge">1</span></button>
          <span>{hhmm(now)}</span>
        </div>
      </header>

      <div className="wallmark" aria-hidden>
        <p>the peers collective</p>
        <p className="small">websites + photos for bakeries, trattorias, chicken shops, salons, nail shops and tattoo studios.</p>
      </div>

      <ul className="icons" aria-label="desktop">
        {APPS.map((a) => (
          <li key={a.k}>
            <button className={`dicon ${sel === a.k ? 'sel' : ''}`} onClick={() => (sel === a.k ? open(a.k) : setSel(a.k))} onDoubleClick={() => open(a.k)} onKeyDown={(e) => e.key === 'Enter' && open(a.k)}>
              <AppIcon k={a.k} />
              <span className="nm">{a.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {ctx && (
        <ul className="dropdown ctx" role="menu" style={{ left: ctx.x, top: ctx.y }}>
          {[['open websites', () => open('websites')], ['change wallpaper', () => setWallPick((w) => (w + 1) % WALLS.length)], ['start screensaver', () => setTimeout(() => setSaver(true), 300)], ['get info', () => open('readme')]].map(([l, f]) => (
            <li key={l as string}><button role="menuitem" onClick={() => { setCtx(null); (f as () => void)(); }}>{l as string}</button></li>
          ))}
        </ul>
      )}

      {wins.map((w) => <Window key={w.key} w={w} onClose={() => close(w.key)} onFocus={() => focus(w.key)} onPatch={(p) => patch(w.key, p)} open={open} openSite={openSite} />)}

      {saver && <Saver />}
    </div>
  );
}

function Window({ w, onClose, onFocus, onPatch, open, openSite }: { w: Win; onClose: () => void; onFocus: () => void; onPatch: (p: Partial<Win>) => void; open: (k: Win['kind'], s?: Site) => void; openSite: (s: Site) => void }) {
  const drag = useRef<null | { mode: 'move' | 'size'; sx: number; sy: number; x: number; y: number; w: number; h: number }>(null);
  const [busy, setBusy] = useState(false);
  const start = (mode: 'move' | 'size') => (e: React.PointerEvent) => {
    if (mode === 'move' && (e.target as HTMLElement).closest('button')) return;
    e.preventDefault(); onFocus();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { mode, sx: e.clientX, sy: e.clientY, x: w.x, y: w.y, w: w.w, h: w.h };
    setBusy(true);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (d.mode === 'move') onPatch({ x: Math.min(window.innerWidth - 80, Math.max(-d.w + 120, d.x + dx)), y: Math.min(window.innerHeight - 40, Math.max(26, d.y + dy)), max: false });
    else onPatch({ w: Math.max(320, d.w + dx), h: Math.max(200, d.h + dy) });
  };
  const end = () => { drag.current = null; setBusy(false); };
  const s = w.site;
  const titles: Record<string, string> = { websites: 'websites — 4 live, 2 in the oven', photos: 'photos — creative direction', messages: 'messages', readme: 'read me.txt', trash: 'trash' };
  const title = w.kind === 'site' && s ? `${s.name} — ${s.kind}, ${s.place}` : titles[w.kind] ?? '';
  const style: React.CSSProperties = w.max ? { left: 0, top: 26, width: '100%', height: 'calc(100% - 26px)', zIndex: w.z } : { left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z };

  if (w.kind === 'soon' && s) {
    return (
      <div className="win alert" style={style} role="alertdialog" aria-labelledby={`t-${w.key}`} onPointerDown={onFocus}>
        <div className="alert-body">
          <SiteIcon s={s} />
          <div>
            <p id={`t-${w.key}`} className="alert-t">{s.name} is still in the oven.</p>
            <p>{s.kind}, {s.place}. {s.line}</p>
            <p className="dim">coming soon.</p>
          </div>
        </div>
        <div className="alert-row"><button className="btn blue" onClick={onClose} autoFocus>ok</button></div>
      </div>
    );
  }

  return (
    <section className={`win ${busy ? 'busy' : ''} k-${w.kind}`} style={style} role="dialog" aria-label={title} onPointerDown={onFocus}>
      <div className="titlebar" onPointerDown={start('move')} onPointerMove={move} onPointerUp={end} onDoubleClick={() => onPatch({ max: !w.max })}>
        <button className="tb-btn close" onClick={onClose} aria-label={`close ${title}`} />
        <span className="stripes" aria-hidden />
        <h2 className="tb-title">{title}</h2>
        <span className="stripes" aria-hidden />
        <button className="tb-btn zoom" onClick={() => onPatch({ max: !w.max })} aria-label={w.max ? 'restore window' : 'maximise window'} />
      </div>

      {w.kind === 'site' && s?.url && (
        <>
          <div className="toolbar">
            <span className="addr">{s.url.replace('https://', '')}</span>
            <a className="btn" href={s.url} target="_blank" rel="noreferrer">open full site ↗</a>
          </div>
          <Preview url={s.url} title={s.name} />
          <div className="status"><b>★ the one thing</b><span>{s.thing}</span></div>
        </>
      )}

      {w.kind === 'websites' && (
        <div className="folder-body">
          <p className="folder-info dim">6 items · double-click to open</p>
          <ul className="folder-grid">
            {SITES.map((x) => (
              <li key={x.id}>
                <button className="dicon dark" onDoubleClick={() => openSite(x)} onKeyDown={(e) => e.key === 'Enter' && openSite(x)} onClick={(e) => { if ((e.currentTarget as HTMLElement).classList.contains('sel')) openSite(x); else { document.querySelectorAll('.folder-grid .sel').forEach((n) => n.classList.remove('sel')); e.currentTarget.classList.add('sel'); } }}>
                  <SiteIcon s={x} />
                  <span className="nm">{x.name}</span>
                  <span className="kind">{x.soon ? 'soon' : x.kind}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {w.kind === 'photos' && <Photos />}
      {w.kind === 'messages' && <Chat openSite={openSite} />}

      {w.kind === 'readme' && (
        <div className="doc-body">
          {README}
          <div className="row">
            <button className="btn" onClick={() => open('websites')}>open websites</button>
            <button className="btn" onClick={() => open('photos')}>open photos</button>
            <button className="btn blue" onClick={() => open('messages')}>say hi</button>
          </div>
        </div>
      )}

      {w.kind === 'trash' && (
        <div className="doc-body trash-list">
          <p className="dim">3 items · things we will never make for you</p>
          <ul>
            <li>▫ salon-template-final-v2.html</li>
            <li>▫ stock-photo-latte-art.jpg</li>
            <li>▫ “welcome to our website”.txt</li>
          </ul>
          <button className="btn" onClick={onClose}>empty trash</button>
        </div>
      )}

      <div className="resize" onPointerDown={start('size')} onPointerMove={move} onPointerUp={end} aria-hidden />
    </section>
  );
}

/** the screensaver: the name bounces around. hit a corner and it celebrates. */
function Saver() {
  const box = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(0);
  const [corners, setCorners] = useState(0);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 60, y = 80, vx = 2.2, vy = 1.7, raf = 0;
    const tick = () => {
      const b = box.current, l = logo.current; if (!b || !l) return;
      const W = b.clientWidth - l.offsetWidth, H = b.clientHeight - l.offsetHeight;
      x += vx; y += vy; let hx = false, hy = false;
      if (x <= 0 || x >= W) { vx *= -1; x = Math.max(0, Math.min(W, x)); hx = true; }
      if (y <= 0 || y >= H) { vy *= -1; y = Math.max(0, Math.min(H, y)); hy = true; }
      if (hx || hy) setHue((h) => (h + 1) % 5);
      if (hx && hy) { setCorners((c) => c + 1); setFlash(true); setTimeout(() => setFlash(false), 1600); }
      l.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={box} className={`saver ${flash ? 'flash' : ''}`} aria-hidden>
      <div ref={logo} className={`saver-logo h${hue}`}>the peers<br />collective</div>
      {flash && <p className="saver-corner">IT HIT THE CORNER.</p>}
      {corners > 0 && <p className="saver-count">corners: {corners}</p>}
    </div>
  );
}

/* ================= phone ================= */

function Phone({ onOut, startLocked }: { onOut: () => void; startLocked: boolean }) {
  const [locked, setLocked] = useState(startLocked);
  const [app, setApp] = useState<null | { kind: 'site' | AppKind; site?: Site }>(null);
  const [alert, setAlert] = useState<Site | null>(null);
  const now = useClock();
  const live = SITES.filter((s) => !s.soon);
  const NOTES = ['the croissant is asleep. back at seven.', 'your table for two is printed.', 'sauce changed to yangnyeom.', 'your fringe is ready.'];
  const openSite = (s: Site) => (s.soon ? setAlert(s) : setApp({ kind: 'site', site: s }));
  const theme = app?.site?.id;

  if (locked) {
    return (
      <div className="lockscreen" onClick={() => setLocked(false)}>
        <div className="lock-wall" aria-hidden>{live.map((s) => <img key={s.id} src={img('wall-' + s.id)} alt="" />)}</div>
        <div className="lock-top">
          <p className="lock-day">{dayline(now)}</p>
          <p className="lock-time">{hhmm(now)}</p>
        </div>
        <ul className="notes" aria-label="notifications">
          {live.map((s, i) => <li key={s.id}><img src={img('icon-' + s.id)} alt="" /><div><b>{s.name}</b><span>{NOTES[i]}</span></div></li>)}
          <li><span className="ico msg mini" aria-hidden><i>hi</i></span><div><b>messages</b><span>the peers collective: hey. you found us.</span></div></li>
        </ul>
        <button className="unlock" onClick={() => setLocked(false)}>tap to open</button>
      </div>
    );
  }

  return (
    <div className="home" data-theme={theme ?? 'none'}>
      <div className="statusbar"><span>{hhmm(now)}</span><span>peers os</span><span>▮▮▮ 100%</span></div>
      <p className="home-hi">the peers collective</p>
      <p className="home-sub">websites + photos for places people actually go to.</p>
      <p className="home-label">websites · live, tap one</p>
      <ul className="grid">
        {SITES.map((s) => (
          <li key={s.id}>
            <button onClick={() => openSite(s)} aria-label={`${s.name}, ${s.soon ? 'coming soon' : s.kind + ', ' + s.place}`}>
              <SiteIcon s={s} />
              <span className="nm">{s.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="dock">
        {(['photos', 'messages', 'readme'] as AppKind[]).map((k) => (
          <button key={k} onClick={() => setApp({ kind: k })}><AppIcon k={k} /><span className="nm">{k === 'readme' ? 'read me' : k}</span></button>
        ))}
        <button onClick={onOut}><span className="ico power" aria-hidden><i /></span><span className="nm">lock</span></button>
      </div>

      {alert && (
        <div className="sheet-bg" onClick={() => setAlert(null)}>
          <div className="win alert phone-alert" role="alertdialog" aria-label={`${alert.name} is coming soon`} onClick={(e) => e.stopPropagation()}>
            <div className="alert-body"><SiteIcon s={alert} /><div><p className="alert-t">{alert.name} is still in the oven.</p><p>{alert.kind}, {alert.place}. {alert.line}</p></div></div>
            <div className="alert-row"><button className="btn blue" onClick={() => setAlert(null)} autoFocus>ok</button></div>
          </div>
        </div>
      )}

      {app && (
        <div className={`appview k-${app.kind}`} role="dialog" aria-label={app.site?.name ?? app.kind}>
          <div className="appbar">
            <button onClick={() => setApp(null)}>‹ home</button>
            <b>{app.site?.name ?? (app.kind === 'readme' ? 'read me' : app.kind)}</b>
            {app.site?.url ? <a href={app.site.url} target="_blank" rel="noreferrer">open ↗</a> : <span />}
          </div>
          {app.kind === 'site' && app.site?.url && (
            <>
              <div className="app-frame"><iframe src={app.site.url} title={`${app.site.name}, live site`} /></div>
              <p className="app-thing"><b>★</b> {app.site.thing}</p>
            </>
          )}
          {app.kind === 'photos' && <Photos compact />}
          {app.kind === 'messages' && <Chat openSite={openSite} />}
          {app.kind === 'readme' && <div className="doc-body">{README}</div>}
        </div>
      )}
    </div>
  );
}

/* ================= root ================= */

export default function OS() {
  const [phase, setPhase] = useState<'loading' | 'login' | 'in'>('loading');
  const [phone, setPhone] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const f = () => setPhone(mq.matches); f(); mq.addEventListener('change', f);
    let inn = false;
    try {
      inn = sessionStorage.getItem('peers-in') === '1';
      const l = localStorage.getItem('peers-last'); if (l) setLast(+l);
      localStorage.setItem('peers-last', String(Date.now()));
    } catch {}
    setPhase(inn ? 'in' : 'login');
    return () => mq.removeEventListener('change', f);
  }, []);
  const login = useCallback(() => { try { sessionStorage.setItem('peers-in', '1'); } catch {} setPhase('in'); }, []);
  const logout = useCallback(() => { try { sessionStorage.removeItem('peers-in'); } catch {} setPhase('login'); }, []);
  if (phase === 'loading') return <div className="blank" />;
  if (phone) return <Phone key={phase} onOut={logout} startLocked={phase === 'login'} />;
  return phase === 'login' ? <Login onIn={login} last={last} /> : <Desktop onOut={logout} />;
}
