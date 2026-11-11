import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/lobster/400.css';
import '@fontsource/tinos/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import type { CSSProperties, ReactNode } from 'react';
import type { Lang } from '@/lib/projects';
import { u } from '@/lib/u';

/* all coordinates are figma frame coordinates; the panel starts at 24,24 */
const P = (x: number, y: number, w?: number, h?: number, extra: CSSProperties = {}): CSSProperties => ({ position: 'absolute', left: u(x - 24), top: u(y - 24), width: w !== undefined ? u(w) : undefined, height: h !== undefined ? u(h) : undefined, ...extra });
const Tx = ({ x, y, s, f, c, w = 400, children, st }: { x: number; y: number; s: number; f: string; c: string; w?: number; children: ReactNode; st?: CSSProperties }) => (
  <span style={{ ...P(x, y), fontFamily: f, fontSize: u(s), color: c, fontWeight: w, lineHeight: 1.25, whiteSpace: 'pre', ...st }}>{children}</span>
);
const Note = ({ x, y, r, children }: { x: number; y: number; r: number; children: ReactNode }) => (
  <span className="hand" style={{ ...P(x, y), fontSize: u(22), color: '#e0201a', transform: `rotate(${r}deg)`, transformOrigin: '0 0', zIndex: 20, whiteSpace: 'pre' }}>{children}</span>
);
const Tag = ({ x, y, w, children }: { x: number; y: number; w: number; children: ReactNode }) => (
  <span style={{ ...P(x, y, w, 22), background: '#333', color: '#fff', borderRadius: u(11), font: `400 ${u(10)}/${u(22)} var(--mono)`, textAlign: 'center', zIndex: 15 }}>{children}</span>
);
const MS = "'Montserrat', sans-serif";
const IN = "'Inter', sans-serif";
const TI = "'Tinos', 'Times New Roman', serif";

export default function BadSite({ slug, lang }: { slug: string; lang: Lang }) {
  const L = (en: string, pl: string) => (lang === 'en' ? en : pl);
  if (slug === 'heavy-cream')
    return (
      <div className="bad" style={{ background: '#f5f1ea' }}>
        <Tx x={208} y={48} s={10} f={MS} c="#5a5148" w={300}>{L('HOME      OUR STORY      MENU      VISIT US', 'START      NASZA HISTORIA      MENU      ODWIEDŹ NAS')}</Tx>
        <Tx x={326} y={72} s={9} f={MS} c="#9a8f84" w={300}>{L('·  the bakery  ·', '·  piekarnia  ·')}</Tx>
        <div style={{ ...P(24, 100, 706, 330), background: 'url(/a/croissant.webp) center 40%/cover', filter: 'sepia(.5) saturate(.6) brightness(.85)' }} />
        <div style={{ ...P(24, 100, 706, 330), background: 'rgba(0,0,0,.18)' }} />
        <Tx x={0} y={220} s={34} f={MS} c="#fff" w={300} st={{ left: 0, width: '100%', textAlign: 'center', letterSpacing: '.12em' }}>{L('ARTISAN BAKERY', 'PIEKARNIA RZEMIEŚLNICZA')}</Tx>
        <Tx x={0} y={268} s={13} f={MS} c="#fff" w={300} st={{ left: 0, width: '100%', textAlign: 'center' }}>{L('Est. 2015', 'od 2015')}</Tx>
        <Tx x={0} y={470} s={13} f={MS} c="#5a5148" st={{ left: 0, width: '100%', textAlign: 'center', letterSpacing: '.1em' }}>{L('OUR STORY', 'NASZA HISTORIA')}</Tx>
        <div style={{ ...P(357, 494, 40, 1), background: '#5a5148' }} />
        <Tx x={0} y={512} s={12} f={MS} c="#7a7066" w={300} st={{ left: 0, width: '100%', textAlign: 'center', lineHeight: 1.6 }}>{L('We believe in simple ingredients, made with love.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore.', 'Wierzymy w proste składniki i pieczenie z miłością.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore.')}</Tx>
        <div style={{ ...P(307, 600, 140, 40), border: '1px solid #5a5148', font: `400 ${u(10)}/${u(38)} ${MS}`, color: '#5a5148', textAlign: 'center', letterSpacing: '.1em' }}>{L('LEARN MORE', 'DOWIEDZ SIĘ')}</div>
        {[64, 280, 496].map((x) => <div key={x} style={{ ...P(x, 670, 200, 110), background: '#ddd6cc' }} />)}
        <Tag x={40} y={110} w={143}>{L('every other bakery', 'każda inna piekarnia')}</Tag>
        <div style={{ ...P(24, 80, 706, 600), background: 'rgba(0,0,0,.35)' }} />
        <div style={{ ...P(207, 150, 340, 220), background: '#fff', borderRadius: u(4), boxShadow: '0 10px 40px rgba(0,0,0,.25)' }} />
        <Tx x={524} y={158} s={18} f={IN} c="#999">×</Tx>
        <Tx x={227} y={182} s={18} f={MS} c="#5a5148">{L('Join our newsletter!', 'Zapisz się do newslettera!')}</Tx>
        <Tx x={227} y={212} s={11} f={MS} c="#7a7066">{L('Get 10% off your first order', 'Odbierz 10% rabatu na start')}</Tx>
        <div style={{ ...P(227, 250, 300, 38), border: '1px solid #ccc', font: `400 ${u(11)}/${u(36)} ${MS}`, color: '#aaa', paddingLeft: u(10) }}>{L('Your email address', 'Twój adres e-mail')}</div>
        <div style={{ ...P(227, 300, 300, 40), background: '#5a5148', font: `400 ${u(12)}/${u(40)} ${MS}`, color: '#fff', textAlign: 'center' }}>{L('Subscribe', 'Zapisz się')}</div>
        <div style={{ ...P(24, 690, 706, 110), background: '#fff', boxShadow: '0 -4px 20px rgba(0,0,0,.08)' }} />
        <Tx x={48} y={708} s={11} f={MS} c="#444" st={{ lineHeight: 1.5 }}>{L('We use cookies to improve your experience. By continuing to browse\nyou agree to our Cookie Policy and Privacy Policy.', 'Używamy plików cookies, aby poprawić Twoje doświadczenia. Korzystając\nze strony, akceptujesz Politykę Cookies i Politykę Prywatności.')}</Tx>
        <div style={{ ...P(48, 752, 150, 34), background: '#5a5148', font: `400 ${u(11)}/${u(34)} ${MS}`, color: '#fff', textAlign: 'center' }}>{L('Accept all', 'Akceptuj')}</div>
        <div style={{ ...P(208, 752, 120, 34), border: '1px solid #5a5148', font: `400 ${u(11)}/${u(32)} ${MS}`, color: '#5a5148', textAlign: 'center' }}>{L('Settings', 'Ustawienia')}</div>
        <div style={{ ...P(658, 620, 52, 52), background: '#2f6fed', borderRadius: '50%', font: `400 ${u(20)}/${u(52)} ${IN}`, textAlign: 'center', zIndex: 12 }}>💬</div>
        <Note x={194} y={420} r={-2}>{L("a newsletter popup before you've\neven seen what they sell", 'popup z newsletterem, zanim\nzobaczysz, co w ogóle mają')}</Note>
        <Note x={444} y={600} r={2}>{L('the cookie banner takes\nthe whole bottom', 'baner cookies zajmuje\ncały dół')}</Note>
        <Note x={444} y={92} r={-3}>{L('no product, no prices,\nno opening hours up top', 'ani produktu, ani cen, ani\ngodzin otwarcia na górze')}</Note>
      </div>
    );

  if (slug === 'gnam')
    return (
      <div className="bad" style={{ background: '#3b2416 repeating-linear-gradient(180deg, rgba(74,46,28,.6) 0 ' + u(14) + ', transparent ' + u(14) + ' ' + u(30) + ')' }}>
        <div style={{ ...P(54, 40, 646, 90), background: '#2a190f', border: '1px solid #d4af37' }} />
        <Tx x={74} y={56} s={40} f="'Lobster', cursive" c="#d4af37">Trattoria Bella</Tx>
        <Tx x={80} y={106} s={12} f={TI} c="#e8d9b5">{L('Authentic Italian Cuisine since 1985', 'Autentyczna kuchnia włoska od 1985')}</Tx>
        {[L('Home', 'Start'), 'Menu', L('Gallery', 'Galeria'), L('Reservations', 'Rezerwacje'), L('Contact', 'Kontakt')].map((t, i) => (
          <div key={i} style={{ ...P(54 + i * 128, 140, 124, 30), background: 'linear-gradient(#a52a2a,#7a1515)', border: '1px solid #d4af37', borderRadius: u(4), font: `400 ${u(13)}/${u(28)} ${TI}`, color: '#fff', paddingLeft: u(14) }}>{t}</div>
        ))}
        <div style={{ ...P(54, 186, 190, 250), background: '#f3e9d2', border: '1px solid #d4af37' }} />
        <Tx x={68} y={198} s={18} f="'Lobster', cursive" c="#8b1a1a">{L('Opening Hours', 'Godziny otwarcia')}</Tx>
        <Tx x={68} y={228} s={11} f={TI} c="#333">{L('Mon-Fri: 12:00-22:00\nSat-Sun: 12:00-23:00\n\nTel: +48 12 345 67 89', 'Pn-Pt: 12:00-22:00\nSob-Nd: 12:00-23:00\n\nTel: +48 12 345 67 89')}</Tx>
        <div style={{ ...P(68, 320, 160, 100), background: '#3b5998' }} />
        <Tx x={76} y={334} s={9} f={IN} c="#fff" w={700}>{L('f  Like us on Facebook!\n    1,204 people like this', 'f  Polub nas na Facebooku!\n    1 204 osoby to lubią')}</Tx>
        <div style={{ ...P(76, 380, 60, 20), background: '#fff', font: `400 ${u(10)}/${u(20)} ${IN}`, color: '#3b5998', textAlign: 'center' }}>{L('Like', 'Lubię')}</div>
        <div style={{ ...P(260, 186, 440, 250), background: '#f3e9d2', border: '1px solid #d4af37' }} />
        <Tx x={276} y={196} s={26} f="'Lobster', cursive" c="#8b1a1a">{L('Welcome!!', 'Witamy!!')}</Tx>
        <Tx x={276} y={236} s={12} f={TI} c="#333">{L('Welcome to our restaurant. We serve the best traditional\nItalian dishes in a cozy atmosphere. Come and visit us!', 'Witamy w naszej restauracji. Serwujemy najlepsze tradycyjne\ndania włoskie w przytulnej atmosferze. Zapraszamy!')}</Tx>
        <Tx x={276} y={286} s={13} f={TI} c="#0000ee" st={{ textDecoration: 'underline' }}>{L('» Download our menu (PDF, 4.2 MB)', '» Pobierz nasze menu (PDF, 4,2 MB)')}</Tx>
        {['/a/pizza.webp', '/a/carbo.webp', '/a/gn-s3.webp'].map((s, i) => <div key={s} style={{ ...P(276 + i * 140, 320, 128, 96), border: '3px solid #fff', background: `url(${s}) center/cover`, filter: 'saturate(1.4) contrast(1.1)' }} />)}
        <div style={{ ...P(54, 444, 646, 22), background: '#ffff66', overflow: 'hidden' }}>
          <span className="marq" style={{ font: `400 ${u(12)}/${u(22)} ${TI}`, color: '#cc0000' }}>{L('*** NEW!!! Pizza Tuesday - 2nd pizza 50% off!!! ***   *** NEW!!! Pizza Tuesday ***   ', '*** NOWOŚĆ!!! Pizza we wtorki - druga pizza 50% taniej!!! ***   *** NOWOŚĆ!!! ***   ').repeat(2)}</span>
        </div>
        <div style={{ ...P(68, 476, 60, 60), background: '#34e0a1', borderRadius: '50%' }} />
        <Tx x={136} y={478} s={10} f={IN} c="#e8d9b5" w={700}>{L('Tripadvisor\nCertificate of\nExcellence 2014', 'Tripadvisor\nCertyfikat\nDoskonałości 2014')}</Tx>
        <div style={{ ...P(68, 540, 150, 26), background: '#000', border: '1px solid #d4af37', font: `400 ${u(11)}/${u(24)} var(--mono)`, color: '#33ff33', paddingLeft: u(8) }}>{L('Visitors: 004213', 'Odwiedzin: 004213')}</div>
        <Tag x={214} y={550} w={163}>{L('every other trattoria', 'każda inna trattoria')}</Tag>
        <Tx x={54} y={752} s={9} f={TI} c="#bfaf8f">{L('Best viewed in Internet Explorer 8, 1024x768', 'Strona najlepiej wygląda w Internet Explorer 8, 1024x768')}</Tx>
        <Tx x={54} y={770} s={10} f={TI} c="#bfaf8f">{L('© 2009 Trattoria Bella | All rights reserved | Designed by WebStudio24', '© 2009 Trattoria Bella | Wszelkie prawa zastrzeżone | Projekt: WebStudio24')}</Tx>
        <Note x={324} y={470} r={-3}>{L('menu = a 4 mb pdf.\non a phone: pinch and zoom', 'menu = pdf na 4 mb.\nna telefonie: szczypanie i zoom')}</Note>
        <Note x={84} y={600} r={-2}>{L('a facebook widget\nfrom 2013', 'widget z facebooka\nz 2013')}</Note>
        <Note x={324} y={640} r={2}>{L('the "italian restaurant" font.\nevery italian restaurant has it', 'font "włoska restauracja".\nma go każda włoska restauracja')}</Note>
      </div>
    );

  if (slug === 'dakdak') {
    const items = [
      [L('Spicy Wings 12 pcs', 'Ostre skrzydełka 12 szt.'), '★ 4.3 (120)', '34,90 zł'],
      [L('Crispy Combo for 2', 'Chrupiący zestaw dla 2'), '★ 4.1 (88)', '59,90 zł'],
      [L('Chicken Burger', 'Burger z kurczakiem'), '★ 4.0 (64)', '24,90 zł'],
      [L('Fries Large', 'Frytki duże'), '★ 4.4 (210)', '9,90 zł'],
      ['Cola 0,5 l', '★ 4.6 (31)', '6,90 zł'],
    ];
    const imgs = ['/a/dk-s3.webp', '/a/dk-big.webp', '/a/dk-s2.webp', '/a/dk-s1.webp', ''];
    return (
      <div className="bad" style={{ background: '#fff' }}>
        <Tx x={48} y={84} s={16} f={IN} c="#111" w={700}>{L('Chicken Express', 'Kurczak Express')}</Tx>
        <div style={{ ...P(254, 80, 300, 30), background: '#f1f1f1', borderRadius: u(15), font: `400 ${u(12)}/${u(30)} ${IN}`, color: '#888', paddingLeft: u(20) }}>{L('Search for dishes…', 'Szukaj dań…')}</div>
        <div style={{ ...P(674, 82, 26, 26), background: '#e53935', borderRadius: '50%' }} />
        <div style={{ ...P(48, 120, 658, 80), background: '#e53935', borderRadius: u(12) }} />
        <Tx x={68} y={138} s={20} f={IN} c="#fff" w={700}>{L('-20% on your first order!', '-20% na pierwsze zamówienie!')}</Tx>
        <Tx x={68} y={168} s={12} f={IN} c="#fff">{L('Use code: CHICKEN20', 'Kod: KURCZAK20')}</Tx>
        {[L('Popular', 'Popularne'), L('Wings', 'Skrzydełka'), L('Combos', 'Zestawy'), L('Sides', 'Dodatki'), L('Drinks', 'Napoje')].map((t, i) => (
          <div key={i} style={{ ...P(48 + i * 100, 214, 90, 30), background: i === 0 ? '#111' : '#f1f1f1', borderRadius: u(15), font: `400 ${u(12)}/${u(30)} ${IN}`, color: i === 0 ? '#fff' : '#333', textAlign: 'center' }}>{t}</div>
        ))}
        {items.map((it, i) => (
          <div key={i}>
            <div style={{ ...P(48, 258 + i * 92, 658, 80), border: '1px solid #eee', borderRadius: u(10) }} />
            <div style={{ ...P(60, 268 + i * 92, 60, 60), borderRadius: u(8), background: imgs[i] ? `url(${imgs[i]}) center/cover` : '#c62828', filter: 'saturate(.5) brightness(1.1)' }} />
            <Tx x={134} y={274 + i * 92} s={13} f={IN} c="#111" w={700}>{it[0]}</Tx>
            <Tx x={134} y={296 + i * 92} s={11} f={IN} c="#f5a623">{it[1]}</Tx>
            <Tx x={134} y={312 + i * 92} s={12} f={IN} c="#555">{it[2]}</Tx>
            <div style={{ ...P(650, 282 + i * 92, 32, 32), background: '#e53935', borderRadius: '50%', font: `700 ${u(18)}/${u(32)} ${IN}`, color: '#fff', textAlign: 'center' }}>+</div>
          </div>
        ))}
        <div style={{ ...P(48, 724, 658, 52), background: '#2e7d32', borderRadius: u(26), font: `700 ${u(13)}/${u(52)} ${IN}`, color: '#fff', textAlign: 'center' }}>{L('View cart · 2 items · 69,80 zł', 'Koszyk · 2 produkty · 69,80 zł')}</div>
        <Tag x={40} y={700} w={189}>{L('every other chicken place', 'każda inna kurczakownia')}</Tag>
        <div style={{ ...P(24, 24, 706, 44), background: '#222' }} />
        <Tx x={40} y={37} s={12} f={IN} c="#fff" w={700}>{L('Get the app!  ★★★★☆  Order faster', 'Pobierz aplikację!  ★★★★☆  Zamawiaj szybciej')}</Tx>
        <div style={{ ...P(640, 32, 70, 28), background: '#e53935', borderRadius: u(14), font: `700 ${u(11)}/${u(28)} ${IN}`, color: '#fff', textAlign: 'center' }}>{L('OPEN', 'OTWÓRZ')}</div>
        <div style={{ ...P(174, 100, 330, 130), background: '#fff', border: '1px solid #ddd', borderRadius: u(10), boxShadow: '0 8px 30px rgba(0,0,0,.18)', zIndex: 10 }} />
        <Tx x={194} y={118} s={13} f={IN} c="#222" st={{ zIndex: 11 }}>{L('chickenexpress.pl wants to', 'kurczakexpress.pl chce')}</Tx>
        <Tx x={194} y={146} s={12} f={IN} c="#444" st={{ zIndex: 11 }}>{L('🔔  Show notifications', '🔔  Wyświetlać powiadomienia')}</Tx>
        <div style={{ ...P(284, 182, 90, 32), background: '#f1f1f1', borderRadius: u(16), font: `400 ${u(12)}/${u(32)} ${IN}`, color: '#1a73e8', textAlign: 'center', zIndex: 11 }}>{L('Block', 'Blokuj')}</div>
        <div style={{ ...P(384, 182, 100, 32), background: '#1a73e8', borderRadius: u(16), font: `400 ${u(12)}/${u(32)} ${IN}`, color: '#fff', textAlign: 'center', zIndex: 11 }}>{L('Allow', 'Zezwól')}</div>
        <Note x={464} y={240} r={-3}>{L('looks like the delivery app,\nso people just order there', 'wygląda jak aplikacja z dostawą,\nwięc ludzie zamawiają tam')}</Note>
        <Note x={214} y={348} r={2}>{L('no photos of the real food', 'zero zdjęć prawdziwego jedzenia')}</Note>
        <Note x={464} y={540} r={-2}>{L('where is it? when is it open?\nnobody knows', 'gdzie to jest? kiedy otwarte?\nnie wiadomo')}</Note>
      </div>
    );
  }

  // grzywka
  return (
    <div className="bad" style={{ background: '#f3ede7' }}>
      <Tx x={54} y={44} s={20} f={MS} c="#8c7b6b" w={300}>{L('Beauty Studio', 'Studio Urody')}</Tx>
      <Tx x={414} y={50} s={11} f={MS} c="#8c7b6b">{L('Services    Team    Prices    Book', 'Usługi    Zespół    Cennik    Rezerwacja')}</Tx>
      <div style={{ ...P(24, 90, 360, 300), background: 'url(/a/gz-s1.webp) center 30%/cover', filter: 'sepia(.7) saturate(.35) brightness(1.08) contrast(.8)' }} />
      <Tx x={414} y={150} s={44} f={MS} c="#6e5e50" w={300} st={{ lineHeight: 1.1 }}>{L('Relax &\nRenew', 'Relaks i\nOdnowa')}</Tx>
      <Tx x={416} y={260} s={13} f={MS} c="#8c7b6b">{L('Your moment of beauty.', 'Twoja chwila dla siebie.')}</Tx>
      <div style={{ ...P(416, 296, 150, 40), background: '#b8a08a', borderRadius: u(20), font: `400 ${u(13)}/${u(40)} ${MS}`, color: '#fff', textAlign: 'center' }}>{L('Book now', 'Zarezerwuj')}</div>
      <Tx x={54} y={416} s={12} f={MS} c="#6e5e50" st={{ letterSpacing: '.1em' }}>{L('PRICE LIST', 'CENNIK')}</Tx>
      {[[L("Women's haircut", 'Strzyżenie damskie'), '120 zł'], [L('Colour', 'Koloryzacja'), L('from 250 zł', 'od 250 zł')], [L('Blow-dry', 'Modelowanie'), '70 zł'], [L('Treatment', 'Zabieg'), '90 zł']].map(([a, b], i) => (
        <div key={i}>
          <Tx x={54} y={446 + i * 26} s={12} f={MS} c="#6e5e50">{a}</Tx>
          <Tx x={194} y={446 + i * 26} s={12} f={MS} c="#c9bbad">. . . . . . . . . . . . . . . . . .</Tx>
          <Tx x={354} y={446 + i * 26} s={12} f={MS} c="#6e5e50">{b}</Tx>
        </div>
      ))}
      <Tx x={454} y={416} s={12} f={MS} c="#6e5e50" st={{ letterSpacing: '.1em' }}>{L('OUR TEAM', 'NASZ ZESPÓŁ')}</Tx>
      {['Anna', 'Kasia', 'Ola'].map((n, i) => (
        <div key={n}>
          <div style={{ ...P(454 + i * 84, 446, 64, 64), background: '#d9cfc4', borderRadius: '50%' }} />
          <Tx x={470 + i * 84} y={518} s={11} f={MS} c="#8c7b6b">{n}</Tx>
        </div>
      ))}
      <Tx x={54} y={570} s={11} f={MS} c="#8c7b6b">{L('@beautystudio on instagram', '@studiourody na instagramie')}</Tx>
      <div style={{ ...P(54, 596, 646, 100), background: '#efe7de' }} />
      <Tx x={84} y={638} s={11} f={MS} c="#9c7f6a">{L('⚠ Error loading Instagram feed. Please try again later.', '⚠ Błąd ładowania feedu z Instagrama. Spróbuj ponownie później.')}</Tx>
      <div style={{ ...P(54, 716, 646, 60), background: '#f7f3ee', border: '1px solid #e6ddd3', borderRadius: u(8) }} />
      <Tx x={74} y={736} s={13} f={MS} c="#9c8b7b"><span className="spin">◌</span>  {L('Loading booking widget…', 'Ładowanie widgetu rezerwacji…')}</Tx>
      <Tag x={40} y={100} w={136}>{L('every other salon', 'każdy inny salon')}</Tag>
      <Note x={424} y={348} r={-3}>{L('the same stock photo\nas a lot of salons', 'to samo zdjęcie ze stocka\nco w wielu salonach')}</Note>
      <Note x={424} y={440} r={2}>{L('the price list is\nthe first thing you read', 'cennik to pierwsze,\nco czytasz')}</Note>
      <Note x={444} y={660} r={-2}>{L('booking sends you\noff to another site', 'rezerwacja wyrzuca cię\nna inną stronę')}</Note>
    </div>
  );
}
