'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Shell from '@/components/Shell';
import { ContactCards } from '@/components/SiteFooter';
import { HeroLines, Kicker } from '@/components/ui';
import { ArrowRight } from '@/components/icons';
import { CONTACT } from '@/content/site';
import { img } from '@/lib/img';
import { pad, useLang } from '@/lib/lang';

const REASON_KEYS = ['media', 'speaking', 'partnership', 'social'];

const C = {
  en: {
    hero: { k: 'Contact', lines: ['Let’s work for', 'Nepal, together.'] },
    form: { k: 'Write to me', title: 'Tell me what you have in mind.', body: 'Media requests, speaking invitations, partnerships or social initiatives. I read every message myself.', alt: 'Badri Raj Timalsina, hands joined in namaste', reasonK: 'What is it about?', reasons: ['Media', 'Speaking', 'Partnership', 'Social initiative'], name: 'Your name', email: 'Email', org: 'Organisation (optional)', msg: 'Message', note: 'Sending opens your email app with the message filled in.', send: 'Send message', subj: 'Website enquiry' },
    done: { t: 'Thank you.', b: 'Your email app should have opened with your message. Send it from there and I will reply as soon as I can. If nothing opened, write to me directly at', again: 'Write another message' },
    whereK: 'Where to find me',
    where: [
      { k: 'Based in', v: 'Kathmandu, Nepal', d: 'Lahachhap.com and Mike Restaurant & Bar, Lazimpat.' },
      { k: 'Also in', v: 'Banepa & Dhulikhel', d: 'Best FM 88.1 MHz and my home district, Kavre.' },
      { k: 'Languages', v: 'नेपाली · English', d: 'Write in whichever you prefer.' },
    ],
  },
  ne: {
    hero: { k: 'सम्पर्क', lines: ['आउनुहोस्, नेपालका लागि', 'सँगै काम गरौँ।'] },
    form: { k: 'मलाई लेख्नुहोस्', title: 'तपाईंको मनमा के छ, भन्नुहोस्।', body: 'मिडिया अनुरोध, वक्ताका रूपमा निमन्त्रणा, साझेदारी वा सामाजिक पहल। हरेक सन्देश म आफैँ पढ्छु।', alt: 'नमस्ते गर्दै बद्रिराज तिमल्सिना', reasonK: 'विषय के हो?', reasons: ['मिडिया', 'वक्तृता', 'साझेदारी', 'सामाजिक पहल'], name: 'तपाईंको नाम', email: 'इमेल', org: 'संस्था (ऐच्छिक)', msg: 'सन्देश', note: 'पठाउँदा तपाईंको इमेल एप सन्देशसहित खुल्छ।', send: 'सन्देश पठाउनुहोस्', subj: 'वेबसाइट मार्फत सम्पर्क' },
    done: { t: 'धन्यवाद।', b: 'तपाईंको इमेल एप सन्देशसहित खुलेको हुनुपर्छ। त्यहाँबाट पठाउनुहोस्, म छिट्टै जवाफ दिनेछु। केही खुलेन भने सिधै यो ठेगानामा लेख्नुहोस्:', again: 'अर्को सन्देश लेख्नुहोस्' },
    whereK: 'मलाई कहाँ भेट्ने',
    where: [
      { k: 'बसोबास', v: 'काठमाडौं, नेपाल', d: 'Lahachhap.com र माइक रेस्टुरेन्ट एन्ड बार, लाजिम्पाट।' },
      { k: 'साथै', v: 'बनेपा र धुलिखेल', d: 'बेस्ट एफएम ८८.१ र मेरो गृह जिल्ला काभ्रे।' },
      { k: 'भाषा', v: 'नेपाली · English', d: 'जुन भाषामा सजिलो, त्यसैमा लेख्नुहोस्।' },
    ],
  },
};

const EMPTY = { name: '', email: '', org: '', msg: '' };

export default function ContactPage() {
  const { lang } = useLang();
  const t = C[lang];
  const [reason, setReason] = useState(0);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState(EMPTY);
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  // /contact?topic=media preselects the topic (used by "Request a press kit").
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get('topic');
    const i = topic ? REASON_KEYS.indexOf(topic) : -1;
    if (i >= 0) setReason(i);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = t.form.reasons[reason];
    const body = f.msg + '\n\n— ' + f.name + (f.org ? ', ' + f.org : '') + '\n' + f.email;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t.form.subj + ': ' + r)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Shell page="contact" banner={false} deps={[sent]}>
      <section id="top" className="on-accent">
        <div className="wrap stack" style={{ paddingTop: 'calc(var(--hh, 66px) + clamp(56px,10vh,128px))', paddingBottom: 'clamp(56px,9vh,100px)', gap: 'clamp(40px,7vh,80px)' }}>
          <Kicker>{t.hero.k}</Kicker>
          <HeroLines lines={t.hero.lines} style={{ fontSize: 'calc(clamp(48px,10.4vw,200px) * var(--h-a))' }} />
          <div data-hero-fade="1"><ContactCards /></div>
        </div>
      </section>

      <section className="wrap sec grid-split" style={{ gap: '48px clamp(40px,6vw,112px)' }}>
        <div className="stack" style={{ gap: 24 }}>
          <Kicker>{t.form.k}</Kicker>
          <h2 className="headline" style={{ marginLeft: '-.04em', fontSize: 'calc(clamp(36px,4.6vw,80px) * var(--h-b))' }}>{t.form.title}</h2>
          <p className="body-lg" style={{ fontSize: 'clamp(17px,1.35vw,20px)', maxWidth: '40ch' }}>{t.form.body}</p>
          <div className="media" style={{ aspectRatio: '4/3', marginTop: 8 }}>
            <img data-parallax="-0.08" className="px-md" src={img('badri/portrait-namaste', 'md')} alt={t.form.alt} loading="lazy" style={{ objectPosition: '50% 22%' }} />
          </div>
        </div>
        <div>
          {!sent ? (
            <form onSubmit={submit} className="stack bt-ink" style={{ gap: 24, paddingTop: 24 }}>
              <fieldset className="stack" style={{ gap: 10, border: 0, padding: 0, margin: 0 }}>
                <legend className="label" style={{ padding: 0, marginBottom: 10 }}>{t.form.reasonK}</legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {t.form.reasons.map((r, i) => {
                    const on = i === reason;
                    return (
                      <button key={r} type="button" aria-pressed={on} onClick={() => setReason(i)} className="btn"
                        style={{ border: `2px solid ${on ? 'var(--color-accent)' : 'var(--color-divider)'}`, background: on ? 'var(--color-accent)' : 'transparent', color: on ? 'var(--color-bg)' : 'var(--color-text)' }}>
                        {r}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <label className="field"><span>{t.form.name}</span><input className="input" type="text" autoComplete="name" required value={f.name} onChange={set('name')} /></label>
              <label className="field"><span>{t.form.email}</span><input className="input" type="email" autoComplete="email" required value={f.email} onChange={set('email')} /></label>
              <label className="field"><span>{t.form.org}</span><input className="input" type="text" autoComplete="organization" value={f.org} onChange={set('org')} /></label>
              <label className="field"><span>{t.form.msg}</span><textarea className="input" rows={6} required value={f.msg} onChange={set('msg')} /></label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span className="muted" style={{ fontSize: 13, maxWidth: '34ch' }}>{t.form.note}</span>
                <button type="submit" className="btn btn-primary">{t.form.send}<ArrowRight /></button>
              </div>
            </form>
          ) : (
            <div role="status" className="stack bt-ink" style={{ paddingTop: 24, gap: 20 }}>
              <span className="display" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(40px,5vw,88px) * var(--h-b))', color: 'var(--color-accent)' }}>{t.done.t}</span>
              <p style={{ fontSize: 18, maxWidth: '40ch' }}>{t.done.b} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              <button type="button" className="btn btn-secondary self-start" onClick={() => { setSent(false); setF(EMPTY); }}>{t.done.again}</button>
            </div>
          )}
        </div>
      </section>

      <section className="on-ink">
        <div className="wrap" style={{ paddingTop: 'clamp(80px,12vh,140px)', paddingBottom: 'clamp(80px,12vh,140px)' }}>
          <Kicker>{t.whereK}</Kicker>
          <div className="stack" style={{ marginTop: 'clamp(32px,5vh,56px)', borderTop: '2px solid color-mix(in srgb,var(--color-bg) 30%,transparent)' }}>
            {t.where.map((w, i) => (
              <div key={i} data-reveal={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px clamp(24px,4vw,72px)', alignItems: 'baseline', padding: 'clamp(24px,3.4vw,44px) 0', borderBottom: '2px solid color-mix(in srgb,var(--color-bg) 30%,transparent)' }}>
                <div style={{ flex: '0 0 200px', display: 'flex', gap: 20, alignItems: 'baseline', minWidth: 0 }}>
                  <span className="num">{pad(i + 1, lang)}</span>
                  <span className="label" style={{ color: 'color-mix(in srgb,var(--color-bg) 70%,transparent)' }}>{w.k}</span>
                </div>
                <div className="stack" style={{ flex: '1 1 420px', gap: 8, minWidth: 0 }}>
                  <span className="hl" style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'calc(clamp(30px,3.6vw,60px) * var(--h-c))', letterSpacing: '-.035em' }}>{w.v}</span>
                  <span style={{ fontSize: 16, lineHeight: 1.55, color: 'color-mix(in srgb,var(--color-bg) 75%,transparent)', maxWidth: '34ch' }}>{w.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
