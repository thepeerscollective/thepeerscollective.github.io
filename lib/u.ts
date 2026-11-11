import type { CSSProperties } from 'react';

/** figma px → scaled css length (desktop stage, 1440 wide) */
export const u = (n: number) => `calc(var(--u) * ${n})`;
/** figma px → scaled css length (mobile stage, 390 wide) */
export const m = (n: number) => `calc(var(--m) * ${n})`;

export const at = (x: number, y: number, w?: number, h?: number, f = u): CSSProperties => ({
  left: f(x),
  top: f(y),
  ...(w !== undefined ? { width: f(w) } : {}),
  ...(h !== undefined ? { height: f(h) } : {}),
});

export const font = (size: number, f = u): CSSProperties => ({ fontSize: f(size) });
