'use client';
import '@fontsource/comic-neue/700.css';
import '@fontsource/tinos/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const R: [string, string][] = [
  ['has opinions about your font. good ones.', 'ma zdanie o twoim foncie. dobre.'],
  ['will tell you your logo is ugly. nicely.', 'powie ci, że logo jest brzydkie. ładnie.'],
  ['replies faster than your ex', 'odpisuje szybciej niż twój ex'],
  ['has never once said "make the logo bigger"', 'ani razu nie powiedziała „zróbmy większe logo”'],
  ['her figma file is cleaner than your apartment', 'jej plik w figmie jest czystszy niż twoje mieszkanie'],
  ['can spot comic sans from three tables away', 'wypatrzy comic sansa z drugiego końca sali'],
  ['never used papyrus. not even ironically.', 'nigdy nie użyła papyrusa. nawet ironicznie.'],
  ['your competitor will get nervous', 'twoja konkurencja zacznie się denerwować'],
  ['your mom will finally get what you do', 'twoja mama w końcu zrozumie, czym się zajmujesz'],
  ['"something clean and minimal"? no. something you remember.', '„coś czystego i minimalistycznego”? nie. coś, co zapamiętasz.'],
  ['reason 47: she wrote this list herself', 'powód 47: sama napisała tę listę'],
];

export default function NotFound() {
  const [pl, setPl] = useState(false);
  const [fixed, setFixed] = useState(false);
  useEffect(() => { setPl(location.pathname.startsWith('/pl')); }, []);
  const L = (en: string, p: string) => (pl ? p : en);
  const home = pl ? '/pl/' : '/';
  const fix = () => { setFixed(true); setTimeout(() => { location.href = home; }, 700); };
  return (
    <main className={'nf' + (fixed ? ' fixed' : '')}>
      <div className="nf-banner">
        ⚠ {L('missing fonts: 1', 'brakujące fonty: 1')}
        <span>{L('this page wanted "bodoni moda italic". it got comic sans.', 'ta strona chciała "bodoni moda italic". dostała comic sansa.')}</span>
        <button onClick={fix}>{L('replace with something better →', 'zamień na coś lepszego →')}</button>
      </div>
      <aside className="nf-side">
        <h2>{L('layers', 'warstwy')}</h2>
        <div className="nf-search">🔍 {L('reasons not to hire karina', 'powody, żeby nie zatrudniać kariny')}</div>
        <small>{L('0 results', '0 wyników')}</small>
        <small style={{ margin: '0 0 8px' }}>{L('try instead:', 'spróbuj:')}</small>
        <div className="nf-search pink">🔍 {L('reasons to hire karina', 'powody, żeby zatrudnić karinę')}</div>
        <small style={{ color: '#ff4fa0' }}>{L('47 results', '47 wyników')}</small>
        <ul>{R.map((r, i) => <li key={i}><i>▫</i>{pl ? r[1] : r[0]}</li>)}</ul>
      </aside>
      <section className="nf-main">
        <div className="nf-404">404<span className="sel" aria-hidden><i style={{ left: 0, top: 0 }} /><i style={{ left: '100%', top: 0 }} /><i style={{ left: 0, top: '100%' }} /><i style={{ left: '100%', top: '100%' }} /></span><em>font: comic sans · missing: bodoni</em></div>
        <h1>{L('error 404: reason not to hire karina not found.', 'błąd 404: nie znaleziono powodu, żeby nie zatrudnić kariny.')}</h1>
        <p className="cn">{L("the page you were looking for isn't here. the font isn't either.", 'strony, której szukasz, tu nie ma. fontu też nie.')}</p>
        <div className="nf-btns">
          <button onClick={fix}>{L('replace with something better →', 'zamień na coś lepszego →')}</button>
          <Link href={home + '#work'}>{L('back to the canvas', 'wróć do projektów')}</Link>
        </div>
      </section>
    </main>
  );
}
