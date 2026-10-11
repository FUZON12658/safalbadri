'use client';

import Link from 'next/link';
import Shell from '@/components/Shell';
import { HeroLines, Kicker } from '@/components/ui';
import { ArrowRight } from '@/components/icons';
import { useLang } from '@/lib/lang';

const T = {
  en: { k: '404', lines: ['This page', 'is not here.'], body: 'The link may be old or mistyped. Everything else is one step away.', home: 'Back to the home page', contact: 'Get in touch' },
  ne: { k: '४०४', lines: ['यो पृष्ठ', 'यहाँ छैन।'], body: 'लिंक पुरानो वा गलत हुन सक्छ। बाँकी सबै एक कदम टाढा छ।', home: 'गृहपृष्ठमा फर्कनुहोस्', contact: 'सम्पर्क गर्नुहोस्' },
};

export default function NotFoundPage() {
  const { lang } = useLang();
  const t = T[lang];
  return (
    <Shell page={null} banner={false}>
      <section id="top" className="wrap not-found" style={{ paddingTop: 'calc(var(--hh, 66px) + 48px)', paddingBottom: 80 }}>
        <Kicker>{t.k}</Kicker>
        <HeroLines lines={t.lines} style={{ fontSize: 'calc(clamp(52px,10vw,180px) * var(--hs))' }} />
        <p className="lede">{t.body}</p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary">{t.home}<ArrowRight /></Link>
          <Link href="/contact" className="btn btn-secondary">{t.contact}</Link>
        </div>
      </section>
    </Shell>
  );
}
