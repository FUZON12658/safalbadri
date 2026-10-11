'use client';

import Shell from '@/components/Shell';
import { Kicker, Manifesto, HeroLines } from '@/components/ui';
import { ArrowUpRight } from '@/components/icons';
import { img } from '@/lib/img';
import { num, pad, useLang } from '@/lib/lang';

const C = {
  en: {
    hero: { k: 'Ventures', lines: ['Building in Nepal,', 'for Nepal.'], s1: 'People in steady monthly work', s2: 'Ventures across three fields', lede: 'Media, philanthropy and enterprise. Each one exists to create work and value at home.' },
    rows: [
      { group: 'Media', name: 'Lahachhap.com', role: 'Managing Director', meta: 'Digital news · Kathmandu', body: 'An independent online news portal that I lead from Kathmandu, covering politics, society and the economy.', link: 'lahachhap.com' },
      { group: 'Media', name: 'Best FM 88.1', role: 'Founder & Owner', meta: 'Radio · Banepa', body: 'A community-facing FM station in Banepa that I founded and own, run by a dedicated team, keeping local news and voices on air.', link: '' },
      { group: 'Philanthropy', name: 'Praramva', role: 'Project Director', meta: 'Since 2015 · Lalitpur', body: 'Our philanthropic organisation for education, health, skills and disaster relief, from Piskar to Chiwang.', link: 'praramva.org' },
      { group: 'Philanthropy', name: 'Singapore Red Cross', role: 'Life Member', meta: 'Since 2016', body: 'I oversee the society’s humanitarian and social-welfare schemes in Nepal.', link: '' },
      { group: 'Enterprise', name: 'Mike Restaurant & Bar', role: 'Director', meta: 'Hospitality · Lazimpat', body: 'A restaurant and bar in Lazimpat, Kathmandu, with a kitchen, a terrace and a team of local staff.', link: 'mikerestro.com' },
      { group: 'Enterprise', name: 'Guru Uniform Industry', role: 'Founder & Chairman', meta: 'Garment manufacturing', body: 'A garment business I founded and chair, making uniforms in Nepal, part of the same commitment to jobs at home.', link: '' },
    ],
    mike: { k: 'Mike Restaurant & Bar', title: 'Hospitality in Lazimpat.', body: 'Breakfasts, coffee and dinner on the terrace in Lazimpat. Hospitality is one more way to create steady jobs in Kathmandu.', alt: 'From the kitchen at Mike Restaurant & Bar' },
    principle: 'Every venture I run is measured the same way: does it create *honest* work, here at *home*?',
  },
  ne: {
    hero: { k: 'उद्यम', lines: ['नेपालमा,', 'नेपालका लागि।'], s1: 'जनाले स्थिर मासिक रोजगारी', s2: 'तीन क्षेत्रमा उद्यम', lede: 'सञ्चार, परोपकार र उद्यम। हरेकको उद्देश्य स्वदेशमै काम र मूल्य सिर्जना गर्नु हो।' },
    rows: [
      { group: 'सञ्चार', name: 'Lahachhap.com', role: 'प्रबन्ध निर्देशक', meta: 'डिजिटल समाचार · काठमाडौं', body: 'काठमाडौंबाट मैले नेतृत्व गरेको स्वतन्त्र अनलाइन समाचार पोर्टल, जसले राजनीति, समाज र अर्थतन्त्र समेट्छ।', link: 'lahachhap.com' },
      { group: 'सञ्चार', name: 'बेस्ट एफएम ८८.१', role: 'संस्थापक तथा सञ्चालक', meta: 'रेडियो · बनेपा', body: 'बनेपामा बेस्ट एफएम ८८.१ मेगाहर्जको स्थापना गरेँ, जुन अहिले समर्पित टोलीसँग सञ्चालनमा छ।', link: '' },
      { group: 'परोपकार', name: 'प्रारम्भ', role: 'परियोजना निर्देशक', meta: 'सन् २०१५ देखि · ललितपुर', body: 'शिक्षा, स्वास्थ्य, सीप र विपद् राहतका लागि हाम्रो परोपकारी संस्था, पिस्करदेखि चिवाङसम्म।', link: 'praramva.org' },
      { group: 'परोपकार', name: 'सिंगापुर रेडक्रस', role: 'आजीवन सदस्य', meta: 'सन् २०१६ देखि', body: 'नेपालमा सोसाइटीका मानवीय तथा समाज कल्याणका योजनाको निरीक्षण गर्छु।', link: '' },
      { group: 'उद्यम', name: 'माइक रेस्टुरेन्ट एन्ड बार', role: 'निर्देशक', meta: 'आतिथ्य · लाजिम्पाट', body: 'लाजिम्पाट, काठमाडौंको रेस्टुरेन्ट र बार, भान्सा, टेरेस र स्थानीय कर्मचारीसहित।', link: 'mikerestro.com' },
      { group: 'उद्यम', name: 'गुरु युनिफर्म उद्योग', role: 'संस्थापक तथा अध्यक्ष', meta: 'गार्मेन्ट उत्पादन', body: 'नेपालमै युनिफर्म उत्पादन गर्ने गार्मेन्ट व्यवसाय, स्वदेशमै रोजगारीको उही प्रतिबद्धता।', link: '' },
    ],
    mike: { k: 'माइक रेस्टुरेन्ट एन्ड बार', title: 'लाजिम्पाटमा आतिथ्य।', body: 'लाजिम्पाटको टेरेसमा बिहानको खाना, कफी र बेलुकीको भोजन। आतिथ्य काठमाडौंमा स्थिर रोजगारी सिर्जना गर्ने अर्को माध्यम हो।', alt: 'माइक रेस्टुरेन्ट एन्ड बारको भान्साबाट' },
    principle: 'मेरो हरेक उद्यमको मापदण्ड एउटै छ: के यसले *घरमै* *इमानदार* काम सिर्जना गर्छ?',
  },
};

const VIS: { img?: string; pos?: string; href?: string; mark?: string; bg?: string }[] = [
  { img: 'badri/portrait-office', pos: '50% 30%', href: 'https://www.lahachhap.com' },
  { img: 'badri/studio', pos: '50% 35%' },
  { img: 'badri/with-students', pos: '78% 40%', href: 'https://www.praramva.org' },
  { mark: 'Red Cross', bg: 'var(--color-text)' },
  { img: 'badri/portrait-teal-2', pos: '50% 25%', href: 'https://www.mikerestro.com' },
  { mark: 'Guru', bg: 'var(--color-accent)' },
];

export default function VenturesPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);

  return (
    <Shell page="ventures">
      <section id="top" className="wrap page-hero" style={{ paddingBottom: 'clamp(64px,10vh,120px)' }}>
        <Kicker>{t.hero.k}</Kicker>
        <HeroLines lines={t.hero.lines} style={{ marginTop: 24, fontSize: 'calc(clamp(52px,9vw,168px) * var(--h-a))' }} />
        <div data-hero-fade="1" className="cells cols-260" style={{ marginTop: 'clamp(40px,7vh,80px)', borderTopColor: 'var(--color-text)' }}>
          <div className="stack" style={{ padding: '24px 24px 28px 0', gap: 10 }}>
            <span data-count="100" data-suf="+" className="stat">{num(100, lang)}+</span>
            <span className="label">{t.hero.s1}</span>
          </div>
          <div className="stack" style={{ padding: 24, gap: 10 }}>
            <span data-count="6" className="stat">{num(6, lang)}</span>
            <span className="label">{t.hero.s2}</span>
          </div>
          <div className="stack" style={{ padding: 24, justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 'clamp(17px,1.35vw,20px)', lineHeight: 1.55, fontWeight: 600, maxWidth: '34ch' }}>{t.hero.lede}</p>
          </div>
        </div>
      </section>

      <section className="wrap sec-bot">
        {t.rows.map((r, i) => {
          const v = VIS[i];
          return (
            <div key={i} data-panel="1" className="panel" style={{ top: `calc(var(--hh, 66px) + ${i * 22}px)`, marginBottom: '8vh' }}>
              <div className="panel__inner" style={{ padding: '22px 0 30px', minHeight: 'min(calc(100vh - var(--hh, 66px) - 120px),720px)' }}>
                <div className="stack" style={{ gap: 18, minWidth: 0 }}>
                  <div className="label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <span className="tnum" style={{ color: 'var(--color-accent-700)' }}>{p(i + 1)} / {p(t.rows.length)}</span>
                    <span className="tag" style={{ fontSize: 11, padding: '4px 8px' }}>{r.group}</span>
                  </div>
                  <h2 className="display" style={{ marginTop: 8, marginLeft: '-.05em', fontSize: 'calc(clamp(36px,5.2vw,100px) * var(--h-b))', overflowWrap: 'break-word', hyphens: 'manual' }}>{r.name}</h2>
                  <div className="stack" style={{ gap: 4 }}>
                    <span style={{ fontSize: 19, fontWeight: 800 }}>{r.role}</span>
                    <span className="muted" style={{ fontSize: 13, letterSpacing: '.06em', textTransform: 'uppercase' }}>{r.meta}</span>
                  </div>
                  <p style={{ marginTop: 'auto', fontSize: 'clamp(17px,1.4vw,21px)', lineHeight: 1.6, maxWidth: '42ch', textWrap: 'pretty' }}>{r.body}</p>
                  {v.href && <a href={v.href} target="_blank" rel="noopener" className="btn btn-secondary self-start">{r.link}<ArrowUpRight /></a>}
                </div>
                <div className="panel__media" style={{ background: v.bg || 'var(--color-surface)' }}>
                  {v.img ? (
                    <img data-parallax="-0.08" src={img(v.img)} alt={r.name} loading="lazy" style={{ position: 'absolute', left: 0, top: '-10%', width: '100%', height: '120%', objectFit: 'cover', objectPosition: v.pos || '50% 50%' }} />
                  ) : (
                    <div className="stack" style={{ position: 'absolute', inset: 0, padding: 'clamp(20px,2.4vw,36px)', justifyContent: 'space-between', color: 'var(--color-bg)' }}>
                      <span className="label" style={{ opacity: 0.8 }}>{r.meta}</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(56px,7vw,128px) * var(--h-b))', lineHeight: 0.85, letterSpacing: '-.06em', overflowWrap: 'anywhere' }}>{v.mark}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="bt">
        <div className="wrap grid-split grid-split--380 end" style={{ paddingTop: 'clamp(80px,12vh,160px)', paddingBottom: 'clamp(80px,12vh,160px)', gap: '24px clamp(32px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 20 }}>
            <Kicker>{t.mike.k}</Kicker>
            <h2 className="headline" style={{ fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--h-b))' }}>{t.mike.title}</h2>
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>{t.mike.body}</p>
            <a href="https://www.mikerestro.com" target="_blank" rel="noopener" className="btn btn-primary self-start">mikerestro.com<ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)' }}>
        <Manifesto text={t.principle} style={{ marginLeft: '-.05em', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(32px,5vw,88px) * var(--h-b))', lineHeight: 'var(--hl)', letterSpacing: '-.035em', maxWidth: '17em', textWrap: 'pretty' }} />
      </section>
    </Shell>
  );
}
