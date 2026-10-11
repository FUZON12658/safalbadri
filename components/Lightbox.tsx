'use client';

import { useEffect, useRef } from 'react';
import { pad, useLang } from '@/lib/lang';
import { ArrowLeft, ArrowRight, Close } from './icons';

export type LightboxItem = { src: string; cap: string; sub?: string; paper?: boolean };

type Props = { items: LightboxItem[]; index: number; onChange: (i: number) => void; onClose: () => void };

const T = {
  en: { close: 'Close', prev: 'Previous', next: 'Next', label: 'Image viewer' },
  ne: { close: 'बन्द', prev: 'अघिल्लो', next: 'अर्को', label: 'तस्बिर दर्शक' },
};

export default function Lightbox({ items, index, onChange, onClose }: Props) {
  const { lang } = useLang();
  const t = T[lang];
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = items.length;
  const item = items[index];
  const step = (d: number) => onChange((index + d + n) % n);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = prev;
      opener?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!item) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={t.label} className="lightbox" onClick={onClose}>
      <div className="lightbox__bar">
        <span className="tnum" style={{ fontSize: 13, fontWeight: 800 }}>{pad(index + 1, lang)} / {pad(n, lang)}</span>
        <button ref={closeRef} type="button" className="btn btn-icon" aria-label={t.close} onClick={onClose}><Close /></button>
      </div>
      <div className="lightbox__stage">
        <img src={item.src} alt={item.cap} onClick={(e) => e.stopPropagation()} style={item.paper ? { background: 'var(--color-bg)' } : undefined} />
      </div>
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="stack" style={{ gap: 2 }}>
          <span style={{ fontWeight: 800, fontSize: 18 }}>{item.cap}</span>
          {item.sub && <span style={{ fontSize: 13, color: 'color-mix(in srgb,var(--color-bg) 70%,transparent)' }}>{item.sub}</span>}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn-icon" aria-label={t.prev} onClick={() => step(-1)}><ArrowLeft size={20} /></button>
          <button type="button" className="btn btn-icon" aria-label={t.next} onClick={() => step(1)}><ArrowRight size={20} /></button>
        </div>
      </div>
    </div>
  );
}
