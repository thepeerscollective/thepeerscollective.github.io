'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lang } from '@/lib/projects';
import { L, href } from '@/lib/i18n';
import { Confetti, LangSwitch } from './bits';
import SiteBar from './SiteBar';

const ENDPOINT = 'https://formsubmit.co/ajax/hello@thepeerscollective.com';
const ENDPOINT_FILE = 'https://formsubmit.co/hello@thepeerscollective.com';

type Opt = { id: string; en: string; pl: string };
const WHO: Opt[] = [
  { id: 'resto', en: 'restaurant / café', pl: 'restauracja / kawiarnia' },
  { id: 'salon', en: 'salon', pl: 'salon' },
  { id: 'shop', en: 'shop', pl: 'sklep' },
];
const NEED: Opt[] = [
  { id: 'web', en: 'the website', pl: 'strona' },
  { id: 'brand', en: 'the brand', pl: 'marka' },
  { id: 'feed', en: 'the feed', pl: 'feed' },
];
const BUDGET: Opt[] = [
  { id: '01', en: 'from 2 500', pl: 'od 2 500' },
  { id: '02', en: 'from 5 000', pl: 'od 5 000' },
  { id: '03', en: 'from 7 500', pl: 'od 7 500' },
  { id: 'trade', en: 'trade ⇄', pl: 'wymiana ⇄' },
  { id: 'pwyc', en: 'pay what you can ♡', pl: 'płać, ile możesz ♡' },
];
const TALK: Opt[] = [
  { id: 'video', en: '💻 video', pl: '💻 wideo' },
  { id: 'phone', en: '📞 phone', pl: '📞 telefon' },
  { id: 'email', en: '✉️ email', pl: '✉️ mail' },
  { id: 'coffee', en: '☕ coffee in kraków', pl: '☕ kawa w krakowie' },
];
const DAYS_EN = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DAYS_PL = ['nd', 'pn', 'wt', 'śr', 'czw', 'pt', 'sob'];

function nextSlots() {
  const out: Date[] = [];
  const d = new Date(); d.setHours(0, 0, 0, 0);
  const hours = [10, 14, 12];
  while (out.length < 3) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const x = new Date(d); x.setHours(hours[out.length]); out.push(x);
  }
  return out;
}

function Chips({ opts, sel, multi, onPick, lang }: { opts: Opt[]; sel: string[]; multi?: boolean; onPick: (v: string[]) => void; lang: Lang }) {
  return (
    <div className="chips" role={multi ? 'group' : 'radiogroup'}>
      {opts.map((o) => {
        const on = sel.includes(o.id);
        return (
          <button key={o.id} type="button" className={'chipb' + (on ? ' on' : '')} aria-pressed={on}
            onClick={() => onPick(multi ? (on ? sel.filter((s) => s !== o.id) : [...sel, o.id]) : on ? [] : [o.id])}>
            {lang === 'en' ? o.en : o.pl}
          </button>
        );
      })}
    </div>
  );
}

export default function Contact({ lang }: { lang: Lang }) {
  const T = (o?: Opt) => (o ? (lang === 'en' ? o.en : o.pl) : '');
  const [who, setWho] = useState<string[]>([]);
  const [other, setOther] = useState('');
  const [need, setNeed] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [line, setLine] = useState('');
  const [talk, setTalk] = useState<string[]>([]);
  const [slot, setSlot] = useState<string[]>([]);
  const [otherTime, setOtherTime] = useState('');
  const [reply, setReply] = useState('');
  const [honey, setHoney] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [rec, setRec] = useState<'off' | 'rec' | 'done'>('off');
  const [secs, setSecs] = useState(0);
  const blob = useRef<Blob | null>(null);
  const mr = useRef<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [slots, setSlots] = useState<Date[]>([]);
  const [no, setNo] = useState('0412');
  useEffect(() => { setNo(String(412 + Math.floor(Math.random() * 80)).padStart(4, '0')); }, []);

  useEffect(() => {
    setSlots(nextSlots());
    const pkg = new URLSearchParams(location.search).get('pkg');
    if (pkg && BUDGET.some((b) => b.id === pkg)) setBudget([pkg]);
  }, []);

  const slotOpts: Opt[] = useMemo(() => slots.map((d, i) => ({ id: 's' + i, en: `${DAYS_EN[d.getDay()]} ${d.getHours()}:00`, pl: `${DAYS_PL[d.getDay()]} ${d.getHours()}:00` })), [slots]);
  const slotOptsAll: Opt[] = [...slotOpts, { id: 'other', en: '+ other time', pl: '+ inny termin' }];
  const isMail = talk.includes('email');

  const whoTxt = other || T(WHO.find((w) => w.id === who[0]));
  const lines: string[] = [];
  if (whoTxt) lines.push(`1 x  ${whoTxt}`);
  need.forEach((n) => lines.push(`1 x  ${T(NEED.find((x) => x.id === n))}`));
  const bud = BUDGET.find((b) => b.id === budget[0]);
  const talkO = TALK.find((t) => t.id === talk[0]);
  const slotTxt = slot[0] === 'other' ? otherTime : T(slotOpts.find((s) => s.id === slot[0]));

  const startRec = async () => {
    try {
      const st = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(st); const parts: BlobPart[] = [];
      r.ondataavailable = (e) => parts.push(e.data);
      r.onstop = () => { st.getTracks().forEach((t) => t.stop()); blob.current = new Blob(parts, { type: r.mimeType || 'audio/webm' }); setAudioUrl(URL.createObjectURL(blob.current)); setRec('done'); };
      mr.current = r; r.start(); setRec('rec'); setSecs(0);
    } catch { alertless(); }
  };
  const alertless = () => setRec('off');
  useEffect(() => {
    if (rec !== 'rec') return;
    const t = setInterval(() => setSecs((s) => { if (s >= 29) { mr.current?.stop(); return 30; } return s + 1; }), 1000);
    return () => clearInterval(t);
  }, [rec]);

  const canSend = reply.trim().length > 3 && (line.trim() || blob.current || need.length || whoTxt);

  const send = async () => {
    if (!canSend || state === 'sending') return;
    if (honey) { setState('sent'); return; } // a bot filled the hidden field: pretend, send nothing
    setState('sending');
    const data: Record<string, string> = {
      _subject: `nowe zamówienie nº ${no} · ${whoTxt || '?'}`,
      _template: 'box',
      _captcha: 'false',
      'kto / who': whoTxt,
      'potrzeba / need': need.map((n) => NEED.find((x) => x.id === n)?.pl).join(', '),
      'budżet / budget': bud ? bud.pl : '',
      'jednym zdaniem / one sentence': line,
      'rozmowa / talk': talkO ? talkO.pl : '',
      'termin / time': isMail ? '-' : slotTxt,
      'odpisz na / reply to': reply,
      'język / lang': lang,
      'nagranie / voice': blob.current ? 'w załączniku' : '-',
    };
    try {
      if (blob.current) {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => fd.append(k, v));
        fd.append('attachment', blob.current, `voice-${no}.webm`);
        await fetch(ENDPOINT_FILE, { method: 'POST', body: fd, mode: 'no-cors' });
      } else {
        const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error();
      }
      setState('sent');
      scrollTo({ top: 0 });
    } catch {
      setState('error');
    }
  };

  const mailto = `mailto:hello@thepeerscollective.com?subject=${encodeURIComponent('zamówienie nº ' + no)}&body=${encodeURIComponent([...lines, bud ? 'budżet: ' + T(bud) : '', talkO ? T(talkO) + ' ' + (slotTxt || '') : '', '', line, '', reply].filter(Boolean).join('\n'))}`;

  if (state === 'sent') return <Sent lang={lang} no={no} />;

  return (
    <main className="contact page" id="top">
      <SiteBar lang={lang} on="contact" />
      <div className="ct-in">
        <form className="ct-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <h1 className="serif ct-h">{L(lang, 'your place\nis next.', 'twój stolik\nczeka.')}</h1>
          <p className="ct-sub">{L(lang, 'order at the counter. under a minute. the brief happens over coffee.', 'zamawiasz przy ladzie, zajmie ci to minutę. resztę obgadamy przy kawie.')}</p>

          <fieldset><legend>01 · {L(lang, 'who are you?', 'kim jesteś?')}</legend>
            <div className="chips">
              <Chips opts={WHO} sel={other ? [] : who} onPick={(v) => { setWho(v); setOther(''); }} lang={lang} />
              <input className={'chipin' + (other ? ' on' : '')} value={other} onChange={(e) => { setOther(e.target.value); setWho([]); }} placeholder={L(lang, 'other: type it…', 'inne: wpisz…')} aria-label={L(lang, 'other', 'inne')} />
            </div>
          </fieldset>
          <fieldset><legend>02 · {L(lang, 'what do you need?', 'czego potrzebujesz?')}</legend><Chips opts={NEED} sel={need} multi onPick={setNeed} lang={lang} /></fieldset>
          <fieldset><legend>03 · {L(lang, 'budget, roughly', 'budżet, mniej więcej')}</legend><Chips opts={BUDGET} sel={budget} onPick={setBudget} lang={lang} /></fieldset>
          <fieldset><legend>04 · {L(lang, 'in one sentence: what do you do, what do you need?', 'w jednym zdaniu: co robisz i czego potrzebujesz?')}</legend>
            <textarea value={line} onChange={(e) => setLine(e.target.value)} rows={2} maxLength={280} placeholder={L(lang, 'we make the best pierogi in kazimierz and nobody knows. we need a site that shows it.', 'robimy najlepsze pierogi na kazimierzu i nikt o tym nie wie. potrzebujemy strony, która to pokaże.')} />
            <div className="ct-rec">
              {rec === 'off' && <button type="button" className="chipb" onClick={startRec}>🎙&nbsp; {L(lang, 'or record 30 s', 'albo nagraj 30 s')}</button>}
              {rec === 'rec' && <button type="button" className="chipb on rec" onClick={() => mr.current?.stop()}>● {L(lang, 'stop', 'stop')} · {30 - secs} s</button>}
              {rec === 'done' && <><audio src={audioUrl} controls /><button type="button" className="chipb" onClick={() => { blob.current = null; setRec('off'); }}>{L(lang, 'record again', 'nagraj jeszcze raz')}</button></>}
            </div>
          </fieldset>
          <fieldset><legend>05 · {L(lang, "let's talk", 'pogadajmy')}</legend>
            <div className="chips"><Chips opts={TALK} sel={talk} onPick={setTalk} lang={lang} /><span className="ct-mailnote">{L(lang, 'email = no time slot, we reply in writing', 'mail = bez umawiania, po prostu odpiszemy')}</span></div>
            {!isMail && (
              <div className="chips" style={{ marginTop: 10 }}>
                <Chips opts={slotOptsAll} sel={slot} onPick={setSlot} lang={lang} />
                {slot[0] === 'other' && <input className="chipin on" value={otherTime} onChange={(e) => setOtherTime(e.target.value)} placeholder={L(lang, 'e.g. thu after 16', 'np. czw po 16')} autoFocus />}
              </div>
            )}
          </fieldset>
          <fieldset><legend>06 · {L(lang, 'where do we reply?', 'gdzie odpisać?')}</legend>
            <input className="ct-reply" value={reply} onChange={(e) => setReply(e.target.value)} placeholder={L(lang, 'mail, phone or @instagram', 'mail, telefon albo @instagram')} required />
          </fieldset>
          <label className="ct-hp" aria-hidden="true">leave this empty<input tabIndex={-1} autoComplete="off" name="company_website_hp" value={honey} onChange={(e) => setHoney(e.target.value)} /></label>
          <button className="ct-send" disabled={!canSend || state === 'sending'}>{state === 'sending' ? '…' : L(lang, 'place the order →', 'wysyłam zamówienie →')}</button>
          <p className="ct-priv">{L(lang, 'we only use this to reply to you. no newsletter, no cookies. ', 'używamy tego tylko, żeby ci odpisać. bez newslettera, bez ciasteczek. ')}<Link href={href(lang, '/privacy/')}>{L(lang, 'privacy →', 'prywatność →')}</Link></p>
          {state === 'error' && <p className="ct-err">{L(lang, "the printer jammed. ", 'drukarka się zacięła. ')}<a href={mailto}>{L(lang, 'send it by email instead →', 'wyślij mailem →')}</a></p>}
        </form>

        <div className="ct-side" aria-live="polite">
          <div className="ct-printer" aria-hidden />
          <div className="ct-rcpt">
            <span className="rc-brand">peerscollective</span>
            <span className="rc-order">{L(lang, `order nº ${no}   ·   table 2`, `zamówienie nº ${no}   ·   stolik 2`)}</span>
            <span className="rc-dash" />
            {lines.length ? lines.map((l) => <span key={l} className="ct-l">{l}</span>) : <span className="ct-l ghost">1 x  …</span>}
            {bud && <span className="ct-l">{L(lang, 'budget', 'budżet')}      {T(bud)}{['01', '02', '03'].includes(bud.id) ? ' zł' : ''}</span>}
            {talkO && <span className="ct-l">{L(lang, 'talk', 'rozmowa')}        {T(talkO)}</span>}
            {talkO && !isMail && slotTxt && <span className="ct-l hl">{'            '}{slotTxt}</span>}
            <span className="rc-dash" />
            <span className="serif ct-quote">{line ? `„${line}”` : L(lang, '"…"', '„…”')}</span>
            <span className="rc-dash" />
            <span className="rc-tot"><b>{L(lang, 'TOTAL', 'RAZEM')}</b><b>{L(lang, 'one good chat', 'jedna dobra rozmowa')}</b></span>
            <span className="rc-bar">||| || ||| | || |||| | ||| ||</span>
            <span className="rc-thx">{L(lang, "thank you ♡ it all goes to mom's renovation", 'dziękujemy ♡ wszystko idzie na remont domu mamy')}</span>
          </div>
          <div className="ct-tent"><b className="serif">{L(lang, 'table for two', 'stolik na dwoje')}</b><span>{L(lang, 'you + karina', 'ty + karina')}</span></div>
        </div>
      </div>
    </main>
  );
}

function Sent({ lang, no }: { lang: Lang; no: string }) {
  const [fixed, setFixed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFixed(true), 500); return () => clearTimeout(t); }, []);
  return (
    <main className="sent page" id="top">
      <SiteBar lang={lang} on="contact" />
      <div className="sent-in">
        {fixed && <span className="toast sent-toast" role="status">{L(lang, '✓ pixel perfect. order sent.', '✓ piksel w piksel. zamówienie poszło.')}</span>}
        <p className="serif sent-word" aria-hidden>peers<span className={'sent-c' + (fixed ? ' ok' : '')}>c</span>ollective</p>
        <div style={{ position: 'absolute', inset: 0, ['--u' as string]: 'calc(100vw / 1440)' }}><Confetti on={fixed} /></div>
        <p className="sent-sub">{L(lang, 'we reply within 24 h. usually faster.', 'odpisujemy w 24 h. zwykle szybciej.')}</p>
        <span className="sent-stub">nº {no} · {L(lang, 'sent', 'wysłane')}</span>
        <Link className="sent-back" href={href(lang, '/') + '#work'}>{L(lang, 'back to the canvas', 'wróć do projektów')}</Link>
      </div>
    </main>
  );
}
