import type { Lang } from './projects';

const d = {
  tagline: ['web design & creative direction', 'web design i creative direction'],
  topline: ['karina · peerscollective — web design & creative direction', 'karina · peerscollective — web design i creative direction'],
  nav_work: ['work', 'prace'],
  nav_about: ['about', 'o mnie'],
  nav_offer: ['offer', 'oferta'],
  nav_contact: ['contact', 'kontakt'],
  nav_export: ['export', 'eksport'],
  lang: ['EN / PL', 'PL / EN'],
  // hero
  bugging: ['this is bugging me.\nfix it?', 'to mnie wkurza.\npoprawisz?'],
  warsaw: ['someone in warsaw', 'ktoś z warszawy'],
  love: ['love this', 'kocham to'],
  salon: ['a salon owner', 'właścicielka salonu'],
  competitor: ['your competitor 👀', 'twoja konkurencja 👀'],
  drag: ['↖ drag the c until it sits right', '↖ przeciągnij c, aż będzie siedzieć idealnie'],
  drag_m: ['↖ drag the c until it sits right', '↖ przeciągnij c, aż będzie siedzieć'],
  now: ['v12 · now', 'v12 · teraz'],
  ctag: ['c · 1px off · rotate −9°', 'c · 1 px obok · obrót −9°'],
  perfect: ['✓ pixel perfect', '✓ co do piksela'],
  perfect12: ['✓ pixel perfect (1/2)', '✓ co do piksela (1/2)'],
  perfect22: ['✓ pixel perfect (2/2)', '✓ co do piksela (2/2)'],
  made_by: ['made by karina · heavy cream · gnam · dakdak · grzywka', 'robi karina · heavy cream · gnam · dakdak · grzywka'],
  scroll: ['scroll to zoom in ↓', 'przewiń, żeby przybliżyć ↓'],
  satisfying: ['ok that was satisfying', 'ok, to było przyjemne'],
  dot_tag: ['. · 14px off · baseline +16', '. · 14 px obok · linia bazowa +16'],
  wait_now: ['ok wait. now this.', 'czekaj. teraz to.'],
  skip: ['skip, i get it', 'pomiń, łapię'],
  grid: ['layout grid · 12 col · 80 margin · 24 gutter · 64 row', 'siatka · 12 kolumn · margines 80 · odstęp 24 · wiersz 64'],
  // work
  layers: ['layers', 'warstwy'],
  work_hint: ['hover a project → it gets its colour back and paints the whole canvas', 'najedź na projekt → odzyskuje kolor i maluje nim całe płótno'],
  work_hint_m: ['scroll → the card in the middle gets its colour back', 'przewijaj → karta na środku odzyskuje kolor'],
  you: ['you (future client?)', 'ty (przyszła klientka?)'],
  work_count: ['work · 4 sites', 'prace · 4 strony'],
  // project
  see_how: ["see how it's made", 'zobacz, jak to zrobione'],
  visit: ['visit ↗', 'wejdź ↗'],
  steal: ['steal the idea', 'ukradnij pomysł'],
  steal_sub: ['the stuff people miss on', 'rzeczy, które ludzie przegapiają na'],
  try_it: ['try it →', 'sprawdź →'],
  steal_end: ['go on, steal it. or hire us and get the original.', 'śmiało, kradnij. albo zatrudnij nas i miej oryginał.'],
  make_mine: ['make it mine →', 'chcę taki →'],
  every_other: ['every other', 'każda inna'],
  canvas_back: ['← canvas', '← płótno'],
  crumbs: ['peerscollective / work /', 'peerscollective / prace /'],
  whole_thing: ['we did the whole thing.\nnot just the website.', 'zrobiłyśmy wszystko.\nnie tylko stronę.'],
  the_brand: ['01 · the brand', '01 · marka'],
  in_wild: ['logo in the wild', 'logo w terenie'],
  play: ['03 · play with it', '03 · pobaw się'],
  play_note: ["scroll it. tap it.\nit's the real site, live in the phone.", 'przewiń. kliknij.\nto prawdziwa strona, na żywo w telefonie.'],
  open_live: ['open the live site ↗', 'otwórz stronę ↗'],
  loops_note: ['the 3 tricks above loop on their own,\nso people get it without clicking.', '3 triki wyżej odpalają się same,\nwięc łapiesz je bez klikania.'],
  close: ['close', 'zamknij'],
  // about
  hi: ["hi, i'm karina beers.", 'hej, jestem karina beers.'],
  inspect_me: ['inspect me', 'zbadaj mnie'],
  // footer
  made_remote: ['made remotely · pixel perfect (we checked) · © 2026', 'zrobione zdalnie · co do piksela (sprawdziłyśmy) · © 2026'],
  top: ['back to top ↑', 'do góry ↑'],
} as const;

export type Key = keyof typeof d;
export const tr = (lang: Lang, k: Key): string => d[k][lang === 'en' ? 0 : 1];
export const L = (lang: Lang, en: string, pl: string) => (lang === 'en' ? en : pl);
export const href = (lang: Lang, path: string) => (lang === 'pl' ? '/pl' + (path === '/' ? '/' : path) : path);
