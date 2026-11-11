'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Lang, Project } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { u } from '@/lib/u';
import { LangSwitch } from './bits';
import BadSite from './BadSite';
import { LoopCycle } from './Loop';

const NOTE_BG: Record<string, string> = { 'heavy-cream': 'rgba(255,227,234,.82)', gnam: 'rgba(255,243,227,.85)', dakdak: 'rgba(11,10,9,.72)', grzywka: 'rgba(120,8,40,.55)' };
const SWATCH_AT: Record<string, [number, number]> = { 'heavy-cream': [1160, 150], gnam: [1170, 320], dakdak: [1170, 716], grzywka: [1170, 34] };

export default function ProjectView({ p, lang }: { p: Project; lang: Lang }) {
  const [steal, setSteal] = useState(false);
  const [inspect, setInspect] = useState(false);
  const [vs, setVs] = useState(false);
  const [sheet, setSheet] = useState(false);
  useEffect(() => { const t = setTimeout(() => setSteal(true), 250); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSteal(false); setSheet(false); } };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, []);
  const C = p.c;
  const ruler = p.slug === 'grzywka' ? '#111111' : C.ink;
  const nn = `0${p.n} / 04`;
  const onToggle = () => { setInspect((v) => !v); setVs(false); };
  const onVs = () => { setVs((v) => !v); setInspect(false); };
  const showSteal = steal && !inspect && !vs;
  const [sx, sy] = SWATCH_AT[p.slug];
  const nb = NOTE_BG[p.slug];

  const Bar = (
    <>
      <span className="pv-n" style={{ color: C.dim }}>{nn}</span>
      <h1 className="pv-name" style={{ color: C.ink }}>{p.name}</h1>
      <span className="pv-meta" style={{ color: vs ? C.ink : C.dim }}>{vs ? p.sameLine[lang] : p.meta[lang]}</span>
      <div className="pv-right">
      <button className={'pv-tog' + (inspect ? ' on' : '')} onClick={onToggle} aria-pressed={inspect} style={{ color: C.ink, ['--k' as string]: C.ink }}>
        <i aria-hidden><b /></i>{tr(lang, 'see_how')}
      </button>
      <button className={'pv-vs' + (vs ? ' on' : '')} onClick={onVs} aria-pressed={vs} style={{ color: vs ? (p.slug === 'grzywka' ? '#111' : C.btnInk) : C.ink, borderColor: C.ink, background: vs ? C.ink : 'transparent' }}>
        {p.vsLabel[lang]}{vs ? ' ✓' : ''}
      </button>
      <a className="pv-visit" href={p.live} style={{ background: C.visitBg, color: C.visitInk }}>{tr(lang, 'visit')}</a>
      </div>
    </>
  );

  return (
    <section className="pv" style={{ background: C.bg }}>
      {/* ---------- desktop ---------- */}
      <div className="stage desk-only" style={{ height: u(900), background: C.bg }}>
        <div className="ruler-top abs" style={{ backgroundColor: ruler }} aria-hidden />
        <div className="ruler-left abs" style={{ backgroundColor: ruler }} aria-hidden />
        <Link className="abs pv-crumb" href={href(lang, '/') + '#work'} style={{ color: C.bg === '#0b0a09' ? '#0b0a09' : C.bg }}>{tr(lang, 'crumbs')} {p.name}</Link>
        <div className="abs pv-img" style={{ left: u(24), top: u(24), width: u(1416), height: u(776) }}>
          <img src={p.shot} alt={`${p.name} — ${p.where[lang]}`} />
        </div>

        {vs && (
          <div className="abs pv-bad" style={{ left: u(24), top: u(24), width: u(706), height: u(776) }}>
            <BadSite slug={p.slug} lang={lang} />
          </div>
        )}
        {vs && (
          <>
            <div className="abs" style={{ left: u(731), top: u(24), width: u(3), height: u(776), background: C.ink, zIndex: 9 }} aria-hidden />
            <span className="abs pv-label" style={{ left: u(756), top: u(40), background: C.ink, color: C.btnInk }}>{p.name}</span>
            {p.vsNotes.map((n, i) => <div key={i} className="hand abs pv-note" style={{ left: u(n.x), top: u(n.y), fontSize: u(24), transform: `rotate(${n.r ?? 0}deg)`, zIndex: 9, color: p.slug === 'grzywka' ? '#fff' : undefined, background: nb }}>{n.text[lang]}</div>)}
          </>
        )}

        {inspect && (
          <div className="abs pv-insp" style={{ left: 0, top: 0, width: '100%', height: u(800) }}>
            <div className="abs" style={{ left: u(24), top: u(24), width: u(1416), height: u(776), background: 'rgba(23,5,7,.35)' }} />
            {p.inspectChips.map((c, i) => (
              <span key={i} className={'abs chip' + (c.kind === 'num' ? ' num' : '')} style={{ left: u(c.x), top: u(c.y) }}>{c.text[lang]}</span>
            ))}
            {p.swatches.map((s, i) => (
              <span key={s.hex} className="abs sw" style={{ left: u(sx + i * 64), top: u(sy) }}>
                <i style={{ background: s.hex }} />{s.hex}
              </span>
            ))}
            {p.inspectNotes.map((n, i) => (
              <div key={i} className="hand abs pv-note" style={{ left: u(n.x), top: u(n.y), fontSize: u(26), transform: `rotate(${n.r ?? 0}deg)`, color: p.slug === 'grzywka' ? '#fff' : '#ff3b30', background: nb }}>{n.text[lang]}</div>
            ))}
          </div>
        )}

        <div className="abs pv-bar" style={{ left: u(24), top: u(800), width: u(1416), height: u(100), background: inspect ? '#170507' : C.bg, borderTop: `1px solid ${inspect ? '#3a1a20' : C.ink}`, ['--ink' as string]: inspect ? '#fff4e2' : C.ink }}>
          {Bar}
        </div>

        {showSteal && <Steal p={p} lang={lang} onClose={() => setSteal(false)} />}
        {!showSteal && !inspect && !vs && (
          <button className="abs pv-reopen" style={{ right: u(48), top: u(48), background: C.window, color: C.ink, borderColor: C.ink }} onClick={() => setSteal(true)}>steal_the_idea.txt ↗</button>
        )}
      </div>

      {/* ---------- phone ---------- */}
      <div className="pv-m mob-only" style={{ background: C.bg, color: C.ink }}>
        <div className="pvm-img">
          {vs ? (
            <div className="pvm-bad"><BadSite slug={p.slug} lang={lang} /></div>
          ) : (
            <img src={p.phone} alt={`${p.name} — ${p.where[lang]}`} />
          )}
        </div>
        <div className="pvm-bar" style={{ ['--ink' as string]: C.ink }}>{Bar}</div>
        {inspect && !vs && (
          <div className="pvm-spec">
            <p className="pvm-spec-h">{tr(lang, 'see_how')}</p>
            <ol>{p.inspectNotes.map((n, i) => <li key={i}><b>{i + 1}</b><span className="hand">{n.text[lang].replace(/\n/g, ' ')}</span></li>)}</ol>
            <div className="pvm-chips">{p.inspectChips.filter((c) => c.kind !== 'num').map((c, i) => <span key={i} className="chip">{c.text[lang]}</span>)}</div>
            <div className="pvm-sw">{p.swatches.map((s) => <span key={s.hex}><i style={{ background: s.hex }} />{s.hex}</span>)}</div>
          </div>
        )}
        <button className="pvm-sheetbtn" style={{ background: C.window, color: p.slug === 'grzywka' ? '#de2a59' : C.ink, borderColor: p.slug === 'grzywka' ? '#de2a59' : C.ink }} onClick={() => setSheet(true)}>{tr(lang, 'steal')} ↑</button>
        {sheet && (
          <div className="pvm-sheet" role="dialog" aria-label={tr(lang, 'steal')} onClick={() => setSheet(false)}>
            <div onClick={(e) => e.stopPropagation()}><Steal p={p} lang={lang} onClose={() => setSheet(false)} mobile /></div>
          </div>
        )}
      </div>
    </section>
  );
}

function Steal({ p, lang, onClose, mobile }: { p: Project; lang: Lang; onClose: () => void; mobile?: boolean }) {
  const C = p.c;
  const bar = p.slug === 'grzywka' ? '#de2a59' : C.ink;
  const tb = p.slug === 'heavy-cream' ? '#ffe3ea' : p.slug === 'dakdak' ? '#0b0a09' : '#ffffff';
  const title = p.slug === 'grzywka' ? '#de2a59' : C.ink;
  return (
    <div className={mobile ? 'steal steal-m' : 'abs steal'} style={mobile ? { background: C.window, borderColor: p.slug === 'grzywka' ? '#111' : C.ink } : { left: u(1010), top: u(60), width: u(400), height: u(700), background: C.window, borderColor: p.slug === 'grzywka' ? '#111' : C.ink }} role={mobile ? undefined : 'dialog'} aria-label={tr(lang, 'steal')}>
      <div className="st-bar" style={{ background: bar }}>
        <button className="st-dot" style={{ background: '#ff5f57' }} onClick={onClose} aria-label={tr(lang, 'close')} />
        <i style={{ background: '#febc2e' }} /><i style={{ background: '#28c840' }} />
        <span style={{ color: tb }}>steal_the_idea.txt</span>
      </div>
      <div className="st-body">
        <h2 className="serif" style={{ color: title }}>{tr(lang, 'steal')}</h2>
        <p className="st-sub" style={{ color: C.body }}>{tr(lang, 'steal_sub')} {p.slug === 'grzywka' && lang === 'pl' ? 'grzywce' : p.name}.</p>
        <div className="st-loop" style={{ background: C.soft }}><LoopCycle slug={p.slug} /></div>
        {p.tricks.map((t, i) => (
          <div key={i} className="st-row" style={{ borderTopColor: i ? hexa(title, 0.15) : 'transparent' }}>
            <span className="st-n">0{i + 1}</span>
            <div>
              <h3 style={{ color: title }}>{t.title[lang]}</h3>
              <p style={{ color: C.body }}>{t.desc[lang]}</p>
            </div>
            <a href={p.live} style={{ color: p.slug === 'heavy-cream' ? '#ff3b30' : p.slug === 'dakdak' ? '#efe6d6' : '#131414' }}>{tr(lang, 'try_it')}</a>
          </div>
        ))}
        <p className="st-end" style={{ color: C.body, borderTopColor: hexa(title, 0.3) }}>{tr(lang, 'steal_end')}</p>
        <Link className="st-cta" href={href(lang, '/contact/')} style={{ background: title, color: p.slug === 'dakdak' ? '#141210' : p.slug === 'heavy-cream' ? '#ffe3ea' : '#fff' }}>{tr(lang, 'make_mine')}</Link>
      </div>
    </div>
  );
}

function hexa(h: string, a: number) {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
