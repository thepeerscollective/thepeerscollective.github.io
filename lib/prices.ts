'use client';
import { useEffect, useState } from 'react';
import type { Lang } from './projects';

// ─────────────────────────────────────────────────────────────
// CENY. zmieniasz tylko liczby poniżej. nic się nie przelicza samo.
// każda waluta ma swoje ręczne kwoty, ustawione pod siłę nabywczą, nie kurs.
// ─────────────────────────────────────────────────────────────
export type Cur = 'pln' | 'eur' | 'gbp' | 'usd';

export const PRICES: Record<Cur, Record<string, number>> = {
  pln: {
    starter: 2500,       // 01 przystawka
    main: 5000,          // 02 danie główne
    tasting: 7500,       // 03 menu degustacyjne
    feed: 900,           // prowadzenie feedu / mies.
    shoot: 1200,         // sesja zdjęciowa
    texts: 400,          // teksty na stronę
    page: 300,           // kolejny język albo podstrona
    booking: 150,        // rezerwacje online
    shop: 1500,          // zamówienia online / mały sklep
    care: 200,           // opieka po starcie / mies.
    anim: 300,           // animacje na social
    merch: 400,          // merch
    sign: 600,           // szyld / witryna
    pwyc: 200,           // „płać, ile możesz”, przykład w faq
  },
  eur: {
    starter: 1500,
    main: 3000,
    tasting: 4500,
    feed: 550,
    shoot: 700,
    texts: 250,
    page: 180,
    booking: 90,
    shop: 900,
    care: 120,
    anim: 180,
    merch: 250,
    sign: 350,
    pwyc: 50,
  },
  gbp: {
    starter: 1300,
    main: 2600,
    tasting: 3900,
    feed: 450,
    shoot: 600,
    texts: 200,
    page: 160,
    booking: 80,
    shop: 800,
    care: 100,
    anim: 160,
    merch: 200,
    sign: 300,
    pwyc: 40,
  },
  usd: {
    starter: 1600,
    main: 3200,
    tasting: 4800,
    feed: 600,
    shoot: 750,
    texts: 250,
    page: 190,
    booking: 100,
    shop: 950,
    care: 130,
    anim: 190,
    merch: 250,
    sign: 400,
    pwyc: 50,
  },
};

export const CURS: { id: Cur; sign: string }[] = [
  { id: 'pln', sign: 'zł' },
  { id: 'eur', sign: '€' },
  { id: 'gbp', sign: '£' },
  { id: 'usd', sign: '$' },
];

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** 2 500 zł  /  €600 */
export function money(cur: Cur, key: string, bare = false) {
  const n = fmt(PRICES[cur][key] ?? 0);
  if (bare) return n;
  return cur === 'pln' ? `${n} zł` : `${{ eur: '€', gbp: '£', usd: '$' }[cur]}${n}`;
}

export function useCur(lang: Lang): [Cur, (c: Cur) => void] {
  const [cur, setCur] = useState<Cur>(lang === 'pl' ? 'pln' : 'eur');
  useEffect(() => {
    try {
      const s = localStorage.getItem('pc-cur');
      if (s && s in PRICES) setCur(s as Cur);
    } catch {}
  }, []);
  const set = (c: Cur) => {
    setCur(c);
    try { localStorage.setItem('pc-cur', c); } catch {}
  };
  return [cur, set];
}
