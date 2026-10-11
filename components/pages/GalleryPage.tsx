'use client';

import { useState } from 'react';
import Shell from '@/components/Shell';
import Lightbox from '@/components/Lightbox';
import { PageHero } from '@/components/ui';
import { COL_OFFSETS, toColumns, useColumns } from '@/components/useColumns';
import { GALLERY, type GalleryCat } from '@/content/gallery';
import { img } from '@/lib/img';
import { num, useLang } from '@/lib/lang';

type Filter = GalleryCat | 'all';

const C = {
  en: {
    hero: { k: 'Gallery', lines: ['Moments &', 'portraits.'], lede: 'In the field with communities, portraits through the years, and travels abroad.' },
    filters: [['all', 'All'], ['personal', 'Portraits'], ['field', 'In the field'], ['travels', 'Travels']] as [Filter, string][],
    tags: { personal: 'Portrait', field: 'In the field', travels: 'Travels' },
    count: (n: number) => n + (n === 1 ? ' photo' : ' photos'),
    filterLabel: 'Filter photos',
  },
  ne: {
    hero: { k: 'तस्बिर', lines: ['क्षण र', 'पोर्ट्रेट।'], lede: 'समुदायसँग मैदानमा, वर्षौंका पोर्ट्रेट, र विदेश यात्रा।' },
    filters: [['all', 'सबै'], ['personal', 'पोर्ट्रेट'], ['field', 'मैदानमा'], ['travels', 'यात्रा']] as [Filter, string][],
    tags: { personal: 'पोर्ट्रेट', field: 'मैदानमा', travels: 'यात्रा' },
    count: (n: number) => num(n, 'ne') + ' तस्बिर',
    filterLabel: 'तस्बिर छान्नुहोस्',
  },
};

export default function GalleryPage() {
  const { lang } = useLang();
  const t = C[lang];
  const nc = useColumns();
  const [f, setF] = useState<Filter>('all');
  const [open, setOpen] = useState(-1);

  const items = GALLERY.filter((g) => f === 'all' || g.cat === f).map((g) => ({
    src: img(g.src), thumb: img(g.src, 'md'), ar: g.ar, cap: lang === 'ne' ? g.ne : g.en, sub: t.tags[g.cat], pos: g.pos || '50% 40%',
  }));

  return (
    <Shell page="gallery" deps={[f, nc]}>
      <PageHero kicker={t.hero.k} lines={t.hero.lines} lede={t.hero.lede} />

      <section className="wrap" style={{ paddingTop: 'clamp(48px,8vh,96px)', paddingBottom: 'clamp(120px,18vh,220px)' }}>
        <div style={{ position: 'sticky', top: 'var(--hh, 66px)', zIndex: 5, background: 'var(--color-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '14px 0', borderBottom: '2px solid var(--color-text)' }}>
          <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <div className="seg" role="radiogroup" aria-label={t.filterLabel}>
              {t.filters.map(([k, label]) => (
                <label key={k} className="seg-opt"><input type="radio" name="gl-filter" checked={f === k} onChange={() => { setF(k); setOpen(-1); }} />{label}</label>
              ))}
            </div>
          </div>
          <span className="tnum" style={{ fontSize: 13, fontWeight: 800 }} aria-live="polite">{t.count(items.length)}</span>
        </div>
        <div className="masonry">
          {toColumns(items, nc).map((col, c) => (
            <div key={c + f} className="masonry__col" style={{ paddingTop: nc === 1 ? 0 : COL_OFFSETS[c] }}>
              {col.map(({ x, i }) => (
                <button key={x.src} type="button" data-reveal="0" className="tile" onClick={() => setOpen(i)}>
                  <span className="tile__img" style={{ aspectRatio: x.ar }}><img src={x.thumb} alt={x.cap} loading="lazy" style={{ objectPosition: x.pos }} /></span>
                  <span className="tile__cap"><span>{x.cap}</span><span style={{ color: 'var(--color-accent-700)', fontWeight: 600, whiteSpace: 'nowrap' }}>{x.sub}</span></span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {open >= 0 && <Lightbox items={items} index={open} onChange={setOpen} onClose={() => setOpen(-1)} />}
    </Shell>
  );
}
