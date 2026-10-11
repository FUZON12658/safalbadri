'use client';

import Link from 'next/link';
import Shell from '@/components/Shell';
import { Kicker, PageHero } from '@/components/ui';
import { img } from '@/lib/img';
import { pad, useLang } from '@/lib/lang';

const C = {
  en: {
    hero: { k: 'About', lines: ['Journalist.', 'Entrepreneur.', 'Philanthropist.'], lede: 'Over twenty-four years of journalism and media entrepreneurship, dedicated to Nepal and Nepalis.', alt: 'Badri Raj Timalsina, garlanded at his desk' },
    glanceK: 'At a glance',
    facts: [
      { k: 'Official name', v: 'Badri Prasad Timalsina' }, { k: 'Known as', v: 'Badri Raj Timalsina' },
      { k: 'Born', v: '1984 · Patlekhet, Kavre' }, { k: 'Based in', v: 'Kathmandu, Nepal' },
      { k: 'In journalism since', v: '2001' }, { k: 'People employed', v: 'More than 100' },
    ],
    words: { k: 'In my own words', quote: '“Leaving behind numerous opportunities abroad, I chose to build my career in my motherland.”' },
    chapters: [
      { title: 'Where I come from', body: 'I was born in 1984 in Patlekhet, now part of Dhulikhel, the eldest son of a farming family. I finished school at Shree Hanuman Secondary School and started working soon after. Whatever I have built since, I have never forgotten that I am a farmer’s son.' },
      { title: 'Why journalism', body: 'By class eight I knew I wanted to be a journalist, inspired by an elder sister in our family. Senior journalists in Kavre took me under their wing, and their advice and trust made a place for me in the district’s press.' },
      { title: 'The stage before the page', body: 'Before journalism there was theatre. For almost five years I directed and acted in street and stage plays, and worked as an assistant director on films, documentaries and music videos. It taught me how a story reaches people.' },
      { title: 'Honour over wealth', body: 'I came to journalism for honour, not money. A journalist’s first duty is to be a true watchdog of society, and I have tried to keep that duty through every newspaper, radio station and website I have worked on.' },
      { title: 'The choice to stay', body: 'I had opportunities to build a life abroad and turned them down. My mission is to use my experience, information technology and whatever ability I have to empower young people and create jobs here at home.' },
      { title: 'Work at home', body: 'Self-reliance starts at home. Across my media houses, foundation work, garment business and hospitality ventures, more than 100 people now earn a steady monthly income. Being able to create those jobs through my own effort is something I am deeply proud of.' },
    ],
    wordsCaps: ['In my early years', 'In a dhaka topi and daura'],
    vision: {
      k: 'Vision', title: 'Committed to nation-building.',
      items: [
        { title: 'A prosperous society', body: 'A Nepal where every citizen is free to move, speak and live, and is also economically secure, educated, equal before the law, socially included and protected by the highest standards of human rights.' },
        { title: 'Good governance', body: 'Free health care and education, robust good governance, and development and national progress without corruption.' },
        { title: 'Halting the youth exodus', body: 'National sovereignty, territorial integrity, social harmony and an independent foreign policy. I am ready to take on wider social or political responsibility to help keep our young people at home.' },
      ],
    },
    speak: {
      k: 'Speaking & podcast', title: 'Stepping forward as a public speaker.',
      paras: ['My social journey goes beyond grassroots work. As a media professional, I now speak through my own platforms and, soon, a podcast.', 'I bring realistic analysis, a positive mindset and lessons from my own life. Through research and study, my aim is to connect hardworking Nepalis at home with successful Nepalis abroad, and bring them back to their motherland’s soil.'],
      topics: ['Building a career at home, not abroad', 'Press freedom and the future of local media', 'Bringing successful Nepalis back home', 'Good governance and corruption-free development'],
      cta: 'Invite me to speak', cta2: 'Press & honours', alt: 'Badri Raj Timalsina, ready to speak',
    },
    moments: ['In a dhaka topi', 'In a teal blazer', 'At a dinner meeting', 'In a winter coat'],
  },
  ne: {
    hero: { k: 'परिचय', lines: ['पत्रकार।', 'उद्यमी।', 'परोपकारी।'], lede: 'नेपाल र नेपालीप्रति समर्पित चौबीस वर्षभन्दा लामो पत्रकारिता र सञ्चार उद्यमशीलता।', alt: 'माला लगाएर आफ्नो डेस्कमा बद्रिराज तिमल्सिना' },
    glanceK: 'एक नजरमा',
    facts: [
      { k: 'आधिकारिक नाम', v: 'बद्रिप्रसाद तिमल्सिना' }, { k: 'परिचित नाम', v: 'बद्रिराज तिमल्सिना' },
      { k: 'जन्म', v: '१९८४ · पातलेखेत, काभ्रे' }, { k: 'बसोबास', v: 'काठमाडौं, नेपाल' },
      { k: 'पत्रकारितामा', v: 'सन् २००१ देखि' }, { k: 'रोजगारी', v: '१०० भन्दा बढी' },
    ],
    words: { k: 'मेरै शब्दमा', quote: '“विदेशका थुप्रै अवसर छाडेर मैले आफ्नो करियर मातृभूमिमै बनाउने निर्णय गरेँ।”' },
    chapters: [
      { title: 'मेरो जरा', body: 'म सन् १९८४ मा पातलेखेत, हालको धुलिखेलमा एक किसान परिवारको जेठो छोराका रूपमा जन्मिएँ। श्री हनुमान माध्यमिक विद्यालयबाट पढाइ सकेपछि चाँडै काम सुरु गरेँ। जति निर्माण गरे पनि म किसानको छोरो हुँ भन्ने कहिल्यै बिर्सिनँ।' },
      { title: 'किन पत्रकारिता', body: 'परिवारकी एक दिदीबाट प्रेरित भएर कक्षा आठमै मैले पत्रकार बन्ने निधो गरेँ। काभ्रेका अग्रज पत्रकारहरूले मलाई साथ दिए, र उहाँहरूको सल्लाह र विश्वासले जिल्लाको पत्रकारितामा मेरो ठाउँ बनायो।' },
      { title: 'पानाअघिको मञ्च', body: 'पत्रकारिताअघि रंगमञ्च थियो। झन्डै पाँच वर्ष मैले सडक र मञ्च नाटकमा निर्देशन र अभिनय गरेँ, अनि चलचित्र, वृत्तचित्र र म्युजिक भिडियोमा सहायक निर्देशकका रूपमा काम गरेँ। कथा मानिससम्म कसरी पुग्छ भन्ने त्यहीँ सिकेँ।' },
      { title: 'धनभन्दा सम्मान', body: 'म पैसाका लागि होइन, सम्मानका लागि पत्रकारितामा आएँ। पत्रकारको पहिलो कर्तव्य समाजको सच्चा प्रहरी बन्नु हो, र मैले काम गरेका हरेक पत्रिका, रेडियो र वेबसाइटमा त्यही कर्तव्य निभाउने प्रयास गरेको छु।' },
      { title: 'यहीँ बस्ने निर्णय', body: 'विदेशमा जीवन बनाउने अवसरहरू मैले अस्वीकार गरेँ। आफ्नो अनुभव, सूचना प्रविधि र क्षमताको उपयोग गरेर युवालाई सशक्त बनाउनु र स्वदेशमै रोजगारी सिर्जना गर्नु मेरो लक्ष्य हो।' },
      { title: 'घरमै रोजगारी', body: 'आत्मनिर्भरता घरबाटै सुरु हुन्छ। मेरा सञ्चार गृह, संस्था, गार्मेन्ट उद्योग र आतिथ्य व्यवसायमार्फत अहिले १०० भन्दा बढी जनाले स्थिर मासिक आम्दानी गर्छन्। आफ्नै मेहनतले रोजगारी सिर्जना गर्न सक्नु मेरा लागि गहिरो गर्वको विषय हो।' },
    ],
    wordsCaps: ['सुरुवाती दिनमा', 'ढाका टोपी र दौरामा'],
    vision: {
      k: 'दृष्टि', title: 'राष्ट्र निर्माणप्रति प्रतिबद्ध।',
      items: [
        { title: 'समृद्ध समाज', body: 'यस्तो नेपाल जहाँ हरेक नागरिक हिँडडुल गर्न, बोल्न र बाँच्न स्वतन्त्र मात्र होइन, आर्थिक रूपमा समृद्ध, शिक्षित, कानुनको नजरमा समान, सामाजिक रूपमा समावेशी र मानव अधिकारको उच्चतम मापदण्डले सुरक्षित होस्।' },
        { title: 'सुशासन र विकास', body: 'निःशुल्क स्वास्थ्य र शिक्षा, बलियो सुशासन, र भ्रष्टाचारमुक्त विकास तथा राष्ट्रिय प्रगति।' },
        { title: 'युवा पलायन रोक्ने', body: 'राष्ट्रिय सार्वभौमसत्ता, भौगोलिक अखण्डता, सामाजिक सद्भाव र स्वतन्त्र विदेश नीति। युवालाई देशमै रोक्न म थप सामाजिक वा राजनीतिक जिम्मेवारी लिन तयार छु।' },
      ],
    },
    speak: {
      k: 'वक्तृता र पडकास्ट', title: 'सार्वजनिक वक्ताका रूपमा अगाडि।',
      paras: ['मेरो सामाजिक यात्रा तल्लो तहको कामभन्दा अघि बढेको छ। सञ्चारकर्मीका रूपमा म अब आफ्नै माध्यम र छिट्टै आउने पडकास्टमार्फत बोल्दैछु।', 'यथार्थपरक विश्लेषण, सकारात्मक सोच र जीवनका अनुभव जोडेर, अध्ययन र अनुसन्धानमार्फत स्वदेशका मेहनती नागरिक र विदेशका सफल नेपालीलाई मातृभूमिसँग जोड्नु मेरो लक्ष्य हो।'],
      topics: ['विदेश होइन, स्वदेशमै करियर', 'प्रेस स्वतन्त्रता र स्थानीय मिडियाको भविष्य', 'सफल नेपालीलाई मातृभूमि फर्काउने', 'सुशासन र भ्रष्टाचारमुक्त विकास'],
      cta: 'वक्ताका रूपमा आमन्त्रण गर्नुहोस्', cta2: 'प्रेस र सम्मान', alt: 'वक्ताका रूपमा बद्रिराज तिमल्सिना',
    },
    moments: ['ढाका टोपीमा', 'टिल ब्लेजरमा', 'भोज बैठकमा', 'जाडोको कोटमा'],
  },
};

const WORDS_IMGS = ['badri/early-portrait', 'badri/dhaka-topi-yellow'];
const MOMENTS: { src: string; ar: string; pos: string; sp: string }[] = [
  { src: 'badri/dhaka-topi', ar: '4/5', pos: '50% 25%', sp: '0' },
  { src: 'badri/portrait-teal', ar: '3/4', pos: '50% 30%', sp: '-0.12' },
  { src: 'badri/portrait-blue', ar: '4/5', pos: '50% 30%', sp: '0.06' },
  { src: 'badri/portrait-coat-long', ar: '3/4', pos: '50% 30%', sp: '-0.06' },
];

export default function AboutPage() {
  const { lang } = useLang();
  const t = C[lang];
  const p = (n: number) => pad(n, lang);

  return (
    <Shell page="about">
      <PageHero kicker={t.hero.k} lines={t.hero.lines} lede={t.hero.lede} size="calc(clamp(42px,6.4vw,124px) * var(--hs))">
        <div data-grow="1" className="media hero-figure" style={{ aspectRatio: '21/10', minHeight: 300 }}>
          <img src={img('badri/chairman-desk')} alt={t.hero.alt} fetchPriority="high" style={{ objectPosition: '50% 32%' }} />
        </div>
      </PageHero>

      <section className="wrap" style={{ paddingTop: 'clamp(72px,11vh,140px)' }}>
        <Kicker>{t.glanceK}</Kicker>
        <div className="cells cols-3" style={{ marginTop: 28 }}>
          {t.facts.map((f, i) => (
            <div key={i} style={{ padding: '22px 24px 28px' }}>
              <div data-reveal={i} className="stack" style={{ gap: 10 }}>
                <span className="label muted">{f.k}</span>
                <span className="hl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(24px,2.2vw,34px) * var(--hs))', letterSpacing: '-.02em' }}>{f.v}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap sec" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,112px)' }}>
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          <div className="stack" style={{ position: 'sticky', top: 'calc(var(--hh, 66px) + 40px)', gap: 24 }}>
            <Kicker>{t.words.k}</Kicker>
            <blockquote className="hl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(28px,3.2vw,54px) * var(--hs))', letterSpacing: '-.03em', textWrap: 'pretty' }}>{t.words.quote}</blockquote>
            <span data-story-idx="1" className="tnum" style={{ fontSize: 13, fontWeight: 800 }}>{p(1)} / {p(t.chapters.length)}</span>
          </div>
        </div>
        <div className="stack" style={{ flex: '1.3 1 440px', minWidth: 0 }}>
          {t.chapters.map((c, i) => (
            <article key={i} data-chapter="1" data-dim="1" className="stack bt" style={{ gap: 16, padding: '36px 0 44px', transition: 'opacity .5s ease' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span className="num" style={{ fontSize: 15 }}>{p(i + 1)}</span>
                <h2 className="hl" style={{ fontSize: 'calc(clamp(28px,2.8vw,46px) * var(--hs))', letterSpacing: '-.025em' }}>{c.title}</h2>
              </div>
              <p className="body-lg" style={{ fontSize: 'clamp(18px,1.45vw,22px)' }}>{c.body}</p>
            </article>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16, marginTop: 24 }}>
            {WORDS_IMGS.map((src, i) => (
              <figure key={src} className="stack" style={{ gap: 8 }}>
                <div className="media" style={{ aspectRatio: '4/5' }}>
                  <img data-parallax="-0.08" className="px-md" src={img(src, 'md')} alt={t.wordsCaps[i]} loading="lazy" style={{ objectPosition: '50% 30%' }} />
                </div>
                <figcaption className="muted" style={{ fontSize: 13 }}>{t.wordsCaps[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="on-accent">
        <div className="wrap" style={{ paddingTop: 'clamp(96px,14vh,180px)', paddingBottom: 'clamp(96px,14vh,180px)' }}>
          <Kicker>{t.vision.k}</Kicker>
          <h2 className="display" style={{ marginTop: 28, fontSize: 'calc(clamp(48px,8.4vw,156px) * var(--hs))', maxWidth: '11em' }}>{t.vision.title}</h2>
          <div className="cells cols-300" style={{ marginTop: 'clamp(56px,9vh,112px)' }}>
            {t.vision.items.map((v, i) => (
              <div key={i} style={{ padding: '28px 24px 40px 4px' }}>
                <div data-reveal={i} className="stack" style={{ gap: 18 }}>
                  <span className="stat" style={{ fontSize: 'calc(clamp(48px,5vw,88px) * var(--hs))', color: 'var(--color-accent-200)' }}>{p(i + 1)}</span>
                  <h3 className="hl" style={{ fontSize: 'calc(clamp(26px,2.4vw,38px) * var(--hs))', letterSpacing: '-.025em' }}>{v.title}</h3>
                  <p className="body-md" style={{ fontSize: 17, maxWidth: '40ch' }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap sec grid-split center" style={{ gap: '48px clamp(40px,6vw,112px)' }}>
        <div className="media" style={{ aspectRatio: '4/5' }}>
          <img data-parallax="-0.1" className="px" src={img('badri/portrait-check')} alt={t.speak.alt} loading="lazy" style={{ objectPosition: '50% 25%' }} />
        </div>
        <div className="stack" style={{ gap: 24 }}>
          <Kicker>{t.speak.k}</Kicker>
          <h2 className="headline" style={{ fontSize: 'calc(clamp(36px,4.6vw,80px) * var(--hs))' }}>{t.speak.title}</h2>
          {t.speak.paras.map((pp, i) => <p key={i} className="body-lg" style={{ fontSize: 'clamp(17px,1.35vw,20px)' }}>{pp}</p>)}
          <div className="stack">
            {t.speak.topics.map((x, i) => (
              <div key={i} data-reveal={i} className="row-item" style={{ gap: 16, padding: '16px 0' }}>
                <span className="num">{p(i + 1)}</span>
                <span className="hl" style={{ fontWeight: 800, fontSize: 'clamp(19px,1.6vw,24px)' }}>{x}</span>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <Link href="/contact" className="btn btn-primary">{t.speak.cta}</Link>
            <Link href="/press" className="btn btn-secondary">{t.speak.cta2}</Link>
          </div>
        </div>
      </section>

      <section className="wrap sec-bot">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
          {MOMENTS.map((m, i) => (
            <figure key={m.src} data-parallax={m.sp} data-pdesk="1" className="stack" style={{ flex: '1 1 220px', minWidth: 0, gap: 8 }}>
              <div className="media" style={{ aspectRatio: m.ar }}>
                <img src={img(m.src, 'md')} alt={t.moments[i]} loading="lazy" style={{ objectPosition: m.pos }} />
              </div>
              <figcaption className="muted" style={{ fontSize: 13 }}>{t.moments[i]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Shell>
  );
}
