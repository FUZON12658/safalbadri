'use client';

import Shell from '@/components/Shell';
import { Kicker, PageHero } from '@/components/ui';
import { img } from '@/lib/img';
import { pad, useLang } from '@/lib/lang';

const C = {
  en: {
    hero: { k: 'Journey', lines: ['From Kavrepost', 'to digital media.'], lede: 'More than two decades across print, radio and online, and a fearless approach to building media in Nepal.', note: '2064 BS ≈ 2007/08 AD', alt: 'Community work in the early years, Kavre' },
    tl: { k: 'The journalistic odyssey', body: 'Nine stops, from the village where I was born to the newsroom and radio station I run today.' },
    now: 'Now',
    stations: [
      { big: '1984', name: 'Patlekhet, Kavre', meta: 'Origins', desc: 'I was born the eldest son of a farming family in Patlekhet, now part of Dhulikhel. I studied at Shree Hanuman Secondary School before starting work.', cap: 'In my early years' },
      { big: 'Stage', name: 'Theatre & film', meta: 'Before journalism', desc: 'For almost five years I worked in street and stage theatre, and as an assistant director on films, telefilms, documentaries and music videos.', cap: 'The theatre years' },
      { big: '2001', name: 'Kavrepost Weekly', meta: 'Print · Kavre', desc: 'My first newsroom. This is where my journalism began, and where senior journalists in Kavre first trusted me with a story.' },
      { big: 'Daily', name: 'Purba Darpan Daily', meta: 'Print', desc: 'The next step in a career in print journalism, on the pages of a daily.' },
      { big: '2064', name: 'Sanjibani Patra', meta: 'Print · Banepa · 2064 BS', desc: 'Under my direct leadership, Sanjibani Patra Weekly became a daily in 2064 BS. Banepa’s limited market made a daily exceptionally hard to sustain and we returned to weekly, but that bold attempt defined my approach to media.', cap: 'Sanjibani Patra, the newspaper converted into a daily in 2064 BS' },
      { big: 'FM', name: 'Radio Madhya Purb FM', meta: 'Radio · Dhulikhel', desc: 'I established the radio station in Dhulikhel.' },
      { big: 'Online', name: 'Ma Nepali & Digitalpatrika', meta: 'Print & online · Kathmandu', desc: 'I published Ma Nepali monthly and the Digitalpatrika online portal independently from Kathmandu, my first step from print into digital.' },
      { big: 'Now', now: true, name: 'Lahachhap.com', meta: 'Online · Kathmandu', desc: 'Stepping away from past ventures, I now lead Lahachhap.com independently from Kathmandu.', cap: 'At work in Kathmandu' },
      { big: 'Now', now: true, name: 'Best FM 88.1 MHz', meta: 'Radio · Banepa', desc: 'I founded and own Best FM 88.1 MHz in Banepa, run with a dedicated team.', cap: 'On air in the studio' },
    ],
    lead: {
      k: 'Leadership', title: 'Advocacy for working journalists.', figCap: 'Felicitated at the Federation of Nepali Journalists, Kavre chapter',
      items: [
        { t: 'Federation of Nepali Journalists, Kavre', b: 'As Past President, I led the collective organisation of working journalists in the district and helped deliver lasting gains for regional media.' },
        { t: 'Defending working journalists', b: 'I have consistently stood up for working journalists and struggling pro-poor outlets, helped construct the FNJ chapter building and protected the organisation’s autonomy.' },
        { t: 'Press freedom', b: 'I advocate without compromise for freedom of expression and press freedom, and use mainstream and digital media to amplify the voices of ordinary citizens.' },
      ],
    },
  },
  ne: {
    hero: { k: 'यात्रा', lines: ['काभ्रेपोस्टदेखि', 'डिजिटल मिडियासम्म।'], lede: 'छापा, रेडियो र अनलाइनमा दुई दशकभन्दा बढी, र नेपालमा मिडिया निर्माणप्रतिको निडर दृष्टिकोण।', note: '२०६४ साल ≈ सन् २००७/०८', alt: 'सुरुवाती दिनको सामुदायिक काम, काभ्रे' },
    tl: { k: 'पत्रकारिताको यात्रा', body: 'जन्मेको गाउँदेखि आज सञ्चालन गरिरहेको न्युजरुम र रेडियोसम्मका नौ पडाव।' },
    now: 'हाल',
    stations: [
      { big: '१९८४', name: 'पातलेखेत, काभ्रे', meta: 'जरा', desc: 'हालको धुलिखेलको पातलेखेतमा किसान परिवारको जेठो छोराका रूपमा जन्मिएँ। काम सुरु गर्नुअघि श्री हनुमान माध्यमिक विद्यालयमा पढेँ।', cap: 'सुरुवाती दिनमा' },
      { big: 'मञ्च', name: 'नाटक र चलचित्र', meta: 'पत्रकारिताअघि', desc: 'झन्डै पाँच वर्ष सडक र मञ्च नाटकमा, अनि चलचित्र, टेलिचलचित्र, वृत्तचित्र र म्युजिक भिडियोमा सहायक निर्देशकका रूपमा काम गरेँ।', cap: 'रंगमञ्चका दिन' },
      { big: '२००१', name: 'काभ्रेपोस्ट साप्ताहिक', meta: 'छापा · काभ्रे', desc: 'मेरो पहिलो न्युजरुम। यहीँबाट मेरो पत्रकारिता सुरु भयो, र काभ्रेका अग्रज पत्रकारहरूले पहिलोपटक मलाई समाचारको जिम्मा दिनुभयो।' },
      { big: 'दैनिक', name: 'पूर्वदर्पण दैनिक', meta: 'छापा', desc: 'छापा पत्रकारिताको करियरमा अर्को कदम, दैनिक पत्रिकाका पानामा।' },
      { big: '२०६४', name: 'सञ्जीवनी पत्र', meta: 'छापा · बनेपा · २०६४', desc: 'मेरो प्रत्यक्ष नेतृत्वमा २०६४ सालमा सञ्जीवनी पत्र साप्ताहिक दैनिकमा रूपान्तरण भयो। बनेपाको सीमित बजारले दैनिक धान्न अत्यन्त कठिन भएपछि फेरि साप्ताहिकमा फर्कियौँ, तर त्यो साहसिक प्रयासले मिडियाप्रतिको मेरो दृष्टिकोण परिभाषित गर्‍यो।', cap: 'सञ्जीवनी पत्र, २०६४ सालमा दैनिकमा रूपान्तरण गरिएको पत्रिका' },
      { big: 'एफएम', name: 'रेडियो मध्यपूर्व एफएम', meta: 'रेडियो · धुलिखेल', desc: 'धुलिखेलमा रेडियो स्टेसन स्थापना गरेँ।' },
      { big: 'अनलाइन', name: 'म नेपाली र डिजिटलपत्रिका', meta: 'छापा र अनलाइन · काठमाडौं', desc: 'काठमाडौंबाट ‘म नेपाली’ मासिक र ‘डिजिटलपत्रिका’ अनलाइन पोर्टल स्वतन्त्र रूपमा प्रकाशन गरेँ, छापाबाट डिजिटलतर्फको मेरो पहिलो कदम।' },
      { big: 'हाल', now: true, name: 'Lahachhap.com', meta: 'अनलाइन · काठमाडौं', desc: 'विगतका उद्यमबाट अलग भई काठमाडौंबाट Lahachhap.com को स्वतन्त्र नेतृत्व गर्दैछु।', cap: 'काठमाडौंमा कामका क्रममा' },
      { big: 'हाल', now: true, name: 'बेस्ट एफएम ८८.१ मेगाहर्ज', meta: 'रेडियो · बनेपा', desc: 'बनेपामा बेस्ट एफएम ८८.१ मेगाहर्जको स्थापना गरेँ, जुन अहिले समर्पित टोलीसँग सञ्चालनमा छ।', cap: 'स्टुडियोमा प्रसारणका क्रममा' },
    ],
    lead: {
      k: 'नेतृत्व', title: 'श्रमजीवी पत्रकारको पक्षमा।', figCap: 'नेपाल पत्रकार महासंघ, काभ्रे शाखामा सम्मानित',
      items: [
        { t: 'नेपाल पत्रकार महासंघ, काभ्रे', b: 'पूर्व अध्यक्षका रूपमा जिल्लाका श्रमजीवी पत्रकारको सामूहिक संगठनको नेतृत्व गर्दै क्षेत्रीय मिडियामा उल्लेखनीय उपलब्धि हासिल गर्न योगदान दिएँ।' },
        { t: 'श्रमजीवी पत्रकारको रक्षा', b: 'श्रमजीवी पत्रकार र संघर्षरत गरिबमुखी सञ्चार माध्यमको पक्षमा निरन्तर आवाज उठाएँ, महासंघको भवन निर्माणमा भूमिका खेलेँ र संस्थाको स्वायत्तता जोगाएँ।' },
        { t: 'प्रेस स्वतन्त्रता', b: 'अभिव्यक्ति र प्रेस स्वतन्त्रताको पक्षमा अडिग छु, र मूलधार तथा डिजिटल मिडियामार्फत आम नागरिकको आवाज बुलन्द गर्छु।' },
      ],
    },
  },
};

const STATION_IMG: Record<number, { src: string; pos: string }> = {
  0: { src: 'badri/early-years', pos: '50% 30%' },
  1: { src: 'badri/early-stage', pos: '55% 35%' },
  7: { src: 'badri/portrait-office', pos: '50% 30%' },
  8: { src: 'badri/studio', pos: '50% 35%' },
};

export default function JourneyPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);
  const total = t.stations.length;

  return (
    <Shell page="journey">
      <PageHero
        kicker={t.hero.k}
        lines={t.hero.lines}
        size="calc(clamp(42px,6.4vw,124px) * var(--h-a))"
        aside={
          <div data-hero-fade="1" className="stack" style={{ gap: 12 }}>
            <p className="lede">{t.hero.lede}</p>
            <span className="muted" style={{ fontSize: 13, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>{t.hero.note}</span>
          </div>
        }
      >
        <div data-grow="1" className="media hero-figure" style={{ aspectRatio: '21/9', minHeight: 280 }}>
          <img src={img('badri/early-community')} alt={t.hero.alt} fetchPriority="high" style={{ objectPosition: '50% 40%' }} />
        </div>
      </PageHero>

      <section className="wrap sec" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px,6vw,112px)' }}>
        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
          <div className="stack" style={{ position: 'sticky', top: 'calc(var(--hh, 66px) + 40px)', gap: 16 }}>
            <Kicker>{t.tl.k}</Kicker>
            <div data-chapter-big="1" className="display" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(72px,11vw,200px) * var(--h-b))', letterSpacing: '-.06em', color: 'var(--color-accent)', minHeight: '1em' }}>{t.stations[0].big}</div>
            <div className="tnum" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 800 }}>
              <span data-story-idx="1">{p(1)} / {p(total)}</span>
              <span data-story-cap="1" className="label muted">{t.stations[0].meta}</span>
            </div>
            <p style={{ marginTop: 8, maxWidth: '34ch', fontSize: 16, lineHeight: 1.55, color: 'color-mix(in srgb,var(--color-text) 82%,transparent)' }}>{t.tl.body}</p>
          </div>
        </div>
        <div style={{ flex: '1.5 1 460px', minWidth: 0, position: 'relative', paddingLeft: 'clamp(24px,3vw,48px)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--color-divider)' }}>
            <div data-line="1" style={{ position: 'absolute', inset: 0, background: 'var(--color-accent)', transformOrigin: '50% 0', transform: 'scaleY(0)' }} />
          </div>
          {t.stations.map((s, i) => {
            const im = STATION_IMG[i];
            const now = 'now' in s && s.now;
            return (
              <article key={i} data-chapter="1" data-dim="1" data-big={s.big} data-cap={s.meta} className="stack bt" style={{ position: 'relative', gap: 16, padding: '40px 0 56px', transition: 'opacity .5s ease' }}>
                <span style={{ position: 'absolute', left: 'calc(-1 * clamp(24px,3vw,48px) - 5px)', top: 44, width: 12, height: 12, background: now ? 'var(--color-accent)' : 'var(--color-text)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span className="num">{p(i + 1)} / {p(total)}</span>
                  {now && <span className="tag tag-accent">{t.now}</span>}
                  <span className="muted" style={{ fontSize: 13, letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600 }}>{s.meta}</span>
                </div>
                <h2 className="hl" style={{ fontSize: 'calc(clamp(32px,3.6vw,60px) * var(--h-c))', letterSpacing: '-.035em' }}>{s.name}</h2>
                <p className="body-lg" style={{ fontSize: 'clamp(17px,1.4vw,21px)' }}>{s.desc}</p>
                {im && 'cap' in s && (
                  <figure className="stack" style={{ marginTop: 8, gap: 8 }}>
                    <div className="media" style={{ aspectRatio: '16/10' }}>
                      <img data-parallax="-0.06" className="px-sm" src={img(im.src, 'md')} alt={s.cap} loading="lazy" style={{ objectPosition: im.pos }} />
                    </div>
                    <figcaption className="muted" style={{ fontSize: 13 }}>{s.cap}</figcaption>
                  </figure>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="on-accent">
        <div className="wrap" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)' }}>
          <div className="grid-split end">
            <div className="stack" style={{ gap: 28 }}>
              <Kicker>{t.lead.k}</Kicker>
              <h2 className="display" style={{ fontSize: 'calc(clamp(44px,7vw,128px) * var(--h-b))', maxWidth: '12em' }}>{t.lead.title}</h2>
            </div>
            <figure className="stack" style={{ gap: 10, maxWidth: 420, justifySelf: 'end', width: '100%' }}>
              <div className="media" style={{ aspectRatio: '4/5', background: 'var(--color-accent-700)' }}>
                <img data-parallax="-0.06" className="px-sm" src={img('badri/fnj-kavre', 'md')} alt={t.lead.figCap} loading="lazy" style={{ objectPosition: '50% 40%' }} />
              </div>
              <figcaption style={{ fontSize: 13, color: 'color-mix(in srgb,var(--color-bg) 75%,transparent)' }}>{t.lead.figCap}</figcaption>
            </figure>
          </div>
          <div className="cells cols-300" style={{ marginTop: 'clamp(56px,9vh,112px)' }}>
            {t.lead.items.map((ld, i) => (
              <div key={i} style={{ padding: '28px 24px 40px 4px' }}>
                <div data-reveal={i} className="stack" style={{ gap: 16 }}>
                  <span className="num" style={{ fontSize: 15 }}>{p(i + 1)}</span>
                  <h3 className="hl" style={{ fontSize: 'calc(clamp(24px,2.2vw,34px) * var(--h-c))', letterSpacing: '-.025em' }}>{ld.t}</h3>
                  <p className="body-md" style={{ fontSize: 17, maxWidth: '40ch' }}>{ld.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
