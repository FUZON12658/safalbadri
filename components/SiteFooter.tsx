'use client';

import Link from 'next/link';
import { useLang } from '@/lib/lang';
import { CONTACT, PAGES, SOCIALS } from '@/content/site';
import { ArrowRight, ArrowUpRight } from './icons';

const T = {
  en: {
    l1: 'Let’s work for Nepal,', l2: 'together.', lede: 'For media, speaking, partnerships or social initiatives.', write: 'Write to me',
    email: 'Email', phone: 'Phone', card: 'Contact card', save: 'Save to your phone',
    brand: 'Badri Raj Timalsina', tagline: 'Journalist, media entrepreneur, philanthropist and nation-building advocate.',
    navK: 'Pages', moreK: 'More', followK: 'Follow', loc: 'Kathmandu, Nepal', rights: '© 2026 Badri Raj Timalsina', top: 'Back to top',
  },
  ne: {
    l1: 'आउनुहोस्, नेपालका लागि', l2: 'सँगै काम गरौँ।', lede: 'मिडिया, वक्तृता, साझेदारी वा सामाजिक पहलका लागि।', write: 'मलाई लेख्नुहोस्',
    email: 'इमेल', phone: 'फोन', card: 'सम्पर्क कार्ड', save: 'फोनमा सेभ गर्नुहोस्',
    brand: 'बद्रिराज तिमल्सिना', tagline: 'पत्रकार, सञ्चार उद्यमी, परोपकारी अभियन्ता तथा राष्ट्र निर्माणका पक्षपाती।',
    navK: 'पृष्ठहरू', moreK: 'थप', followK: 'फलो गर्नुहोस्', loc: 'काठमाडौं, नेपाल', rights: '© २०२६ बद्रिराज तिमल्सिना', top: 'माथि फर्कनुहोस्',
  },
};

export function ContactCards() {
  const { lang } = useLang();
  const t = T[lang];
  const rows = [
    { label: t.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: t.phone, value: CONTACT.phone, href: `tel:${CONTACT.tel}` },
    { label: t.card, value: t.save, href: CONTACT.vcf, download: true },
  ];
  return (
    <div className="ftr-banner__cards">
      {rows.map((c) => (
        <a key={c.label} href={c.href} download={c.download ? 'badriraj-timalsina.vcf' : undefined} className="contact-card">
          <span className="contact-card__label">{c.label}<ArrowUpRight size={18} /></span>
          <span className="contact-card__value">{c.value}</span>
        </a>
      ))}
    </div>
  );
}

export default function SiteFooter({ banner = true }: { banner?: boolean }) {
  const { lang } = useLang();
  const t = T[lang];
  const label = (p: (typeof PAGES)[number]) => (lang === 'ne' ? p.ne : p.en);

  return (
    <>
      {banner && (
        <section className="on-accent" aria-label={t.write}>
          <div className="wrap stack" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(56px,9vh,100px)', gap: 'clamp(44px,7vh,88px)' }}>
            <h2 className="display" style={{ fontSize: 'calc(clamp(52px,10.4vw,200px) * var(--h-a))' }}>
              <span data-reveal="0" style={{ display: 'block' }}>{t.l1}</span>
              <span data-reveal="1" style={{ display: 'block' }}>{t.l2}</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
              <p style={{ fontSize: 'clamp(22px,2vw,30px)', fontWeight: 800, lineHeight: 1.3, maxWidth: '24ch' }}>{t.lede}</p>
              <Link href="/contact" className="btn btn-ghost-light" style={{ padding: '12px 18px', fontSize: 16, borderColor: 'var(--color-bg)' }}>{t.write}<ArrowRight /></Link>
            </div>
            <ContactCards />
          </div>
        </section>
      )}
      <footer className="wrap ftr">
        <div className="ftr__cols">
          <div className="ftr__col" style={{ gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 18 }}>{t.brand}</span>
            <span className="muted" style={{ maxWidth: '30ch' }}>{t.tagline}</span>
          </div>
          <div className="ftr__col">
            <span className="label muted">{t.navK}</span>
            {PAGES.slice(0, 5).map((p) => <Link key={p.key} href={p.href}>{label(p)}</Link>)}
          </div>
          <div className="ftr__col">
            <span className="label muted">{t.moreK}</span>
            {PAGES.slice(5).map((p) => <Link key={p.key} href={p.href}>{label(p)}</Link>)}
          </div>
          <div className="ftr__col">
            <span className="label muted">{t.followK}</span>
            {SOCIALS.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener">{s.label}</a>)}
          </div>
          <div className="ftr__col muted">
            <span>{t.loc}</span>
            <span>{t.rights}</span>
            <a href="#top" style={{ color: 'inherit' }}>{t.top} ↑</a>
          </div>
        </div>
        <div data-reveal="0" aria-hidden="true" className="ftr__big">{t.brand}</div>
      </footer>
    </>
  );
}
