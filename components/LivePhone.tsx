'use client';
import { useEffect, useRef, useState } from 'react';

/** the real site in a 390px-wide iframe, scaled to fit the phone screen */
export default function LivePhone({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setK(el.clientWidth / 390));
    ro.observe(el);
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setLoad(true); io.disconnect(); } }, { rootMargin: '400px' });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);
  return (
    <div className="cs-screen" ref={ref}>
      <img src={poster} alt="" />
      {load && k > 0 && (
        <iframe src={src} title={title} style={{ width: 390, height: (ref.current?.clientHeight ?? 0) / k, transform: `scale(${k})` }} />
      )}
    </div>
  );
}
