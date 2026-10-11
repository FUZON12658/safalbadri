'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { pad, useLang } from '@/lib/lang';
import { img } from '@/lib/img';
import { CONTACT, PAGES, type PageKey } from '@/content/site';
import { Close } from './icons';

const T = {
  en: { brand: 'Badri Raj Timalsina', sub: 'Journalist · Entrepreneur', cta: 'Get in touch', menu: 'Menu', openMenu: 'Open menu', close: 'Close menu', more: 'More', langLabel: 'Language' },
  ne: { brand: 'बद्रिराज तिमल्सिना', sub: 'पत्रकार · उद्यमी', cta: 'सम्पर्क गर्नुहोस्', menu: 'मेनु', openMenu: 'मेनु खोल्नुहोस्', close: 'मेनु बन्द गर्नुहोस्', more: 'थप', langLabel: 'भाषा' },
};

// The menu shows the five main pages large, and the rest as a quieter row underneath.
const PRIMARY = PAGES.slice(0, 5);
const SECONDARY = PAGES.slice(5);

export default function SiteHeader({ page }: { page: PageKey | null }) {
  const { lang, setLang } = useLang();
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const cur = Math.max(0, PAGES.findIndex((p) => p.key === page));
  const hv = hover >= 0 ? hover : cur;
  const label = (p: (typeof PAGES)[number]) => (lang === 'ne' ? p.ne : p.en);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      menuBtn.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const brand = (
    <Link href="/" className="brand" onClick={() => setOpen(false)} tabIndex={open ? 0 : undefined}>
      <span className="brand__mark" />
      <span className="brand__text">
        <span className="brand__name">{t.brand}</span>
        <span className="brand__sub">{t.sub}</span>
      </span>
    </Link>
  );

  const tab = open ? 0 : -1;

  return (
    <div className="hdr-wrap">
      <header data-header="1" className="hdr">
        {brand}
        <div className="hdr__right">
          <div className="seg" role="radiogroup" aria-label={t.langLabel}>
            <label className="seg-opt"><input type="radio" name="brt-lang" checked={lang === 'en'} onChange={() => setLang('en')} />EN</label>
            <label className="seg-opt" lang="ne"><input type="radio" name="brt-lang" checked={lang === 'ne'} onChange={() => setLang('ne')} />नेपाली</label>
          </div>
          {page !== 'contact' && <Link href="/contact" className="hdr__cta">{t.cta}</Link>}
          <button ref={menuBtn} type="button" className="menu-btn" onClick={() => { setHover(-1); setOpen(true); }} aria-label={t.openMenu} aria-expanded={open} aria-controls="site-menu">
            <span className="menu-btn__label">{t.menu}</span>
            <span className="menu-btn__icon" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <div data-progress="1" className="hdr__progress" />
      </header>

      <div id="site-menu" role="dialog" aria-modal="true" aria-label={t.menu} aria-hidden={!open} className={'menu' + (open ? ' is-open' : '')}>
        <div className="menu__bar">
          {brand}
          <button ref={closeBtn} type="button" className="menu__close" onClick={() => setOpen(false)} aria-label={t.close} tabIndex={tab}>
            <Close size={24} />
          </button>
        </div>

        <div className="menu__body">
          <div className="menu__aside" aria-hidden="true">
            {PAGES.map((p, i) => (
              <img key={p.key} src={img(p.img, 'md')} alt="" loading="lazy" style={{ opacity: i === hv ? 1 : 0, transform: i === hv ? 'scale(1)' : 'scale(1.06)', objectPosition: '50% 30%' }} />
            ))}
            <div className="menu__aside-cap">
              <span className="menu__aside-k">{pad(hv + 1, lang)} — {label(PAGES[hv])}</span>
              <span className="menu__aside-d">{lang === 'ne' ? PAGES[hv].descNe : PAGES[hv].descEn}</span>
            </div>
          </div>

          <div className="menu__main" onMouseLeave={() => setHover(-1)}>
            <nav aria-label={lang === 'ne' ? 'सबै पृष्ठ' : 'All pages'} className="menu__nav">
              <ul className="menu__primary">
                {PRIMARY.map((p, i) => {
                  const on = p.key === page;
                  return (
                    <li key={p.key} style={{ ['--d' as string]: open ? (0.22 + i * 0.05).toFixed(2) + 's' : '0s' }}>
                      <Link href={p.href} className={'menu__link' + (on ? ' is-current' : '')} aria-current={on ? 'page' : undefined} tabIndex={tab}
                        onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setOpen(false)}>
                        <span className="menu__num">{pad(i + 1, lang)}</span>
                        <span className="menu__label">{label(p)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="menu__more" style={{ ['--d' as string]: open ? '0.5s' : '0s' }}>
                <span className="menu__more-k">{t.more}</span>
                <ul>
                  {SECONDARY.map((p, j) => {
                    const i = j + PRIMARY.length, on = p.key === page;
                    return (
                      <li key={p.key}>
                        <Link href={p.href} className={'menu__sub' + (on ? ' is-current' : '')} aria-current={on ? 'page' : undefined} tabIndex={tab}
                          onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setOpen(false)}>
                          {label(p)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
            <div className="menu__foot">
              <div className="menu__contacts">
                <a href={`mailto:${CONTACT.email}`} tabIndex={tab}>{CONTACT.email}</a>
                <a href={`tel:${CONTACT.tel}`} tabIndex={tab}>{CONTACT.phone}</a>
              </div>
              <div className="lang-toggle" role="group" aria-label={t.langLabel}>
                <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} tabIndex={tab}>EN</button>
                <button type="button" aria-pressed={lang === 'ne'} onClick={() => setLang('ne')} tabIndex={tab} lang="ne">नेपाली</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
