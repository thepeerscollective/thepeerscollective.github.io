export const BASE = process.env.NEXT_PUBLIC_BASE ?? '';
export const img = (n: string) => `${BASE}/img/${n}.webp`;
const ROOT = 'https://thepeerscollective.github.io';

export type Site = {
  id: string;
  name: string;
  kind: string;
  place: string;
  url?: string;
  thing?: string;
  line?: string;
  pages?: string;
  soon?: boolean;
  tint: string;
};

export const SITES: Site[] = [
  {
    id: 'heavy-cream', name: 'heavy cream', kind: 'bakery & coffee', place: 'london e8', url: `${ROOT}/heavy-cream/`, tint: '#ffdce6',
    line: 'pink outside, loud inside. a bakery that knows what time it is.',
    thing: 'after 18:00 the croissant goes to sleep under a blanket. you write on the cake yourself, and the piping bag follows your letters.',
    pages: 'home, menu, cakes, coffee, about, legal',
  },
  {
    id: 'gnam', name: 'gnam', kind: 'trattoria', place: 'kraków', url: `${ROOT}/gnam/`, tint: '#f3e3c7',
    line: 'pizza, pasta, dolci, vino. six tables, one nonna, polish + english.',
    thing: 'a tiramisu that builds itself frame by frame, and a ticket dispenser that prints your table booking.',
    pages: 'home, menu, prenota, la storia, privacy',
  },
  {
    id: 'dakdak', name: 'dakdak', kind: 'fried chicken + soju', place: 'paris 10', url: `${ROOT}/dakdak/`, tint: '#2b2420',
    line: 'korean fried chicken, cold soju, open till 2am.',
    thing: 'pick a sauce and the whole site changes colour with it. a live pick-up counter. a 2am photo booth.',
    pages: 'home, menu, order, booking, parties, jobs, find us',
  },
  {
    id: 'grzywka', name: 'grzywka', kind: 'hair salon', place: 'warszawa', url: `${ROOT}/grzywka/`, tint: '#ff3ea5',
    line: 'a y2k lookbook for a salon that’s open till 23:00.',
    thing: 'cut her fringe with the scissors. scroll and the lookbook flips like a magazine. hold anywhere to blow-dry.',
    pages: 'home, 10 looks, prices + team, book',
  },
  { id: 'tipsy', name: 'tipsy', kind: 'press-on nails', place: 'online shop', soon: true, tint: '#e7e2d8', line: 'every set is named after a drink. press them on, shake it, order a round.' },
  { id: 'dziara', name: 'dziara', kind: 'tattoo studio', place: 'three artists', soon: true, tint: '#ede9df', line: 'the homepage is a flash sheet. tear it, hand-poke it, walk in on friday.' },
];
