'use client';

import { useState, type FormEvent } from 'react';
import Shell from '@/components/Shell';
import { Kicker, PageHero } from '@/components/ui';
import { ArrowUpRight } from '@/components/icons';
import { COLUMNS, type Column } from '@/content/journal';
import { CONTACT } from '@/content/site';
import { img } from '@/lib/img';
import { num, pad, useLang } from '@/lib/lang';

type Theme = Column['theme'];

const C = {
  en: {
    hero: { k: 'Journal', lines: ['Notes &', 'columns.'], lede: 'I write about society, media and the economy: what I see in my reporting and in my work across Nepal, in Nepali and in English.' },
    filters: [['all', 'All'], ['media', 'Media'], ['society', 'Society'], ['economy', 'Economy']] as [Theme | 'all', string][],
    count: (n: number) => n + (n === 1 ? ' column' : ' columns'),
    themes: { media: 'Media', society: 'Society', economy: 'Economy' },
    read: 'Read the column',
    topicsK: 'What I write about',
    topics: [
      { k: 'media' as Theme, t: 'Media', d: 'Press freedom, the economics of local newsrooms, and what it takes to keep district journalism alive.' },
      { k: 'society' as Theme, t: 'Society', d: 'Youth migration, education and the communities I meet through Praramva’s work in the field.' },
      { k: 'economy' as Theme, t: 'Economy', d: 'Jobs at home, small enterprise and the case for building a career in Nepal rather than abroad.' },
    ],
    archive: { t: 'The column archive is being prepared.', b: 'Until it is online here, my day-to-day reporting and commentary appear on Lahachhap.com, the news platform I lead.', cta: 'Read Lahachhap.com' },
    pod: { tag: 'Podcast · coming soon', title: 'A podcast connecting Nepalis at home and abroad.', body: 'Realistic analysis, a positive mindset and the lessons life has taught me. Conversations for the next generation, and for Nepalis abroad who are thinking about coming home.', ph: 'Your email', label: 'Email address', cta: 'Notify me', done: 'Thank you. Your email app should have opened; send the message and you will hear from me when the first episode is out.', alt: 'Badri Raj Timalsina at the microphone', subj: 'Podcast: notify me' },
  },
  ne: {
    hero: { k: 'लेखन', lines: ['टिप्पणी र', 'स्तम्भ।'], lede: 'समाज, मिडिया र अर्थतन्त्रबारे म लेख्छु: रिपोर्टिङ र नेपालभरको कामका क्रममा देखेका कुरा, नेपाली र अंग्रेजी दुवैमा।' },
    filters: [['all', 'सबै'], ['media', 'मिडिया'], ['society', 'समाज'], ['economy', 'अर्थतन्त्र']] as [Theme | 'all', string][],
    count: (n: number) => num(n, 'ne') + ' स्तम्भ',
    themes: { media: 'मिडिया', society: 'समाज', economy: 'अर्थतन्त्र' },
    read: 'स्तम्भ पढ्नुहोस्',
    topicsK: 'म केबारे लेख्छु',
    topics: [
      { k: 'media' as Theme, t: 'मिडिया', d: 'प्रेस स्वतन्त्रता, स्थानीय न्युजरुमको अर्थशास्त्र, र जिल्लाको पत्रकारिता जीवित राख्न के चाहिन्छ।' },
      { k: 'society' as Theme, t: 'समाज', d: 'युवा पलायन, शिक्षा, र प्रारम्भको फिल्ड कामका क्रममा भेटिएका समुदाय।' },
      { k: 'economy' as Theme, t: 'अर्थतन्त्र', d: 'स्वदेशमै रोजगारी, साना उद्यम, र विदेश होइन नेपालमै करियर बनाउने तर्क।' },
    ],
    archive: { t: 'स्तम्भ संग्रह तयार हुँदैछ।', b: 'यहाँ उपलब्ध नहुँदासम्म मेरा दैनिक रिपोर्टिङ र टिप्पणी मैले नेतृत्व गरेको समाचार मञ्च Lahachhap.com मा पढ्न सकिन्छ।', cta: 'Lahachhap.com पढ्नुहोस्' },
    pod: { tag: 'पडकास्ट · चाँडै आउँदै', title: 'स्वदेश र विदेशका नेपालीलाई जोड्ने पडकास्ट।', body: 'यथार्थपरक विश्लेषण, सकारात्मक सोच र जीवनले सिकाएका पाठ। नयाँ पुस्ता र स्वदेश फर्कने सोचमा रहेका विदेशका नेपालीहरूका लागि संवाद।', ph: 'तपाईंको इमेल', label: 'इमेल ठेगाना', cta: 'मलाई जानकारी दिनुहोस्', done: 'धन्यवाद। तपाईंको इमेल एप खुलेको हुनुपर्छ; सन्देश पठाउनुहोस्, पहिलो एपिसोड आएपछि म जानकारी दिनेछु।', alt: 'माइक्रोफोनअगाडि बद्रिराज तिमल्सिना', subj: 'पडकास्ट: जानकारी चाहियो' },
  },
};

function fmtDate(d: string, lang: 'en' | 'ne') {
  const s = new Date(d + 'T00:00:00').toLocaleDateString(lang === 'ne' ? 'ne-NP' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return s;
}

export default function JournalPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);
  const [f, setF] = useState<Theme | 'all'>('all');
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const posts = [...COLUMNS].sort((a, b) => b.date.localeCompare(a.date)).filter((c) => f === 'all' || c.theme === f);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t.pod.subj)}&body=${encodeURIComponent(email)}`;
    setSubbed(true);
  };

  return (
    <Shell page="journal" deps={[f]}>
      <PageHero kicker={t.hero.k} lines={t.hero.lines} lede={t.hero.lede} />

      {COLUMNS.length > 0 ? (
        <section className="wrap" style={{ paddingTop: 'clamp(56px,9vh,112px)', paddingBottom: 'clamp(80px,12vh,160px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingBottom: 16, borderBottom: '2px solid var(--color-text)' }}>
            <div className="seg" role="radiogroup" aria-label="Filter">
              {t.filters.map(([k, label]) => (
                <label key={k} className="seg-opt"><input type="radio" name="jr-filter" checked={f === k} onChange={() => setF(k)} />{label}</label>
              ))}
            </div>
            <span className="muted" style={{ fontSize: 13 }} aria-live="polite">{t.count(posts.length)}</span>
          </div>
          <div className="stack">
            {posts.map((c, j) => (
              <a key={c.href} href={c.href} target="_blank" rel="noopener" data-reveal="0" className="hover-row bb"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '20px clamp(24px,4vw,64px)', padding: 'clamp(24px,3vw,40px) 0', alignItems: 'center', color: 'var(--color-text)', textDecoration: 'none' }}>
                <div className="stack" style={{ gap: 14, minWidth: 0 }}>
                  <div className="label" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="tnum" style={{ color: 'var(--color-accent-700)' }}>{p(j + 1)}</span>
                    <span>{t.themes[c.theme]}</span>
                    <span className="muted">{fmtDate(c.date, lang)}</span>
                    <span className="tag tag-outline" lang={c.lang}>{c.lang === 'ne' ? 'नेपाली' : 'EN'}</span>
                  </div>
                  <h2 className="hl" lang={c.lang} style={{ fontSize: 'calc(clamp(26px,3vw,48px) * var(--hs))', letterSpacing: '-.03em' }}>{c.title}</h2>
                  <p lang={c.lang} style={{ fontSize: 16, lineHeight: 1.55, maxWidth: '52ch', color: 'color-mix(in srgb,var(--color-text) 75%,transparent)' }}>{c.standfirst}</p>
                  <span className="label" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-accent-700)' }}>{t.read}<ArrowUpRight /></span>
                </div>
                <div className="media" style={{ aspectRatio: '16/9' }}>
                  <img src={img(c.image || 'badri/portrait-red-tie', 'md')} alt="" loading="lazy" style={{ objectPosition: '50% 30%' }} />
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : (
        <section className="wrap" style={{ paddingTop: 'clamp(56px,9vh,112px)', paddingBottom: 'clamp(80px,12vh,160px)' }}>
          <div className="label" style={{ paddingBottom: 16, borderBottom: '2px solid var(--color-text)' }}>{t.topicsK}</div>
          <div className="cells cols-300" style={{ borderTop: 0 }}>
            {t.topics.map((x, i) => (
              <div key={x.k} style={{ padding: '28px 24px 36px' }}>
                <div data-reveal={i} className="stack" style={{ gap: 16, minHeight: 220 }}>
                  <span className="num">{p(i + 1)}</span>
                  <h2 className="display" style={{ fontSize: 'calc(clamp(40px,4.4vw,72px) * var(--hs))' }}>{x.t}</h2>
                  <p style={{ marginTop: 'auto', fontSize: 16, lineHeight: 1.6, maxWidth: '36ch', color: 'color-mix(in srgb,var(--color-text) 82%,transparent)' }}>{x.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(40px,7vh,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: '24px clamp(32px,6vw,112px)', alignItems: 'end', padding: '28px 0', borderBottom: '2px solid var(--color-divider)' }}>
            <div className="stack" style={{ gap: 12 }}>
              <h2 className="hl" style={{ fontSize: 'calc(clamp(26px,2.6vw,42px) * var(--hs))', letterSpacing: '-.025em' }}>{t.archive.t}</h2>
              <p className="body-md">{t.archive.b}</p>
            </div>
            <a href="https://www.lahachhap.com" target="_blank" rel="noopener" className="btn btn-primary self-start" style={{ justifySelf: 'start' }}>{t.archive.cta}<ArrowUpRight /></a>
          </div>
        </section>
      )}

      <section id="podcast" className="wrap sec-bot">
        <div className="grid-split" style={{ gap: 0, borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
          <div className="media" style={{ minHeight: 'clamp(320px,40vw,560px)' }}>
            <img data-parallax="-0.1" className="px" src={img('badri/studio')} alt={t.pod.alt} loading="lazy" style={{ objectPosition: '50% 30%' }} />
          </div>
          <div className="stack" style={{ padding: 'clamp(28px,4vw,64px)', gap: 24, justifyContent: 'center' }}>
            <div className="label" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-accent-700)' }}>
              <span data-onair="1" style={{ width: 10, height: 10, background: 'var(--color-accent)', display: 'block' }} />{t.pod.tag}
            </div>
            <h2 className="hl" style={{ fontSize: 'calc(clamp(32px,3.8vw,64px) * var(--hs))', letterSpacing: '-.035em' }}>{t.pod.title}</h2>
            <p className="body-md">{t.pod.body}</p>
            {subbed ? (
              <p role="status" style={{ fontWeight: 800, color: 'var(--color-accent-700)', maxWidth: '44ch' }}>{t.pod.done}</p>
            ) : (
              <form onSubmit={subscribe} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 480 }}>
                <label className="sr-only" htmlFor="pod-email">{t.pod.label}</label>
                <input id="pod-email" className="input" type="email" required placeholder={t.pod.ph} value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: '1 1 220px', minWidth: 0 }} />
                <button type="submit" className="btn btn-primary">{t.pod.cta}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
