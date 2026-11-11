export type Lang = 'en' | 'pl';
export type T = { en: string; pl: string };
const t = (en: string, pl?: string): T => ({ en, pl: pl ?? en });

export type Trick = { title: T; desc: T; short: T; img: string };
export type Note = { x: number; y: number; r?: number; text: T; w?: number };
export type Chip = { x: number; y: number; text: T; kind?: 'num' | 'label' };

export type Project = {
  slug: string;
  n: number;
  name: string;
  live: string;
  shot: string;
  phone: string;
  where: T; // "bakery & coffee, london"
  meta: T; // bar line
  scope: T; // case study second line
  hoverLine: T;
  hoverNote: T;
  vsLabel: T;
  sameLine: T;
  c: {
    bg: string; // bar / page bg
    ink: string; // main accent
    dim: string; // secondary text
    panel: string; // layers panel tint (hover)
    soft: string; // steal loop bg
    window: string; // steal window bg
    body: string; // steal body text
    btnInk: string; // text on accent buttons
    visitBg: string;
    visitInk: string;
    caseBg: string;
    tile: string;
    tileBig: string;
    next: string;
  };
  tricks: Trick[];
  stealNote: T;
  stealNotePos: { x: number; y: number; r: number; color?: string };
  vsNotes: Note[];
  inspectNotes: Note[];
  inspectChips: Chip[];
  swatches: { name: T; hex: string }[];
  type: { label: T; sample: string; font: string; size: number; img?: string; imgW?: number }[];
  aa: { font: string; img?: string };
  section2: T;
  s2: { big: string; small: string[]; bigNote: T; smallNote: T; bigBg: string };
  next: { slug: string; label: T };
};

export const projects: Project[] = [
  {
    slug: 'heavy-cream',
    n: 1,
    name: 'heavy cream',
    live: '/heavy-cream/',
    shot: '/w/heavy-cream.webp',
    phone: '/a/m-heavy-cream.webp',
    where: t('bakery & coffee, london', 'piekarnia i kawa, londyn'),
    meta: t('bakery & coffee · london · concept · creative direction, design, code', 'piekarnia i kawa · londyn · koncept · creative direction, design, kod'),
    scope: t('bakery & coffee · london\nbrand identity · packaging · merch · website', 'piekarnia i kawa · londyn\nidentyfikacja · opakowania · merch · strona'),
    hoverLine: t('heavy cream · butter. flour. patience.  →  click to open', 'heavy cream · masło. mąka. cierpliwość.  →  kliknij, żeby otworzyć'),
    hoverNote: t('everything turns butter-wrapper red', 'wszystko robi się czerwone jak papierek od masła'),
    vsLabel: t('vs. a normal bakery', 'vs. zwykła piekarnia'),
    sameLine: t('same croissant. different website.', 'ten sam croissant. inna strona.'),
    c: { bg: '#ffe3ea', ink: '#a30f1a', dim: '#c46a78', panel: '#ffd6e0', soft: '#f3d9de', window: '#fff7ee', body: '#6b4a52', btnInk: '#ffe3ea', visitBg: '#a30f1a', visitInk: '#ffe3ea', caseBg: '#ffe3ea', tile: '#fff7ee', tileBig: '#ffd6e0', next: '#e5321b' },
    tricks: [
      { title: t('the croissant sleeps', 'croissant śpi'), desc: t('after 18:00 the hero croissant dozes off. the bakery is closed and the site knows it.', 'po 18:00 croissant zasypia. piekarnia jest zamknięta i strona o tym wie.'), short: t('after 18:00', 'po 18:00'), img: '/a/croissant.webp' },
      { title: t('write on the cake', 'napisz na torcie'), desc: t('type a message, the piping bag follows your letters across the cake.', 'wpisz tekst, a rękaw cukierniczy pisze go na torcie.'), short: t('the piping bag follows', 'rękaw cukierniczy pisze za tobą'), img: '/a/box.webp' },
      { title: t('out 4 min ago', 'z pieca 4 min temu'), desc: t('a live "fresh out of the oven" timer. the reason to come in now, not tomorrow.', 'licznik "prosto z pieca" na żywo. powód, żeby przyjść teraz, a nie jutro.'), short: t('the reason to come now', 'powód, żeby przyjść teraz'), img: '/a/cup.webp' },
    ],
    stealNote: t('opens 0.25s after the site,\noverlapping it a bit', 'otwiera się 0,25 s po stronie,\ntrochę na nią nachodząc'),
    stealNotePos: { x: 780, y: 680, r: -3 },
    vsNotes: [
      { x: 1000, y: 620, r: -3, text: t('a croissant you want to bite', 'croissant, który chcesz ugryźć') },
      { x: 1150, y: 520, r: 2, text: t('a reason to come TODAY', 'powód, żeby przyjść DZIŚ') },
    ],
    inspectNotes: [
      { x: 70, y: 410, r: -2, text: t('the croissant is the hero.\nno slider, no stock photo', 'croissant jest bohaterem.\nbez slidera, bez stocka') },
      { x: 960, y: 575, r: -2, text: t('"out 4 min ago" =\nthe reason to come NOW', '"z pieca 4 min temu" =\npowód, żeby przyjść TERAZ') },
      { x: 1120, y: 236, r: 0, text: t('red from the butter wrapper.\nnot a pantone, a wrapper.', 'czerwień z papierka od masła.\nnie pantone, papierek.') },
      { x: 360, y: 650, r: -2, text: t('the nav is a tray,\nlike the counter', 'menu to taca,\njak na ladzie') },
    ],
    inspectChips: [
      { x: 226, y: 210, text: t('48'), kind: 'num' },
      { x: 150, y: 100, text: t('64'), kind: 'num' },
      { x: 546, y: 545, text: t('32'), kind: 'num' },
      { x: 300, y: 236, text: t('display · fraunces black', 'nagłówek · fraunces black') },
      { x: 880, y: 196, text: t('script · yellowtail', 'pismo · yellowtail') },
      { x: 1240, y: 500, text: t('label · dm mono · caps', 'etykieta · dm mono · wersaliki') },
    ],
    swatches: [
      { name: t('pink', 'róż'), hex: '#FFDCE6' },
      { name: t('cherry', 'wiśnia'), hex: '#A10E1A' },
      { name: t('cream', 'krem'), hex: '#FFF4EA' },
      { name: t('butter', 'masło'), hex: '#F7C873' },
    ],
    type: [
      { label: t('logo · cherry bomb one'), sample: '', font: '', size: 0, img: '/a/hc-type-logo.webp', imgW: 209 },
      { label: t('headlines · fraunces black · soft 100, wonk', 'nagłówki · fraunces black · soft 100, wonk'), sample: '', font: '', size: 0, img: '/a/hc-type-head.webp', imgW: 406 },
      { label: t('script · yellowtail', 'pismo · yellowtail'), sample: '', font: '', size: 0, img: '/a/hc-type-script2.webp', imgW: 216 },
      { label: t('merch · metal mania'), sample: '', font: '', size: 0, img: '/a/hc-type-merch.webp', imgW: 182 },
      { label: t('body · instrument sans', 'tekst · instrument sans'), sample: '', font: '', size: 0, img: '/a/hc-type-body.webp', imgW: 258 },
      { label: t('labels · dm mono', 'etykiety · dm mono'), sample: '', font: '', size: 0, img: '/a/hc-type-mono.webp', imgW: 235 },
    ],
    aa: { font: '', img: '/a/hc-type-aa.webp' },
    section2: t('02 · packaging & merch', '02 · opakowania i merch'),
    s2: { big: '/a/box.webp', small: ['/a/tee.webp', '/a/tote.webp', '/a/stickers.webp'], bigNote: t('the box is the billboard.\nevery delivery = an ad', 'pudełko to billboard.\nkażda dostawa = reklama'), smallNote: t('people wear the bakery home', 'ludzie noszą piekarnię do domu'), bigBg: '#ffd6e0' },
    next: { slug: 'gnam', label: t('next →  gnam, trattoria, kraków', 'dalej →  gnam, trattoria, kraków') },
  },
  {
    slug: 'gnam',
    n: 2,
    name: 'gnam',
    live: '/gnam/',
    shot: '/w/gnam.webp',
    phone: '/a/m-gnam.webp',
    where: t('trattoria, kraków'),
    meta: t('trattoria · kraków · concept · creative direction, design, code', 'trattoria · kraków · koncept · creative direction, design, kod'),
    scope: t('trattoria · kraków\nbrand identity · print · menu · website', 'trattoria · kraków\nidentyfikacja · druk · menu · strona'),
    hoverLine: t('gnam · trattoria, kraków  →  click to open', 'gnam · trattoria, kraków  →  kliknij, żeby otworzyć'),
    hoverNote: t('tablecloth cream + tomato red', 'kremowy obrus + pomidorowa czerwień'),
    vsLabel: t('vs. a normal trattoria', 'vs. zwykła trattoria'),
    sameLine: t('same pasta. different website.', 'ten sam makaron. inna strona.'),
    c: { bg: '#fff3e3', ink: '#e5321b', dim: '#b0805e', panel: '#ffe9d0', soft: '#f6e2c8', window: '#fff3e3', body: '#6b4a3a', btnInk: '#fff3e3', visitBg: '#e5321b', visitInk: '#fff3e3', caseBg: '#fff3e3', tile: '#ffffff', tileBig: '#f6e2c8', next: '#f5b300' },
    tricks: [
      { title: t('the tiramisu builds itself', 'tiramisu składa się samo'), desc: t('scroll and the layers stack: biscuit, mascarpone, cocoa.', 'przewijasz, a warstwy się układają: biszkopt, mascarpone, kakao.'), short: t('scroll, it stacks', 'przewijasz, rośnie'), img: '/a/gn-s3.webp' },
      { title: t('take a number', 'weź numerek'), desc: t('pull a ticket like at the deli counter, then book your table.', 'wyciągnij numerek jak w delikatesach, potem zarezerwuj stolik.'), short: t('like at the deli counter', 'jak w delikatesach'), img: '/a/gn-s1.webp' },
      { title: t('the nav is a ticket rail', 'menu to szyna na zamówienia'), desc: t('menu, prenota, la storia, dove: hung like comandas in the kitchen.', 'menu, prenota, la storia, dove: wiszą jak bloczki zamówień w kuchni.'), short: t('comandas in the kitchen', 'bloczki w kuchni'), img: '/a/gn-s2.webp' },
    ],
    stealNote: t('the bits people screenshot.\nthen: "make it mine"', 'rzeczy, które ludzie screenują.\npotem: "chcę taki"'),
    stealNotePos: { x: 640, y: 360, r: -3 },
    vsNotes: [
      { x: 770, y: 320, r: -3, text: t('the nav = order tickets\non a rail', 'menu = bloczki zamówień\nna szynie') },
      { x: 760, y: 590, r: 2, text: t('you can almost smell this one', 'tę prawie czuć') },
    ],
    inspectNotes: [
      { x: 60, y: 330, r: -2, text: t('menu, prenota, storia, dove:\nhung like comandas\nin the kitchen', 'menu, prenota, storia, dove:\nwiszą jak bloczki\nw kuchni') },
      { x: 500, y: 380, r: 2, text: t('GNAM, huge.\nreadable from the tram', 'GNAM, wielkie.\nczytasz to z tramwaju') },
      { x: 820, y: 360, r: -2, text: t("the waiter's pen:\nthe red italic bits", 'długopis kelnera:\nczerwone kursywy') },
      { x: 1185, y: 400, r: 0, text: t("carta + pomodoro.\nthat's it.", 'carta + pomodoro.\ni tyle.') },
    ],
    inspectChips: [
      { x: 130, y: 32, text: t('labels · ibm plex mono', 'etykiety · ibm plex mono') },
      { x: 60, y: 505, text: t('display · inter black', 'nagłówek · inter black') },
      { x: 1010, y: 292, text: t('handwritten · instrument serif italic', 'odręczne · instrument serif italic') },
      { x: 30, y: 662, text: t('40'), kind: 'num' },
      { x: 650, y: 470, text: t('32'), kind: 'num' },
    ],
    swatches: [
      { name: t('carta'), hex: '#FFF3E3' },
      { name: t('pomodoro'), hex: '#E5321B' },
      { name: t('inchiostro'), hex: '#131414' },
      { name: t('tuorlo'), hex: '#FFC629' },
    ],
    type: [
      { label: t('display · inter black', 'nagłówek · inter black'), sample: 'GNAM. pizza, pasta, dolci.', font: "'Inter', sans-serif;900", size: 30 },
      { label: t('serif · instrument serif italic', 'szeryf · instrument serif italic'), sample: 'mangia un pezzo. scusa.', font: "'Instrument Serif', serif;italic", size: 32 },
      { label: t('labels · ibm plex mono', 'etykiety · ibm plex mono'), sample: 'COMANDA Nº 01 · 36 PIATTI', font: "'IBM Plex Mono', monospace;400", size: 16 },
    ],
    aa: { font: "'Inter', sans-serif;900" },
    section2: t('02 · print & the room', '02 · druk i wnętrze'),
    s2: { big: '/a/gn-big.webp', small: ['/a/gn-s1.webp', '/a/gn-s2.webp', '/a/gn-s3.webp'], bigNote: t('tables get a postcard,\nnot a flyer', 'na stołach pocztówka,\nnie ulotka'), smallNote: t('take a number,\nlike at the deli', 'weź numerek,\njak w delikatesach'), bigBg: '#f6e2c8' },
    next: { slug: 'dakdak', label: t('next →  dakdak, chicken & soju, paris', 'dalej →  dakdak, kurczak i soju, paryż') },
  },
  {
    slug: 'dakdak',
    n: 3,
    name: 'dakdak',
    live: '/dakdak/',
    shot: '/w/dakdak.webp',
    phone: '/a/m-dakdak.webp',
    where: t('chicken & soju, paris', 'kurczak i soju, paryż'),
    meta: t('chicken & soju · paris · concept · creative direction, design, code', 'kurczak i soju · paryż · koncept · creative direction, design, kod'),
    scope: t('chicken & soju · paris\nbrand identity · packaging · photo booth · website', 'kurczak i soju · paryż\nidentyfikacja · opakowania · fotobudka · strona'),
    hoverLine: t('dakdak · chicken & soju, paris  →  click to open', 'dakdak · kurczak i soju, paryż  →  kliknij, żeby otworzyć'),
    hoverNote: t('2am neon. the whole os goes yellow', 'neon o 2 w nocy. wszystko robi się żółte'),
    vsLabel: t('vs. a normal chicken place', 'vs. zwykła kurczakownia'),
    sameLine: t('same chicken. different website.', 'ten sam kurczak. inna strona.'),
    c: { bg: '#0b0a09', ink: '#f5b300', dim: '#8a847b', panel: '#15130f', soft: '#232019', window: '#141210', body: '#cfcbc4', btnInk: '#0b0a09', visitBg: '#f5b300', visitInk: '#0b0a09', caseBg: '#0b0a09', tile: '#15130f', tileBig: '#1e1b16', next: '#ffffff' },
    tricks: [
      { title: t('pick a sauce', 'wybierz sos'), desc: t('soy garlic, yangnyeom, snow cheese: the whole site turns that colour.', 'sojowo-czosnkowy, yangnyeom, serowy: cała strona zmienia kolor.'), short: t('the site turns that colour', 'strona zmienia kolor'), img: '/a/dk-s3.webp' },
      { title: t('live pick-up counter', 'licznik odbioru na żywo'), desc: t('the order number ticks up like the screen at the counter.', 'numer zamówienia rośnie jak na ekranie przy ladzie.'), short: t('ticks up like at the counter', 'rośnie jak przy ladzie'), img: '/a/dk-s2.webp' },
      { title: t('2am photo booth', 'fotobudka o 2 w nocy'), desc: t('strip photos from the booth, developing as you scroll.', 'paski zdjęć z fotobudki wywołują się, kiedy przewijasz.'), short: t('strips develop as you scroll', 'zdjęcia wywołują się przy przewijaniu'), img: '/a/dk-s1.webp' },
    ],
    stealNote: t('the bits people screenshot.\nthen: "make it mine"', 'rzeczy, które ludzie screenują.\npotem: "chcę taki"'),
    stealNotePos: { x: 720, y: 240, r: -3 },
    vsNotes: [
      { x: 760, y: 120, r: -3, text: t('a live counter.\nfeels open right now', 'licznik na żywo.\nczujesz, że jest otwarte') },
      { x: 1000, y: 650, r: 2, text: t('the colour IS the sauce', 'kolor TO sos') },
    ],
    inspectNotes: [
      { x: 110, y: 556, r: -2, text: t('dakdak in hangul, set\nlike a neon sign at 2am', 'dakdak po koreańsku,\njak neon o 2 w nocy') },
      { x: 1000, y: 618, r: 0, text: t('the order number ticks up\nlike the screen at the counter', 'numer zamówienia rośnie\njak ekran przy ladzie') },
      { x: 820, y: 690, r: -2, text: t('pick a sauce: the whole\nsite turns that colour', 'wybierz sos: cała\nstrona zmienia kolor') },
    ],
    inspectChips: [
      { x: 112, y: 124, text: t('hangul · black han sans') },
      { x: 1016, y: 152, text: t('counter · doto', 'licznik · doto') },
      { x: 1000, y: 368, text: t('wordmark · krona one', 'logotyp · krona one') },
      { x: 372, y: 656, text: t('labels · antonio', 'etykiety · antonio') },
    ],
    swatches: [
      { name: t('ink', 'czerń'), hex: '#0B0A09' },
      { name: t('sauce yellow', 'żółty sos'), hex: '#F5B300' },
      { name: t('rice', 'ryż'), hex: '#EFE6D6' },
      { name: t('yangnyeom'), hex: '#D7261E' },
    ],
    type: [
      { label: t('hangul · black han sans'), sample: '닭닭 치킨', font: "'Black Han Sans', sans-serif;400", size: 30 },
      { label: t('wordmark · krona one', 'logotyp · krona one'), sample: 'DAKDAK', font: "'Krona One', sans-serif;400", size: 22 },
      { label: t('counter · doto', 'licznik · doto'), sample: '0412', font: "'Doto', monospace;900", size: 26 },
      { label: t('labels · antonio', 'etykiety · antonio'), sample: 'PICK A SAUCE', font: "'Antonio', sans-serif;700", size: 24 },
    ],
    aa: { font: "'Black Han Sans', sans-serif;400" },
    section2: t('02 · the booth & the box', '02 · fotobudka i pudełko'),
    s2: { big: '/a/dk-big.webp', small: ['/a/dk-s1.webp', '/a/dk-s2.webp', '/a/dk-s3.webp'], bigNote: t('the box glows\nat 2am', 'pudełko świeci\no 2 w nocy'), smallNote: t('strips from the booth,\nnot a gallery page', 'paski z fotobudki,\nnie galeria'), bigBg: '#1e1b16' },
    next: { slug: 'grzywka', label: t('next →  grzywka, hair salon, warszawa', 'dalej →  grzywka, salon fryzjerski, warszawa') },
  },
  {
    slug: 'grzywka',
    n: 4,
    name: 'grzywka',
    live: '/grzywka/',
    shot: '/w/grzywka.webp',
    phone: '/a/m-grzywka.webp',
    where: t('hair salon, warszawa', 'salon fryzjerski, warszawa'),
    meta: t('hair salon · warszawa · concept · creative direction, design, code', 'salon fryzjerski · warszawa · koncept · creative direction, design, kod'),
    scope: t('hair salon · warszawa\nbrand identity · the salon · lookbook · website', 'salon fryzjerski · warszawa\nidentyfikacja · salon · lookbook · strona'),
    hoverLine: t('grzywka · the wolf is back  →  click to open', 'grzywka · wilczyca wraca  →  kliknij, żeby otworzyć'),
    hoverNote: t('pink + baby blue gel. y2k teen mag energy', 'róż + błękitny żel. klimat gazetki dla nastolatek z 2003'),
    vsLabel: t('vs. a normal salon', 'vs. zwykły salon'),
    sameLine: t('same haircut. different website.', 'ta sama fryzura. inna strona.'),
    c: { bg: '#de2a59', ink: '#ffffff', dim: '#ffc2d2', panel: '#c81f4c', soft: '#f6d3dd', window: '#ffffff', body: '#444444', btnInk: '#ffffff', visitBg: '#a6d8f5', visitInk: '#111111', caseBg: '#ffe6ee', tile: '#ffffff', tileBig: '#ffd0dc', next: '#fff4e2' },
    tricks: [
      { title: t('cut her fringe', 'obetnij jej grzywkę'), desc: t('drag the scissors across her bangs. oh no. then we fix it.', 'przeciągnij nożyczki po grzywce. o nie. potem to naprawiamy.'), short: t('oh no. then we fix it', 'o nie. potem naprawiamy'), img: '/a/gz-s1.webp' },
      { title: t('the lookbook flips', 'lookbook się kartkuje'), desc: t('scroll and the 10 looks turn like magazine pages.', 'przewijasz, a 10 fryzur przewraca się jak strony gazety.'), short: t('10 looks, magazine pages', '10 fryzur, strony gazety'), img: '/a/gz-s2.webp' },
      { title: t('10 new cuts!', '10 nowych cięć!'), desc: t('a burst sticker, a barcode, a flip phone: the whole y2k teen mag.', 'naklejka-wybuch, kod kreskowy, klapka: cała gazetka dla nastolatek z 2003.'), short: t('burst, barcode, flip phone', 'wybuch, kod kreskowy, klapka'), img: '/a/gz-s3.webp' },
    ],
    stealNote: t('the bits people screenshot.\nthen: "make it mine"', 'rzeczy, które ludzie screenują.\npotem: "chcę taki"'),
    stealNotePos: { x: 340, y: 590, r: -3, color: '#ffffff' },
    vsNotes: [
      { x: 1230, y: 130, r: -3, text: t('cut her fringe.\nreally.', 'obetnij jej grzywkę.\nserio.') },
      { x: 760, y: 690, r: -2, text: t('a magazine cover,\nnot a price list', 'okładka gazety,\nnie cennik') },
    ],
    inspectNotes: [
      { x: 330, y: 172, r: -2, text: t('a magazine cover,\nnot a salon price list', 'okładka gazety,\nnie cennik salonu') },
      { x: 1120, y: 330, r: 2, text: t('cut her fringe.\nit grows back 1 cm a month', 'obetnij jej grzywkę.\nodrasta 1 cm miesięcznie') },
      { x: 560, y: 420, r: -2, text: t('the burst = y2k teen mag', 'wybuch = gazetka z 2003') },
      { x: 1180, y: 100, r: 0, text: t('pink + baby blue gel.\nnothing beige.', 'róż + błękitny żel.\nzero beżu.') },
    ],
    inspectChips: [
      { x: 40, y: 162, text: t('masthead · unbounded black', 'winieta · unbounded black') },
      { x: 60, y: 400, text: t('display · bodoni moda italic', 'nagłówek · bodoni moda italic') },
      { x: 60, y: 612, text: t('body · schibsted grotesk', 'tekst · schibsted grotesk') },
      { x: 30, y: 532, text: t('48'), kind: 'num' },
      { x: 500, y: 165, text: t('24'), kind: 'num' },
    ],
    swatches: [
      { name: t('hot pink', 'ostry róż'), hex: '#DE2A59' },
      { name: t('baby blue', 'błękit'), hex: '#A6D8F5' },
      { name: t('ink', 'czerń'), hex: '#111111' },
      { name: t('chrome', 'chrom'), hex: '#D9DDE3' },
    ],
    type: [
      { label: t('masthead · unbounded black', 'winieta · unbounded black'), sample: 'grzywka', font: "'Unbounded', sans-serif;900", size: 34 },
      { label: t('display · bodoni moda italic', 'nagłówek · bodoni moda italic'), sample: 'the wolf is back', font: "'Bodoni Moda', serif;italic", size: 34 },
      { label: t('body · schibsted grotesk', 'tekst · schibsted grotesk'), sample: 'fringe trims are free, forever', font: "'Schibsted Grotesk', sans-serif;400", size: 18 },
    ],
    aa: { font: "'Unbounded', sans-serif;900" },
    section2: t('02 · the salon', '02 · salon'),
    s2: { big: '/a/gz-big.webp', small: ['/a/gz-s1.webp', '/a/gz-s2.webp', '/a/gz-s3.webp'], bigNote: t('the shopfront looks\nlike the website', 'witryna wygląda\njak strona'), smallNote: t('the booking reminder\nis a flip phone', 'przypomnienie o wizycie\nto klapka'), bigBg: '#ffd0dc' },
    next: { slug: '', label: t('next →  back to the canvas', 'dalej →  z powrotem na płótno') },
  },
];

export const bySlug = (s: string) => projects.find((p) => p.slug === s)!;
