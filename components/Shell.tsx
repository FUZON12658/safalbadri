'use client';

import { useEffect, useRef, type MutableRefObject, type ReactNode } from 'react';
import { createMotion, type Motion } from '@/lib/motion';
import { useLang } from '@/lib/lang';
import type { PageKey } from '@/content/site';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

type Props = {
  page: PageKey | null;
  children: ReactNode;
  /** Show the accent "Let's work together" banner above the footer. */
  banner?: boolean;
  /** Receives the page's motion engine, for pages that drive it directly. */
  motionRef?: MutableRefObject<Motion | null>;
  /** Extra state that changes the DOM the motion engine watches. */
  deps?: unknown[];
};

/** Page root: header, footer and the shared scroll engine. */
export default function Shell({ page, children, banner = true, motionRef, deps = [] }: Props) {
  const { lang } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const motion = useRef<Motion | null>(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    if (!rootRef.current) return;
    const m = createMotion(rootRef.current, { lang: () => langRef.current });
    motion.current = m;
    if (motionRef) motionRef.current = m;
    return () => {
      m.destroy();
      motion.current = null;
      if (motionRef) motionRef.current = null;
    };
    // createMotion is a dependency so an edited motion module is picked up without a page reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMotion]);

  useEffect(() => {
    motion.current?.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, ...deps]);

  return (
    <div ref={rootRef} lang={lang} className="site">
      <a href="#main" className="skip-link">{lang === 'ne' ? 'मुख्य सामग्रीमा जानुहोस्' : 'Skip to content'}</a>
      <SiteHeader page={page} />
      <main id="main">{children}</main>
      <SiteFooter banner={banner} />
    </div>
  );
}
