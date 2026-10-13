'use client';

import Link from 'next/link';
import Shell from '@/components/Shell';
import { Kicker, PageHero } from '@/components/ui';
import { ArrowRight } from '@/components/icons';
import { img } from '@/lib/img';
import { pad, useLang } from '@/lib/lang';

const C = {
  en: {
    hero: { k: 'Press & honours', lines: ['In the', 'news.'], lede: 'Coverage of my work in Nepali newspapers, and the letters and honours received for journalism and community service.' },
    clipK: 'Coverage & letters', clipHint: 'Nepali newspapers and official letters',
    caps: [['Janaprahar', 'Newspaper coverage'], ['Nepal Samacharpatra', 'Newspaper coverage'], ['Mahanagar', 'Newspaper coverage'], ['Piskar project coverage', 'Newspaper article'], ['Praramva coverage', 'Newspaper article'], ['Sanjibani Patra', 'Newspaper coverage'], ['Armed Police Force Family Women’s Association', 'Letter of appreciation'], ['Nepal Police Headquarters', 'Letter of appreciation']],
    hon: {
      k: 'Honours', title: 'Recognition received.', body: 'Letters, certificates and honours for journalism and community service.', th1: 'Honour', th2: 'From', fig: 'Felicitated at the Federation of Nepali Journalists, Kavre',
      rows: [['Letter of appreciation', 'Armed Police Force Family Women’s Association'], ['Letter of appreciation', 'Nepal Police Headquarters'], ['Respect paper', 'ANFTU'], ['Respect paper', 'Valaswar'], ['Certificates of recognition', 'Nepal Press Union'], ['Guest of Honour', 'Community programmes'], ['ICT respect paper', 'ICT sector']],
    },
    lead: {
      k: 'Leadership', title: 'Standing up for working journalists.',
      items: [
        { t: 'Federation of Nepali Journalists, Kavre', b: 'As Past President I led the district’s working journalists and helped deliver lasting gains for regional media.' },
        { t: 'A home for the federation', b: 'I helped build the FNJ Kavre chapter building and protected the organisation’s independence.' },
        { t: 'Press freedom', b: 'I advocate for freedom of expression and a free press, and use mainstream and digital media to carry ordinary citizens’ voices.' },
      ],
    },
    kit: { t: 'Writing about me or need a photo?', cta: 'Request a press kit' },
  },
  ne: {
    hero: { k: 'प्रेस र सम्मान', lines: ['समाचारमा', 'मेरो काम।'], lede: 'नेपाली पत्रपत्रिकाले समेटेका मेरा काम, र पत्रकारिता तथा सामुदायिक सेवाका लागि प्राप्त पत्र र सम्मान।' },
    clipK: 'समाचार र पत्रहरू', clipHint: 'नेपाली पत्रपत्रिका र आधिकारिक पत्र',
    caps: [['जनप्रहार', 'समाचार'], ['नेपाल समाचारपत्र', 'समाचार'], ['महानगर', 'समाचार'], ['पिस्कर परियोजनाको समाचार', 'पत्रिकामा लेख'], ['प्रारम्भको समाचार', 'पत्रिकामा लेख'], ['सञ्जीवनी पत्र', 'समाचार'], ['सशस्त्र प्रहरी बल परिवार महिला संघ', 'प्रशंसा पत्र'], ['नेपाल प्रहरी प्रधान कार्यालय', 'कदर पत्र']],
    hon: {
      k: 'सम्मान', title: 'प्राप्त सम्मान।', body: 'पत्रकारिता र सामुदायिक सेवाका लागि प्राप्त पत्र, प्रमाणपत्र र सम्मान।', th1: 'सम्मान', th2: 'प्रदायक', fig: 'नेपाल पत्रकार महासंघ, काभ्रेमा सम्मानित',
      rows: [['प्रशंसा पत्र', 'सशस्त्र प्रहरी बल परिवार महिला संघ'], ['कदर पत्र', 'नेपाल प्रहरी प्रधान कार्यालय'], ['सम्मान पत्र', 'ANFTU'], ['सम्मान पत्र', 'Valaswar'], ['सम्मान प्रमाणपत्र', 'नेपाल प्रेस युनियन'], ['सम्मानित अतिथि', 'सामुदायिक कार्यक्रम'], ['आईसीटी सम्मान पत्र', 'आईसीटी क्षेत्र']],
    },
    lead: {
      k: 'नेतृत्व', title: 'श्रमजीवी पत्रकारको पक्षमा।',
      items: [
        { t: 'नेपाल पत्रकार महासंघ, काभ्रे', b: 'पूर्व अध्यक्षका रूपमा जिल्लाका श्रमजीवी पत्रकारको नेतृत्व गर्दै क्षेत्रीय मिडियामा दिगो उपलब्धिमा योगदान दिएँ।' },
        { t: 'महासंघको आफ्नै घर', b: 'महासंघ काभ्रेको भवन निर्माणमा सहयोग गरेँ र संस्थाको स्वायत्तता जोगाएँ।' },
        { t: 'प्रेस स्वतन्त्रता', b: 'अभिव्यक्ति र प्रेस स्वतन्त्रताको पक्षमा उभिँदै मूलधार र डिजिटल मिडियामार्फत आम नागरिकको आवाज बोक्छु।' },
      ],
    },
    kit: { t: 'मबारे लेख्दै हुनुहुन्छ वा तस्बिर चाहियो?', cta: 'प्रेस किट माग्नुहोस्' },
  },
};

export default function PressPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);

  return (
    <Shell page="press">
      <PageHero kicker={t.hero.k} lines={t.hero.lines} lede={t.hero.lede} />

      <section className="wrap" style={{ paddingTop: 'clamp(56px,9vh,112px)', paddingBottom: 'clamp(120px,18vh,220px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', paddingBottom: 16, borderBottom: '2px solid var(--color-text)' }}>
          <span className="label">{t.clipK}</span>
          <span className="muted" style={{ fontSize: 13 }}>{t.clipHint}</span>
        </div>
        <div className="stack">
          {t.caps.map(([pub, topic], i) => (
            <div key={i} data-reveal="0" className="bb" style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1.1fr) minmax(0,1fr)', gap: '8px 20px', alignItems: 'baseline', padding: 'clamp(18px,2.4vw,28px) 0' }}>
              <span className="num">{p(i + 1)}</span>
              <span className="hl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(22px,2.4vw,38px) * var(--h-c))', letterSpacing: '-.025em' }}>{pub}</span>
              <span style={{ fontSize: 16, lineHeight: 1.5, color: 'color-mix(in srgb,var(--color-text) 78%,transparent)' }}>{topic}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="on-ink">
        <div className="wrap grid-split grid-split--380" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)', gap: '40px clamp(32px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 20 }}>
            <Kicker>{t.hon.k}</Kicker>
            <h2 className="headline" style={{ fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--h-b))' }}>{t.hon.title}</h2>
            <p style={{ maxWidth: '38ch', fontSize: 17, color: 'color-mix(in srgb,var(--color-bg) 78%,transparent)' }}>{t.hon.body}</p>
            <figure className="stack" style={{ gap: 10, marginTop: 16, maxWidth: 380 }}>
              <div className="media" style={{ aspectRatio: '4/5' }}><img data-parallax="-0.06" className="px-sm" src={img('badri/fnj-kavre', 'md')} alt={t.hon.fig} loading="lazy" style={{ objectPosition: '50% 40%' }} /></div>
              <figcaption style={{ fontSize: 13, color: 'color-mix(in srgb,var(--color-bg) 70%,transparent)' }}>{t.hon.fig}</figcaption>
            </figure>
          </div>
          <div role="table" className="stack">
            <div role="row" style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) minmax(0,1fr)', gap: 16, padding: '0 0 12px', borderBottom: '2px solid color-mix(in srgb,var(--color-bg) 40%,transparent)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, color: 'color-mix(in srgb,var(--color-bg) 70%,transparent)' }}>
              <span role="columnheader" /><span role="columnheader">{t.hon.th1}</span><span role="columnheader">{t.hon.th2}</span>
            </div>
            {t.hon.rows.map((h, i) => (
              <div key={i} role="row" data-reveal={i} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) minmax(0,1fr)', gap: 16, padding: '18px 0', borderBottom: '1px solid color-mix(in srgb,var(--color-bg) 22%,transparent)', fontSize: 16 }}>
                <span role="cell" className="num" style={{ fontSize: 16 }}>{p(i + 1)}</span>
                <span role="cell" style={{ fontWeight: 800, fontSize: 18 }}>{h[0]}</span>
                <span role="cell" style={{ color: 'color-mix(in srgb,var(--color-bg) 75%,transparent)' }}>{h[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <Kicker>{t.lead.k}</Kicker>
        <h2 className="headline" style={{ marginTop: 24, marginLeft: '-.04em', fontSize: 'calc(clamp(34px,4.2vw,72px) * var(--h-b))', letterSpacing: '-.035em', maxWidth: '16em' }}>{t.lead.title}</h2>
        <div className="cells cols-3x" style={{ marginTop: 'clamp(40px,7vh,80px)' }}>
          {t.lead.items.map((ld, i) => (
            <div key={i} style={{ padding: '28px 24px 36px' }}>
              <div data-reveal={i} className="stack" style={{ gap: 14, minHeight: 200 }}>
                <span className="num">{p(i + 1)}</span>
                <h3 className="hl" style={{ fontSize: 'clamp(20px,1.7vw,26px)' }}>{ld.t}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'color-mix(in srgb,var(--color-text) 82%,transparent)', textWrap: 'pretty' }}>{ld.b}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'clamp(48px,8vh,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', padding: '24px 0', borderTop: '2px solid var(--color-text)', borderBottom: '2px solid var(--color-text)' }}>
          <span style={{ fontWeight: 800, fontSize: 'clamp(22px,2vw,30px)', letterSpacing: '-.02em' }}>{t.kit.t}</span>
          <Link href="/contact?topic=media" className="btn btn-primary">{t.kit.cta}<ArrowRight /></Link>
        </div>
      </section>

    </Shell>
  );
}
