'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { Lang } from '@/lib/projects';
import { href } from '@/lib/i18n';
import SiteBar from './SiteBar';

type S = { h: [string, string]; b: [string, string] };
const SECTIONS: S[] = [
  {
    h: ['who looks after your data', 'kto dba o twoje dane'],
    b: [
      'karina beers (peerscollective), the person who runs this site. any question about your data: hello@thepeerscollective.com.',
      'karina beers (peerscollective), czyli osoba, która prowadzi tę stronę. pytania o twoje dane: hello@thepeerscollective.com.',
    ],
  },
  {
    h: ['what we collect', 'co zbieramy'],
    b: [
      'only what you type into the order form: who you are, what you need, a rough budget, one sentence (or a 30 s voice note, if you record one), how you want to talk, and where we should reply (mail, phone or @instagram). nothing else. no accounts, no newsletter.',
      'tylko to, co wpiszesz w formularz zamówienia: kim jesteś, czego potrzebujesz, mniej więcej budżet, jedno zdanie (albo 30 s nagrania, jeśli je nagrasz), jak chcesz pogadać i gdzie odpisać (mail, telefon albo @instagram). nic więcej. bez kont, bez newslettera.',
    ],
  },
  {
    h: ['why', 'po co'],
    b: [
      "to reply to you and talk about your project. that's it. the legal basis is taking steps at your request before a possible contract (art. 6(1)(b) gdpr).",
      'żeby ci odpisać i pogadać o projekcie. tyle. podstawa prawna to działania na twoje żądanie przed ewentualną umową (art. 6 ust. 1 lit. b rodo).',
    ],
  },
  {
    h: ['who else touches it', 'kto jeszcze ma do nich dostęp'],
    b: [
      'formsubmit.co passes the form on to our inbox. zoho mail hosts the inbox (eu servers). github pages hosts the site and, like every server, keeps short technical logs (ip address, browser). we never sell or share your data for marketing.',
      'formsubmit.co przekazuje formularz do naszej skrzynki. zoho mail trzyma skrzynkę (serwery w ue). github pages hostuje stronę i jak każdy serwer zapisuje krótkie logi techniczne (adres ip, przeglądarka). nigdy nie sprzedajemy ani nie udostępniamy twoich danych do marketingu.',
    ],
  },
  {
    h: ['how long', 'jak długo'],
    b: [
      "as long as we're talking. if we don't end up working together, we delete it within 12 months. if we do, we keep what the law needs for invoices.",
      'tak długo, jak rozmawiamy. jeśli nie zaczniemy współpracy, usuwamy je w ciągu 12 miesięcy. jeśli zaczniemy, trzymamy to, czego wymaga prawo do faktur.',
    ],
  },
  {
    h: ['cookies', 'ciasteczka'],
    b: [
      "none. no analytics, no meta pixel, no ads. the only thing this site remembers is the language you picked, saved in your own browser. that's why there's no cookie banner.",
      'żadnych. bez analityki, bez piksela mety, bez reklam. jedyne, co strona zapamiętuje, to wybrany język, zapisany w twojej przeglądarce. dlatego nie ma banera cookies.',
    ],
  },
  {
    h: ['your rights', 'twoje prawa'],
    b: [
      'you can ask to see, fix or delete your data, limit or object to how we use it, or take a copy. just write to hello@thepeerscollective.com. you can also complain to the polish data protection office (uodo.gov.pl).',
      'możesz poprosić o wgląd, poprawienie albo usunięcie danych, ograniczenie lub sprzeciw wobec ich użycia, albo o kopię. wystarczy napisać na hello@thepeerscollective.com. możesz też złożyć skargę do prezesa uodo (uodo.gov.pl).',
    ],
  },
];

export default function Privacy({ lang }: { lang: Lang }) {
  const T = (a: [string, string]) => (lang === 'en' ? a[0] : a[1]);
  const [open, setOpen] = useState<boolean[]>(SECTIONS.map(() => true));
  return (
    <>
      <SiteBar lang={lang} />
      <main className="privacy page" id="top">
        <div className="pg-in pv-in">
          <h1 className="serif of-h">{lang === 'en' ? 'privacy.' : 'prywatność.'}</h1>
          <p className="of-sub">{lang === 'en' ? 'the short version, without the small print. updated: november 2026.' : 'krótka wersja, bez drobnego druczku. aktualizacja: listopad 2026.'}</p>
          <p className="hand pv-promise">{lang === 'en' ? 'no cookies. no tracking. pinky promise.' : 'zero ciasteczek. zero śledzenia. słowo.'}</p>
          <div className="fig pv-fig">
            <div className="fig-bar">privacy.fig</div>
            <ul>
              {SECTIONS.map((s, i) => (
                <li key={i}>
                  <button onClick={() => setOpen((o) => o.map((v, j) => (j === i ? !v : v)))} aria-expanded={open[i]}>
                    <span className="fig-car">{open[i] ? '▾' : '▸'}</span>{T(s.h)}
                  </button>
                  {open[i] && <p className="pv-txt">{T(s.b)}</p>}
                </li>
              ))}
            </ul>
          </div>
          <Link className="btn-pink pv-cta" href={href(lang, '/contact/')}>{lang === 'en' ? 'ok, place the order →' : 'ok, zamawiam →'}</Link>
        </div>
      </main>
    </>
  );
}
