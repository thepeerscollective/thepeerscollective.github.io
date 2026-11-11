import '@fontsource/inter/900.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/black-han-sans/400.css';
import '@fontsource/krona-one/400.css';
import '@fontsource/doto/900.css';
import '@fontsource/antonio/700.css';
import '@fontsource/unbounded/900.css';
import '@fontsource/schibsted-grotesk/400.css';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { projects, type Lang, type Project } from '@/lib/projects';
import { tr, href } from '@/lib/i18n';
import { u } from '@/lib/u';
import LivePhone from './LivePhone';

const ff = (spec: string): CSSProperties => {
  const [family, w] = spec.split(';');
  return w === 'italic' ? { fontFamily: family, fontStyle: 'italic', fontWeight: 400 } : { fontFamily: family, fontWeight: Number(w) };
};
const SMALL: Record<string, [number, number, number, number][]> = {
  'heavy-cream': [[740, 1120, 200, 174], [950, 1104, 180, 242]],
  gnam: [[744, 1124, 162, 220], [952, 1124, 176, 220], [1160, 1124, 176, 220]],
  dakdak: [[744, 1124, 190, 152], [952, 1124, 190, 152], [1160, 1124, 176, 152]],
  grzywka: [[744, 1124, 147, 220], [952, 1124, 147, 220], [1160, 1124, 176, 220]],
};

export default function CaseStudy({ p, lang }: { p: Project; lang: Lang }) {
  const C = p.c;
  const ink = p.slug === 'grzywka' ? '#de2a59' : C.ink;
  const dim = p.slug === 'grzywka' ? '#b36a80' : C.dim;
  const bg = C.caseBg;
  const nxt = projects.find((q) => q.slug === p.next.slug);
  const nb = nxt ? nxt.c.bg : '#170507';
  const ni = nxt ? nxt.c.ink : '#fff4e2';
  const hcType = p.slug === 'heavy-cream';
  const rows = hcType ? [] : p.type;
  const rowGap = rows.length === 4 ? 48 : 60;
  const rowY0 = rows.length === 4 ? 788 : 798;
  const sampleX = p.slug === 'gnam' ? 560 : p.slug === 'dakdak' ? 600 : 640;
  const labelX = p.slug === 'grzywka' ? 400 : 380;
  const nextHref = p.next.slug ? href(lang, `/work/${p.next.slug}/`) : href(lang, '/') + '#work';

  const Next = <Link className="cs-next" href={nextHref} style={{ background: nb, color: ni }}>{p.next.label[lang]}</Link>;

  return (
    <section className="cs" style={{ background: bg, color: ink }} aria-label="case study">
      {/* ---------- desktop ---------- */}
      <div className="stage desk-only" style={{ height: u(2350) }}>
        <span className="abs cs-n" style={{ left: u(80), top: u(80), color: dim }}>0{p.n} / 04</span>
        <h2 className="abs serif cs-title" style={{ left: u(72), top: u(96) }}>{p.name}</h2>
        <p className="abs cs-scope pre" style={{ left: u(84), top: u(290) }}>{p.scope[lang]}</p>
        <div className="hand abs" style={{ left: u(1010), top: u(150), fontSize: u(34), transform: 'rotate(-4deg)' }}>{tr(lang, 'whole_thing')}</div>

        <span className="abs cs-sec" style={{ left: u(80), top: u(400) }}>{tr(lang, 'the_brand')}</span>
        <div className="abs cs-line" style={{ left: u(80), top: u(420), width: u(1280), background: ink }} />
        <div className="abs cs-tile cs-logo" style={{ left: u(80), top: u(444), width: u(620), height: u(300) }}>
          <img src={`/a/mock-${p.slug === 'heavy-cream' ? 'hc' : p.slug === 'gnam' ? 'gn' : p.slug === 'dakdak' ? 'dk' : 'gz'}.webp`} alt={`${p.name} logo`} loading="lazy" />
          <span className="cs-wild">{tr(lang, 'in_wild')}</span>
        </div>
        <div className="abs cs-tile" style={{ left: u(720), top: u(444), width: u(640), height: u(300), background: C.tile }} />
        {p.swatches.map((s, i) => (
          <div key={s.hex} className="abs cs-sw" style={{ left: u(744 + i * 152), top: u(468) }}>
            <i style={{ background: s.hex, border: s.hex === '#FFF4EA' || s.hex === '#FFF3E3' ? '1px solid #e9c9d0' : undefined }} />
            <b style={{ color: ink }}>{s.name[lang]}</b>
            <span style={{ color: dim }}>{s.hex}</span>
          </div>
        ))}
        <div className="abs cs-tile" style={{ left: u(80), top: u(764), width: u(1280), height: u(220), background: C.tile }} />
        {hcType ? (
          <>
            <img className="abs" src={p.aa.img} alt="" style={{ left: u(110), top: u(780), width: u(179) }} loading="lazy" />
            {p.type.map((t, i) => {
              const col = i < 3 ? 380 : 820;
              const y = 782 + (i % 3) * 64;
              return (
                <div key={i}>
                  <span className="abs cs-tl" style={{ left: u(col), top: u(y), color: dim }}>{t.label[lang]}</span>
                  <img className="abs" src={t.img} alt={t.label.en} style={{ left: u(col - 6), top: u(y + 12), width: u(t.imgW!) }} loading="lazy" />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <span className="abs cs-aa" style={{ left: u(110), top: u(770), ...ff(p.aa.font), fontSize: u(p.slug === 'grzywka' ? 110 : 120) }}>Aa</span>
            {rows.map((t, i) => (
              <div key={i}>
                <span className="abs cs-tl" style={{ left: u(labelX), top: u(rowY0 + i * rowGap + 8), color: dim }}>{t.label[lang]}</span>
                <span className="abs cs-sample" style={{ left: u(sampleX), top: u(rowY0 + i * rowGap - 8), ...ff(t.font), fontSize: u(t.size) }}>{t.sample}</span>
              </div>
            ))}
          </>
        )}

        <span className="abs cs-sec" style={{ left: u(80), top: u(1040) }}>{p.section2[lang]}</span>
        <div className="abs cs-line" style={{ left: u(80), top: u(1060), width: u(1280), background: ink }} />
        <div className="abs cs-tile" style={{ left: u(80), top: u(1084), width: u(620), height: u(440), background: p.s2.bigBg }} />
        <img className="abs cs-img" src={p.s2.big} alt="" loading="lazy" style={hcType ? { left: u(140), top: u(1150), width: u(500), height: u(358), objectFit: 'contain' } : { left: u(110), top: u(1114), width: u(560), height: u(380) }} />
        <div className="hand abs" style={{ left: u(hcType ? 494 : 520), top: u(1018), fontSize: u(24), transform: 'rotate(-3deg)', zIndex: 3 }}>{p.s2.bigNote[lang]}</div>
        <div className="abs cs-tile" style={{ left: u(720), top: u(1084), width: u(640), height: u(440), background: C.tile }} />
        {p.s2.small.map((s, i) => {
          const [x, y, w, h] = SMALL[p.slug][i];
          return <img key={s} className="abs cs-img" src={s} alt="" loading="lazy" style={{ left: u(x), top: u(y), width: u(w), height: u(h), objectFit: hcType ? 'contain' : 'cover' }} />;
        })}
        <div className="hand abs" style={{ left: u(1000), top: u(hcType ? 1430 : 1400), fontSize: u(24), transform: 'rotate(2deg)' }}>{p.s2.smallNote[lang]}</div>

        <span className="abs cs-sec" style={{ left: u(80), top: u(1580) }}>{tr(lang, 'play')}</span>
        <div className="abs cs-line" style={{ left: u(80), top: u(1600), width: u(1280), background: ink }} />
        <div className="abs cs-phone" style={{ left: u(120), top: u(1640), width: u(320), height: u(528) }}>
          <LivePhone src={p.live} poster={p.phone} title={`${p.name} live`} />
        </div>
        <div className="hand abs" style={{ left: u(120), top: u(2200), fontSize: u(26), transform: 'rotate(-2deg)' }}>{tr(lang, 'play_note')}</div>
        {p.tricks.map((t, i) => (
          <div key={i} className="abs cs-loop" style={{ left: u(520 + i * 290), top: u(1660), width: u(270), height: u(330), background: C.tile, borderColor: ink }}>
            <div className="cs-loopimg" style={{ background: ink + '1f' }}><img src={t.img} alt="" loading="lazy" style={{ animationDelay: `${i * 0.8}s` }} /></div>
            <span className="cs-ln">0{i + 1}</span>
            <b style={{ color: ink }}>{t.title[lang]}</b>
            <span style={{ color: dim }}>{t.short[lang]}</span>
          </div>
        ))}
        <a className="abs cs-live" href={p.live} style={{ left: u(520), top: u(2030), background: ink, color: bg }}>{tr(lang, 'open_live')}</a>
      </div>

      {/* ---------- phone ---------- */}
      <div className="cs-m mob-only">
        <span className="cs-n" style={{ color: dim }}>0{p.n} / 04</span>
        <h2 className="serif cs-mtitle">{p.name}</h2>
        <p className="pre cs-mscope">{p.scope[lang]}</p>
        <p className="hand" style={{ fontSize: 28, transform: 'rotate(-3deg)', margin: '18px 0 30px' }}>{tr(lang, 'whole_thing')}</p>
        <span className="cs-sec">{tr(lang, 'the_brand')}</span>
        <hr style={{ borderColor: ink }} />
        <div className="cs-tile cs-logo cs-mlogo">
          <img src={`/a/mock-${p.slug === 'heavy-cream' ? 'hc' : p.slug === 'gnam' ? 'gn' : p.slug === 'dakdak' ? 'dk' : 'gz'}.webp`} alt={`${p.name} logo`} loading="lazy" />
          <span className="cs-wild">{tr(lang, 'in_wild')}</span>
        </div>
        <div className="cs-mpal" style={{ background: C.tile }}>
          {p.swatches.map((s) => (
            <div key={s.hex} className="cs-sw"><i style={{ background: s.hex }} /><b style={{ color: ink }}>{s.name[lang]}</b><span style={{ color: dim }}>{s.hex}</span></div>
          ))}
        </div>
        <div className="cs-mtype" style={{ background: C.tile }}>
          {(hcType ? p.type : rows).map((t, i) => (
            <div key={i}>
              <span style={{ color: dim }}>{t.label[lang]}</span>
              {t.img ? <img src={t.img} alt={t.label.en} loading="lazy" style={{ width: Math.min(t.imgW! * 0.9, 300) }} /> : <b style={{ ...ff(t.font), fontSize: Math.min(t.size, 28) }}>{t.sample}</b>}
            </div>
          ))}
        </div>
        <span className="cs-sec">{p.section2[lang]}</span>
        <hr style={{ borderColor: ink }} />
        <div className="cs-mbig" style={{ background: p.s2.bigBg }}><img src={p.s2.big} alt="" loading="lazy" /></div>
        <p className="hand" style={{ fontSize: 24, transform: 'rotate(-2deg)' }}>{p.s2.bigNote[lang]}</p>
        <div className="cs-msmall" style={{ background: C.tile }}>{p.s2.small.map((s) => <img key={s} src={s} alt="" loading="lazy" />)}</div>
        <p className="hand" style={{ fontSize: 24, transform: 'rotate(2deg)' }}>{p.s2.smallNote[lang]}</p>
        <span className="cs-sec">{tr(lang, 'play')}</span>
        <hr style={{ borderColor: ink }} />
        {p.tricks.map((t, i) => (
          <div key={i} className="cs-mloop" style={{ background: C.tile, borderColor: ink }}>
            <img src={t.img} alt="" loading="lazy" />
            <div><span className="cs-ln">0{i + 1}</span> <b style={{ color: ink }}>{t.title[lang]}</b><br /><span style={{ color: dim }}>{t.short[lang]}</span></div>
          </div>
        ))}
        <a className="cs-mlive" href={p.live} style={{ background: ink, color: bg }}>{tr(lang, 'open_live')}</a>
      </div>
      {Next}
    </section>
  );
}
