'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/lib/projects';
import { L, href, tr } from '@/lib/i18n';
import { LangSwitch } from './bits';
import SiteBar from './SiteBar';

type R = { n: string; t: [string, string]; s: [string, string]; lines: [string, string][]; total: [string, string]; time: [string, string]; badge?: boolean };
const RECEIPTS: R[] = [
  {
    n: '01', t: ['the starter', 'przystawka'], s: ['design + code, made for you', 'projekt + kod, szyte na miarę'],
    lines: [['design in figma first. you approve', 'najpierw projekt w figmie do akceptacji'], ['interactions + details made for you', 'animacje i detale szyte na miarę'], ['up to 5 pages, mobile, EN + PL', 'do 5 podstron, wersja na telefon, PL + EN'], ['a panel: edit menu, prices, photos', 'panel: sama zmieniasz menu, ceny, foto'], ['google basics + business profile', 'podstawy seo + wizytówka w google'], ['help with domain + hosting', 'pomoc z domeną i hostingiem'], ['30 days of fixes + 30 min training', '30 dni poprawek + 30 min szkolenia']],
    total: ['from 2 500 zł', 'od 2 500 zł'], time: ['2-4 weeks', '2-4 tyg.'],
  },
  {
    n: '02', t: ['the main course', 'danie główne'], s: ['brand + website', 'marka + strona'], badge: true,
    lines: [['everything in 01', 'wszystko z 01'], ['logo, colours, type, mini brand book', 'logo, kolory, fonty, mini księga marki'], ['print: menu + QR menu, cards, stickers', 'druk: menu + QR, wizytówki, naklejki'], ['packaging: box, cup, bag', 'opakowania: pudełko, kubek, torba'], ['social files: avatar, covers', 'grafiki na social: avatar, okładki']],
    total: ['from 5 000 zł', 'od 5 000 zł'], time: ['3-6 weeks', '3-6 tyg.'],
  },
  {
    n: '03', t: ['the tasting menu', 'menu degustacyjne'], s: ['brand + website + feed', 'marka + strona + feed'],
    lines: [['everything in 02', 'wszystko z 02'], ['photo shoot art direction', 'art direction sesji zdjęciowej'], ['first 9 posts + post/story templates', '9 pierwszych postów + szablony'], ['2 animations for launch', '2 animacje na start'], ['launch texts + launch plan', 'teksty i plan na start']],
    total: ['from 7 500 zł', 'od 7 500 zł'], time: ['6-8 weeks', '6-8 tyg.'],
  },
];
const ADDONS: [string, string, string, string][] = [
  ['the feed, monthly', 'prowadzenie feedu co miesiąc', 'from 900 zł / month', 'od 900 zł / mies.'],
  ['a photo shoot', 'sesja zdjęciowa', 'from 1 200 zł', 'od 1 200 zł'],
  ['website texts, EN / PL', 'teksty na stronę, PL / EN', 'from 400 zł', 'od 400 zł'],
  ['another language or page', 'kolejny język albo podstrona', 'from 300 zł', 'od 300 zł'],
  ['online booking (yours or linked)', 'rezerwacje online (własne lub podpięte)', '150 zł', '150 zł'],
  ['online orders / small shop', 'zamówienia online / mały sklep', 'from 1 500 zł', 'od 1 500 zł'],
  ['care after launch', 'opieka po starcie', 'from 200 zł / month', 'od 200 zł / mies.'],
  ['social animations', 'animacje na social', 'from 300 zł', 'od 300 zł'],
  ['merch', 'merch', 'from 400 zł', 'od 400 zł'],
  ['sign / shop window', 'szyld / witryna', 'from 600 zł', 'od 600 zł'],
  ['express mode', 'tryb express', '+20%', '+20%'],
];
const STEPS: [string, string, string, string][] = [
  ['brief', 'brief', 'we talk for 15 minutes, over coffee or a call.', 'gadamy 15 minut, przy kawie albo przez telefon.'],
  ['figma', 'figma', 'we design everything in figma. you approve before any code.', 'projektujemy wszystko w figmie. akceptujesz, zanim powstanie kod.'],
  ['build', 'kodowanie', 'we code it. you get a live link to click through.', 'kodujemy. dostajesz link, żeby wszystko przeklikać.'],
  ['launch', 'premiera', 'it goes live. 30 days of fixes, on us.', 'strona startuje. 30 dni poprawek na nasz koszt.'],
];
const FAQ: [string, string, string, string][] = [
  ['how much does it really cost?', 'ile to naprawdę kosztuje?', '"from" is the smallest scope. more pages, a shop, booking or extra packaging push it up. you get the exact price after the brief. 3 rounds of changes are always included. can\'t afford it? we trade, or you pay what you can (below).', '„od” to najmniejszy zakres. cenę podnoszą: więcej podstron, sklep, rezerwacje, dodatkowe opakowania. dokładną kwotę dostajesz po briefie. 3 rundy poprawek są zawsze w cenie. nie stać cię? jest barter albo „płać, ile możesz” (niżej).'],
  ['can I change the menu, prices and photos myself?', 'czy mogę samodzielnie zmieniać menu, ceny i zdjęcia?', 'yes. you get a simple panel. change it in a minute, no need to call us.', 'tak. dostajesz prosty panel. zmieniasz w minutę, bez dzwonienia do nas.'],
  ['do I need photos, a logo and texts?', 'muszę mieć zdjęcia, logo i teksty?', 'no. if you have them, we use them. if not, we make them (packages 02 and 03, or add-ons).', 'nie. jak masz, używamy. jak nie, robimy (pakiety 02 i 03 albo dodatki).'],
  ['how does payment work?', 'jak wygląda płatność?', '50% to start, 50% before the site goes live.', '50% na start, 50% przed publikacją strony.'],
  ["what if I don't like the design?", 'co, jeśli projekt mi się nie spodoba?', 'you get 3 rounds of changes in figma. you approve before we code, so no surprises.', 'masz 3 rundy poprawek w figmie. akceptujesz, zanim zakodujemy, więc nie ma niespodzianek.'],
  ['will the site show up on google?', 'czy strona będzie w google?', 'yes. we set up the seo basics and your google business profile. nobody honest promises the #1 spot.', 'tak. ustawiamy podstawy seo i wizytówkę google. nikt uczciwy nie obiecuje 1. miejsca.'],
  ['who owns the site and the domain?', 'kto jest właścicielem strony i domeny?', 'you. the domain is in your name, and after payment all files are yours.', 'ty. domena jest na ciebie, a po zapłacie wszystkie pliki są twoje.'],
  ['how does trading work?', 'jak działa barter?', 'you pay with what you make: dinners, vouchers, services. we agree it in the brief.', 'płacisz tym, co robisz: kolacjami, bonami, usługami. ustalamy to w briefie.'],
  ['who can pay what they can?', 'dla kogo jest „płać, ile możesz”?', "anyone who can't afford the full price. pay what you can, even 200 zł helps. you get a simpler site, made in between bigger projects, so it takes a bit longer.", 'każdy, kogo nie stać na pełną cenę. płacisz, ile możesz, nawet 200 zł pomoże. dostajesz prostszą stronę, którą robimy pomiędzy większymi projektami, więc poczekasz trochę dłużej.'],
];
const COUPONS: [string, string, string, string, number][] = [
  ['restaurant / café', 'restauracja / kawiarnia', 'dinner for two,\n1-2 times a month', 'kolacja dla dwojga,\n1-2 razy w miesiącu', -1],
  ['shop', 'sklep', 'a voucher for\nyour shop', 'bon na zakupy\nw twoim sklepie', 1],
  ['salon / studio', 'salon / studio', 'cuts, nails or treatments\nfor the team', 'strzyżenie, paznokcie\nalbo zabiegi dla ekipy', 0],
  ['something else', 'coś innego', "tell us what you've got", 'powiedz, co masz', 1],
];

export default function Offer({ lang }: { lang: Lang }) {
  const T = (a: [string, string] | readonly [string, string]) => (lang === 'en' ? a[0] : a[1]);
  const [faq, setFaq] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const [printed, setPrinted] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setPrinted(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);

  return (
    <main className="offer page" id="top">
      <SiteBar lang={lang} on="offer" />
      <div className="pg-in">
        <h1 className="serif of-h">{L(lang, 'the menu.', 'menu.')}</h1>
        <p className="of-sub pre">{L(lang, 'three ways to work with us. prices start here, the exact quote comes after the brief.\nevery złoty we earn right now goes to my mom\'s home renovation.', 'trzy opcje do wyboru. ceny to punkt wyjścia, dokładną wycenę dostajesz po rozmowie.\nkażda złotówka, którą teraz zarabiamy, idzie na remont domu mojej mamy.')}</p>

        <div className={'rcpts' + (printed ? ' printed' : '')} ref={ref}>
          {RECEIPTS.map((r, i) => (
            <Link key={r.n} href={href(lang, '/contact/') + `?pkg=${r.n}`} className="rcpt" style={{ animationDelay: `${i * 0.35}s` }} aria-label={`${T(r.t)} · ${T(r.total)}`}>
              {r.badge && <span className="rc-badge">{L(lang, 'most picked', 'najczęściej wybierane')}</span>}
              <span className="rc-brand">peerscollective</span>
              <span className="rc-order">{L(lang, `order nº ${r.n}  ·  table ${i + 1}`, `zamówienie nº ${r.n}  ·  stolik ${i + 1}`)}</span>
              <span className="rc-dash" />
              <span className="serif rc-t">{T(r.t)}</span>
              <span className="rc-s">{T(r.s)}</span>
              <ul>{r.lines.map((l, j) => <li key={j}><span>1 x&nbsp; {T(l)}</span><b>✓</b></li>)}</ul>
              <span className="rc-dash" />
              <span className="rc-tot"><b>{L(lang, 'TOTAL', 'RAZEM')}</b><b>{T(r.total)}</b></span>
              <span className="rc-time"><span>{L(lang, 'time', 'czas')}</span><span>{T(r.time)}</span></span>
              <span className="rc-bar" aria-hidden>||| || ||| | || |||| |</span>
              <span className="rc-thx">{L(lang, "thank you ♡ it all goes to mom's home renovation", 'dziękujemy ♡ wszystko idzie na remont domu mamy')}</span>
            </Link>
          ))}
        </div>

        <h2 className="pg-sec">{L(lang, 'add-ons', 'dodatki')}</h2>
        <ul className="addons">{ADDONS.map((a, i) => <li key={i}><span>+ {lang === 'en' ? a[0] : a[1]}</span><span>{lang === 'en' ? a[2] : a[3]}</span></li>)}</ul>

        <h2 className="pg-sec">{L(lang, 'how it goes', 'jak to wygląda')}</h2>
        <ol className="steps">{STEPS.map((s, i) => <li key={i}><span className="st-c">0{i + 1}</span><b className="serif">{lang === 'en' ? s[0] : s[1]}</b><p>{lang === 'en' ? s[2] : s[3]}</p></li>)}</ol>

        <h2 className="pg-sec">{L(lang, 'questions', 'pytania')}</h2>
        <div className="faq">
          {FAQ.map((q, i) => (
            <div key={i} className={faq === i ? 'on' : ''}>
              <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}>{faq === i ? '−' : '+'} {lang === 'en' ? q[0] : q[1]}</button>
              {faq === i && <p>{lang === 'en' ? q[2] : q[3]}</p>}
            </div>
          ))}
        </div>

        <h2 className="pg-sec">{L(lang, 'trade', 'wymiana')}</h2>
        <h3 className="serif of-trade">{L(lang, "can't afford us? let's trade.", 'nie stać cię? wymieńmy się.')}</h3>
        <p className="of-sub">{L(lang, "we take part of the fee in kind. you keep your cash, we get something we'd buy anyway.", 'część ceny bierzemy w naturze. ty zostajesz z gotówką, my dostajemy coś, co i tak byśmy kupiły.')}</p>
        <div className="coupons">
          {COUPONS.map((c, i) => (
            <Link key={i} href={href(lang, '/contact/') + '?pkg=trade'} className="coupon" style={{ transform: `rotate(${c[4]}deg)` }}>
              <span className="cp-k">{lang === 'en' ? c[0] : c[1]}</span>
              <span className="serif cp-v pre">{lang === 'en' ? c[2] : c[3]}</span>
              <span className="cp-x">⇄</span>
            </Link>
          ))}
        </div>
        <div className="of-trade-row">
          <Link href={href(lang, '/contact/') + '?pkg=trade'} className="of-propose">{L(lang, 'propose a trade →', 'zaproponuj wymianę →')}</Link>
          <span className="hand">{L(lang, 'restaurant = we eat there. shop = we shop there. simple.', 'gastro = jemy u was. sklep = kupujemy u was. proste.')}</span>
        </div>
        <div className="of-cta">
          <Link href={href(lang, '/contact/')} className="btn-pink">{L(lang, 'build your brief →', 'zamów przy ladzie →')}</Link>
          <span>{L(lang, 'too much right now? trade with us, or pay what you can.', 'za dużo na teraz? wymień się z nami albo płać, ile możesz.')}</span>
        </div>
      </div>
      <span className="sr">{tr(lang, 'nav_offer')}</span>
    </main>
  );
}
