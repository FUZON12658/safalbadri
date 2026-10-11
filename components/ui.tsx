import type { CSSProperties, ReactNode } from 'react';

/** Display heading whose lines slide up on load (data-hero-line). */
export function HeroLines({ lines, as: Tag = 'h1', className = 'display hero-lines', style }: { lines: string[]; as?: 'h1' | 'h2'; className?: string; style?: CSSProperties }) {
  return (
    <Tag className={className} style={style}>
      {lines.map((l, i) => <span key={i}><span data-hero-line="1">{l}</span></span>)}
    </Tag>
  );
}

export function Kicker({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="kicker" style={style}>{children}</div>;
}

/** Sentence whose words light up while scrolling; *starred* words take the accent. */
export function Manifesto({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  return (
    <p data-manifesto="1" className={'manifesto ' + (className || '')} style={style}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-w={w.includes('*') ? '1' : '0'}>{w.replace(/\*/g, '') + ' '}</span>
      ))}
    </p>
  );
}

/** Standard sub-page opening: kicker + display lines on the left, lede on the right. */
export function PageHero({ kicker, lines, lede, size = 'calc(clamp(52px,9vw,168px) * var(--h-a))', children, aside }: {
  kicker: string; lines: string[]; lede?: ReactNode; size?: string; children?: ReactNode; aside?: ReactNode;
}) {
  return (
    <section id="top" className="wrap page-hero">
      <div className="page-hero__grid">
        <div className="stack" style={{ gap: 24 }}>
          <Kicker>{kicker}</Kicker>
          <HeroLines lines={lines} style={{ fontSize: size }} />
        </div>
        {aside ?? (lede && <p data-hero-fade="1" className="lede">{lede}</p>)}
      </div>
      {children}
    </section>
  );
}
