'use client';
import { useEffect, useState } from 'react';
import type { Lang } from './projects';

// ─────────────────────────────────────────────────────────────
// CENY. zmieniasz tylko liczby poniżej. nic się nie przelicza samo.
// każda waluta ma swoje ręczne kwoty.
// ─────────────────────────────────────────────────────────────
export type Cur = 'pln' | 'eur';

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
    starter: 600,
    main: 1200,
    tasting: 1800,
    feed: 220,
    shoot: 290,
    texts: 100,
    page: 70,
    booking: 40,
    shop: 360,
    care: 50,
    anim: 70,
    merch: 100,
    sign: 150,
    pwyc: 50,
  },
};

export const CURS: { id: Cur; sign: string }[] = [
  { id: 'pln', sign: 'zł' },
  { id: 'eur', sign: '€' },
];

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** 2 500 zł  /  €600 */
export function money(cur: Cur, key: string, bare = false) {
  const n = fmt(PRICES[cur][key] ?? 0);
  if (bare) return n;
  return cur === 'eur' ? `€${n}` : `${n} zł`;
}

export function useCur(lang: Lang): [Cur, (c: Cur) => void] {
  const [cur, setCur] = useState<Cur>(lang === 'pl' ? 'pln' : 'eur');
  useEffect(() => {
    try {
      const s = localStorage.getItem('pc-cur');
      if (s === 'pln' || s === 'eur') setCur(s);
    } catch {}
  }, []);
  const set = (c: Cur) => {
    setCur(c);
    try { localStorage.setItem('pc-cur', c); } catch {}
  };
  return [cur, set];
}
