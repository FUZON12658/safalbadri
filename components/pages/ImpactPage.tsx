'use client';

import Link from 'next/link';
import Shell from '@/components/Shell';
import { Kicker, PageHero } from '@/components/ui';
import { ArrowUpRight } from '@/components/icons';
import { img } from '@/lib/img';
import { num, pad, useLang } from '@/lib/lang';

const C = {
  en: {
    hero: { k: 'Impact', lines: ['Service', 'on the ground.'], lede: 'Education, health, skills and disaster relief, delivered through Praramva and the Singapore Red Cross Society.', alt: 'With students at a school programme', credit: 'Praramva' },
    facts: [
      { n: 2015, from: 1990, l: 'Praramva', d: 'Philanthropic organisation founded in 2015. I serve as its Project Director.' },
      { n: 2016, from: 1990, l: 'Singapore Red Cross', d: 'Life Member since 2016, overseeing humanitarian and social-welfare schemes in Nepal.' },
      { n: 2077, from: 2050, l: 'Chiwang, Solukhumbu · BS', d: 'The Praramva Community Building, handed over to the community.' },
    ],
    piskar: {
      k: 'Piskar, Sindhupalchok', title: 'Rebuilding a school after the earthquake.',
      body: 'The 2015 earthquake left Mangala Mai Secondary School in rubble. Through the Piskar Reconstruction Project, Praramva rebuilt it with funding from the Singapore Red Cross Society, and worked with the community at every stage.',
      cap: 'Construction of the new Mangala Mai Secondary School, Piskar', stepsK: 'How it was done',
      steps: [
        { title: 'Listening first', body: 'We met teachers, parents and ward representatives in the village before any plans were drawn, so the school would be built around what Piskar needed.' },
        { title: 'Building back safer', body: 'New classroom blocks went up on the old site, built to earthquake-resistant standards and shown to the community as models before construction began.' },
        { title: 'Awareness and empowerment', body: 'Alongside the construction, we ran awareness and empowerment programmes so that families shared ownership of the school.' },
        { title: 'Open accounts', body: 'A public social audit closed the project. Every rupee was accounted for in front of the people it was meant to serve.' },
      ],
      after: 'Piskar from above: the finished classroom blocks',
    },
    chiwang: { k: 'Chiwang, Solukhumbu', title: 'A community building in the mountains.', body: 'In 2077 BS we handed over the Praramva Community Building in Chiwang. It gives the village a permanent place for meetings, training and gatherings.', alt1: 'With the community at Chiwang', alt2: 'At the handover in Chiwang' },
    relief: { k: 'Relief', title: 'At the forefront in emergencies.', body: 'When disaster strikes, we carry relief to remote mountain communities, coordinating with local authorities and security forces, and hand it directly to the families who need it.', alt: 'Relief distribution in a remote community' },
    rc: {
      k: 'Singapore Red Cross Society', title: 'Overseeing humanitarian work in Nepal.',
      areas: [
        { t: 'Education', d: 'Rebuilding schools and supporting students.' },
        { t: 'Health', d: 'Health awareness and support in rural communities.' },
        { t: 'Skills', d: 'Training that helps people earn a living at home.' },
        { t: 'Disaster relief', d: 'Fast, accountable aid when emergencies hit.' },
      ],
      cta1: 'Visit praramva.org', cta2: 'See the field gallery',
    },
  },
  ne: {
    hero: { k: 'प्रभाव', lines: ['जमिनमै', 'सेवा।'], lede: 'प्रारम्भ र सिंगापुर रेडक्रस सोसाइटीमार्फत शिक्षा, स्वास्थ्य, सीप र विपद् राहत।', alt: 'विद्यालय कार्यक्रममा विद्यार्थीसँग', credit: 'प्रारम्भ' },
    facts: [
      { n: 2015, from: 1990, l: 'प्रारम्भ', d: 'सन् २०१५ मा स्थापित परोपकारी संस्था, जहाँ म परियोजना निर्देशक छु।' },
      { n: 2016, from: 1990, l: 'सिंगापुर रेडक्रस', d: 'सन् २०१६ देखि आजीवन सदस्य, नेपालमा मानवीय तथा समाज कल्याणका योजनाको निरीक्षण।' },
      { n: 2077, from: 2050, l: 'चिवाङ, सोलुखुम्बु · वि.सं.', d: 'प्रारम्भ सामुदायिक भवन समुदायलाई हस्तान्तरण।' },
    ],
    piskar: {
      k: 'पिस्कर, सिन्धुपाल्चोक', title: 'भूकम्पपछि विद्यालयको पुनर्निर्माण।',
      body: '२०१५ को भूकम्पले मंगलामाई माध्यमिक विद्यालय भग्नावशेषमा परिणत भयो। पिस्कर पुनर्निर्माण परियोजनामार्फत सिंगापुर रेडक्रस सोसाइटीको सहयोगमा प्रारम्भले यसलाई पुनर्निर्माण गर्‍यो, र हरेक चरणमा समुदायसँगै काम गर्‍यो।',
      cap: 'पिस्करमा नयाँ मंगलामाई माध्यमिक विद्यालयको निर्माण', stepsK: 'कसरी गरियो',
      steps: [
        { title: 'पहिले सुन्ने', body: 'नक्सा बन्नुअघि नै हामीले गाउँमा शिक्षक, अभिभावक र वडा प्रतिनिधिसँग भेट गर्‍यौँ, ताकि विद्यालय पिस्करको आवश्यकताअनुसार बनोस्।' },
        { title: 'अझ सुरक्षित निर्माण', body: 'पुरानै स्थानमा भूकम्प प्रतिरोधी मापदण्डअनुसार नयाँ कक्षाकोठा बने, र निर्माणअघि नमुना समुदायलाई देखाइयो।' },
        { title: 'जनचेतना र सशक्तीकरण', body: 'निर्माणसँगै जनचेतना र सशक्तीकरण कार्यक्रम चलाइयो, ताकि परिवारहरूले विद्यालयलाई आफ्नो ठानून्।' },
        { title: 'पारदर्शी हिसाब', body: 'सार्वजनिक सामाजिक परीक्षणसहित परियोजना सम्पन्न भयो। हरेक रुपैयाँको हिसाब सेवाग्राही समुदायकै अगाडि राखियो।' },
      ],
      after: 'माथिबाट पिस्कर: तयार भएका कक्षाकोठा भवन',
    },
    chiwang: { k: 'चिवाङ, सोलुखुम्बु', title: 'हिमाली गाउँमा सामुदायिक भवन।', body: 'वि.सं. २०७७ मा हामीले चिवाङमा प्रारम्भ सामुदायिक भवन हस्तान्तरण गर्‍यौँ। यसले गाउँलाई भेला, तालिम र जमघटका लागि स्थायी ठाउँ दिएको छ।', alt1: 'चिवाङमा समुदायसँग', alt2: 'चिवाङमा हस्तान्तरणका क्रममा' },
    relief: { k: 'राहत', title: 'आपत्कालमा अग्रपंक्तिमा।', body: 'विपद् पर्दा स्थानीय प्रशासन र सुरक्षा निकायसँग समन्वय गरी हामी दुर्गम हिमाली समुदायसम्म राहत पुर्‍याउँछौँ र सिधै पीडित परिवारलाई हस्तान्तरण गर्छौँ।', alt: 'दुर्गम समुदायमा राहत वितरण' },
    rc: {
      k: 'सिंगापुर रेडक्रस सोसाइटी', title: 'नेपालमा मानवीय कामको निरीक्षण।',
      areas: [
        { t: 'शिक्षा', d: 'विद्यालय पुनर्निर्माण र विद्यार्थीलाई सहयोग।' },
        { t: 'स्वास्थ्य', d: 'ग्रामीण समुदायमा स्वास्थ्य चेतना र सहयोग।' },
        { t: 'सीप', d: 'घरमै आम्दानी गर्न मद्दत गर्ने तालिम।' },
        { t: 'विपद् राहत', d: 'आपत्कालमा छिटो र जवाफदेही सहयोग।' },
      ],
      cta1: 'praramva.org हेर्नुहोस्', cta2: 'फिल्ड तस्बिरहरू हेर्नुहोस्',
    },
  },
};


export default function ImpactPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);

  return (
    <Shell page="impact">
      <PageHero kicker={t.hero.k} lines={t.hero.lines} lede={t.hero.lede}>
        <div data-grow="1" className="media hero-figure" style={{ aspectRatio: '21/9', minHeight: 300 }}>
          <img src={img('badri/with-students')} alt={t.hero.alt} fetchPriority="high" style={{ objectPosition: '50% 40%' }} />
        </div>
        <div className="caption caption-row"><span>{t.hero.alt}</span><span>{t.hero.credit}</span></div>
      </PageHero>

      <section className="wrap" style={{ paddingTop: 'clamp(72px,11vh,140px)' }}>
        <div className="cells cols-280">
          {t.facts.map((f, i) => (
            <div key={i} style={{ padding: '28px 24px 36px' }}>
              <div data-reveal={i} className="stack" style={{ gap: 12, minHeight: 240 }}>
                <span data-count={f.n} data-from={f.from} className="stat">{num(f.n, lang)}</span>
                <span className="label" style={{ marginTop: 'auto' }}>{f.l}</span>
                <span style={{ fontSize: 16, lineHeight: 1.55, color: 'color-mix(in srgb,var(--color-text) 82%,transparent)', maxWidth: '34ch' }}>{f.d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <div className="grid-split grid-split--380 end" style={{ gap: '24px clamp(32px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 20 }}>
            <Kicker>{t.piskar.k}</Kicker>
            <h2 className="headline" style={{ fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--hs))' }}>{t.piskar.title}</h2>
          </div>
          <p className="body-lg">{t.piskar.body}</p>
        </div>
        <div style={{ marginTop: 'clamp(64px,10vh,120px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,112px)' }}>
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>
            <div className="stack" style={{ position: 'sticky', top: 'calc(var(--hh, 66px) + 40px)', gap: 16 }}>
              <span className="label muted">{t.piskar.stepsK}</span>
              <span data-chapter-big="1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(96px,14vw,240px) * var(--hs))', lineHeight: 0.85, letterSpacing: '-.06em', color: 'var(--color-accent)', fontFeatureSettings: "'tnum' 1" }}>{p(1)}</span>
              <span data-story-idx="1" className="tnum" style={{ fontSize: 13, fontWeight: 800 }}>{p(1)} / {p(t.piskar.steps.length)}</span>
            </div>
          </div>
          <div className="stack" style={{ flex: '1.3 1 440px', minWidth: 0 }}>
            {t.piskar.steps.map((s, i) => (
              <article key={i} data-chapter="1" data-dim="1" data-big={p(i + 1)} className="stack bt" style={{ gap: 16, padding: '36px 0 52px', transition: 'opacity .5s ease' }}>
                <h3 className="hl" style={{ fontSize: 'calc(clamp(28px,2.8vw,46px) * var(--hs))', letterSpacing: '-.025em' }}>{s.title}</h3>
                <p className="body-lg" style={{ maxWidth: '44ch' }}>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on-ink">
        <div className="wrap grid-split center" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)', gap: '48px clamp(40px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 24 }}>
            <Kicker>{t.chiwang.k}</Kicker>
            <h2 className="headline" style={{ fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--hs))' }}>{t.chiwang.title}</h2>
            <p className="body-lg" style={{ maxWidth: '44ch' }}>{t.chiwang.body}</p>
          </div>
          <figure className="stack" style={{ gap: 10 }}>
            <div className="media" style={{ aspectRatio: '4/3' }}><img data-parallax="-0.08" className="px" src={img('badri/chiwang-selfie')} alt={t.chiwang.alt2} loading="lazy" style={{ objectPosition: '55% 50%' }} /></div>
            <figcaption style={{ fontSize: 13, color: 'color-mix(in srgb,var(--color-bg) 70%,transparent)' }}>{t.chiwang.alt2}</figcaption>
          </figure>
        </div>
      </section>

      <section className="sec bt">
        <div className="wrap grid-split grid-split--380 end" style={{ gap: '24px clamp(32px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 20 }}>
            <Kicker>{t.relief.k}</Kicker>
            <h2 className="headline" style={{ fontSize: 'calc(clamp(40px,5.6vw,96px) * var(--hs))' }}>{t.relief.title}</h2>
          </div>
          <p className="body-lg">{t.relief.body}</p>
        </div>
      </section>

      <section className="bt">
        <div className="wrap sec grid-split grid-split--380" style={{ gap: '40px clamp(32px,6vw,112px)' }}>
          <div className="stack" style={{ gap: 20 }}>
            <Kicker>{t.rc.k}</Kicker>
            <h2 className="headline" style={{ marginLeft: '-.04em', fontSize: 'calc(clamp(34px,4.2vw,72px) * var(--hs))', letterSpacing: '-.035em' }}>{t.rc.title}</h2>
          </div>
          <div className="stack">
            {t.rc.areas.map((a, i) => (
              <div key={i} data-reveal={i} className="row-item">
                <span className="num">{p(i + 1)}</span>
                <span className="stack" style={{ gap: 6 }}>
                  <span className="row-item__text">{a.t}</span>
                  <span style={{ fontSize: 16, color: 'color-mix(in srgb,var(--color-text) 80%,transparent)' }}>{a.d}</span>
                </span>
              </div>
            ))}
            <div className="btn-row bt" style={{ paddingTop: 24 }}>
              <a href="https://www.praramva.org" target="_blank" rel="noopener" className="btn btn-primary">{t.rc.cta1}<ArrowUpRight /></a>
              <Link href="/gallery" className="btn btn-secondary">{t.rc.cta2}</Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
